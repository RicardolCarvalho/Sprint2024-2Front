import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarAluno.css';

const EditarAluno = () => {
  const { id } = useParams(); // Pega o ID do aluno da URL
  const navigate = useNavigate();

  const [aluno, setAluno] = useState({
    nome: '',
    filiacao1: '',
    nomeSocialAluno: '',
    nomeAfetivoAluno: '',
    dataNascimento: '',
    codigoAluno: '',
    codigoInep: '',
    turma: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [originalNome, setOriginalNome] = useState('');

useEffect(() => {
  const fetchAluno = async () => {
    try {
      const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/alunos/${id}`);
      if (!response.ok) throw new Error('Erro ao buscar dados do aluno');
      const data = await response.json();
      setAluno(data);
      setOriginalNome(data.nome); // Salvar o nome original
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  fetchAluno();
}, [id]);


  // Manipula alterações nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAluno((prevAluno) => ({
      ...prevAluno,
      [name]: value,
    }));
  };

  // Atualiza o nome no portfólio
  const handlePortfolioUpdate = async (nomeAntigo, nomeNovo) => {
    try {
      const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/portfolios/atualizar-nome-aluno`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomeAntigo, nomeNovo }),
      });
      console.log(response);
  
      if (!response.ok) throw new Error('Erro ao atualizar o nome no portfólio');
      console.log('Nome atualizado com sucesso no portfólio.');
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };
  

  // Envia os dados atualizados para a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/alunos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aluno),
      });
  
      if (!response.ok) throw new Error('Erro ao atualizar o aluno');
  
      // Chamada para atualizar o nome no Portfolio
      if (aluno.nome !== originalNome) {
        const portfolioResponse = await fetch('https://backspring-c8b11eddeece.herokuapp.com/portfolios', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nomeAntigo: originalNome,
            nomeNovo: aluno.nome,
          }),
        });        
  
        if (!portfolioResponse.ok) throw new Error('Erro ao atualizar o nome no portfólio');
      }
  
      alert('Aluno atualizado com sucesso!');
      navigate('/alunos'); // Redireciona para a lista de alunos
    } catch (err) {
      setError(err.message);
    }
  };
  
  

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="editar-aluno-container">
      <div className="editar-aluno-wrapper">
        <h2>Editar Aluno</h2>
        <form className="editar-aluno-form" onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={aluno.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Filiação 1:</label>
            <input
              type="text"
              name="filiacao1"
              value={aluno.filiacao1}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Nome Social:</label>
            <input
              type="text"
              name="nomeSocialAluno"
              value={aluno.nomeSocialAluno}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Nome Afetivo:</label>
            <input
              type="text"
              name="nomeAfetivoAluno"
              value={aluno.nomeAfetivoAluno}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Data de Nascimento:</label>
            <input
              type="date"
              name="dataNascimento"
              value={aluno.dataNascimento}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Código do Aluno:</label>
            <input
              type="text"
              name="codigoAluno"
              value={aluno.codigoAluno}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Código INEP:</label>
            <input
              type="text"
              name="codigoInep"
              value={aluno.codigoInep}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Turma:</label>
            <input
              type="text"
              name="turma"
              value={aluno.turma}
              onChange={handleChange}
            />
          </div>
          <div className="editar-aluno-actions">
            <button type="submit">Salvar</button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/alunos')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarAluno;
