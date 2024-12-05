import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Professores.css';
import Sidebar from '../Sidebar';

const Professores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [professores, setProfessores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessores = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://backspring-c8b11eddeece.herokuapp.com/professores');
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.content && Array.isArray(data.content)) {
          setProfessores(data.content);
        } else {
          throw new Error('Formato de dados inválido recebido.');
        }
      } catch (error) {
        console.error('Erro ao buscar professores:', error.message);
        setError(error.message);
        setProfessores([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessores();
  }, []);

  const handleToggleActive = async (professor) => {
    try {
      const updatedProfessor = { ...professor, ativo: !professor.ativo };

      const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/professores/${professor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfessor),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar status do professor.');
      }

      setProfessores((prevProfessores) =>
        prevProfessores.map((prof) =>
          prof.id === professor.id ? { ...prof, ativo: !prof.ativo } : prof
        )
      );
    } catch (error) {
      console.error('Erro ao alterar status do professor:', error.message);
      alert('Não foi possível alterar o status do professor. Tente novamente.');
    }
  };

  const handleCadastrarProfessor = () => {
    navigate('/cadastra-professor');
  };

  const filteredProfessores = professores.filter((professor) =>
    [professor.nome, professor.curricular]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>Lista de Professores</h2>
        <input
          type="text"
          className="search-box"
          placeholder="Pesquise por nome ou disciplina..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {isLoading ? (
          <p>Carregando professores...</p>
        ) : error ? (
          <p className="error">Erro: {error}</p>
        ) : (
          <>
            <table className="professores-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Disciplina</th>
                  <th>Jornada</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfessores.length > 0 ? (
                  filteredProfessores.map((professor) => (
                    <tr key={professor.id}>
                      <td>{professor.nome}</td>
                      <td>{professor.curricular}</td>
                      <td>{professor.jornada}</td>
                      <td>
                        <span>{professor.ativo ? 'Ativo' : 'Inativo'}</span>
                        <button
                          className="status-toggle-button"
                          onClick={() => handleToggleActive(professor)}
                        >
                          Alterar Status
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Nenhum professor encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button className="adicionar-button" onClick={handleCadastrarProfessor}>
              Cadastrar Novo Professor
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Professores;
