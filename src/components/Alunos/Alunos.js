import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import Sidebar from '../Sidebar';
import './Alunos.css';

const Alunos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('nome'); // Tipo de busca: 'nome' ou 'turma'
  const [alunos, setAlunos] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar a exibição do popup
  const [file, setFile] = useState(null); // Estado para armazenar o arquivo selecionado

  const location = useLocation(); // Para acessar o queryParam
  const searchParams = new URLSearchParams(location.search);
  const initialTurma = searchParams.get('nomeTurma') || '';
  const navigate = useNavigate();

  // Função para buscar a lista de alunos da API
  const fetchAlunos = async (queryParam = '') => {
    try {
      const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/alunos${queryParam}`);
      const data = await response.json();
      setAlunos(data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  // Busca inicial ao carregar o componente
  useEffect(() => {
    if (initialTurma) {
      fetchAlunos(`?nomeTurma=${encodeURIComponent(initialTurma)}`);
    } else {
      fetchAlunos();
    }
  }, [initialTurma]);

  // Manipula a mudança no tipo de busca
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchTerm(''); // Limpa o termo de busca ao trocar o tipo
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja deletar este aluno?")) {
      fetch(`https://backspring-c8b11eddeece.herokuapp.com/alunos/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("Aluno excluído com sucesso!");
            fetchAlunos(); // Atualiza a tabela
          } else {
            alert("Erro ao excluir aluno.");
          }
        })
        .catch((error) => {
          console.error("Erro ao deletar aluno:", error);
          alert("Erro ao deletar aluno.");
        });
    }
  };

  // Manipula o envio da busca
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      fetchAlunos(); // Busca completa se o termo estiver vazio
    } else {
      const queryParam = searchType === 'nome' ? `?nomeAluno=${searchTerm}` : `?nomeTurma=${searchTerm}`;
      fetchAlunos(queryParam);
    }
  };

  // Manipula a mudança de arquivo
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Função para enviar o arquivo para a API Flask e processar os dados
  const handleFileUpload = async () => {
    if (!file) {
      alert('Selecione um arquivo antes de enviar.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // 1. Enviar o arquivo para a API Flask
      const flaskResponse = await fetch('https://backflask-10b36f74b018.herokuapp.com/alunos', {
        method: 'POST',
        body: formData,
      });

      if (!flaskResponse.ok) {
        throw new Error('Erro ao enviar o arquivo para a API Flask');
      }

      const alunosAtualizados = await flaskResponse.json();

      // 2. Obter todos os alunos da API Java (GET)
      const javaResponse = await fetch('https://backspring-c8b11eddeece.herokuapp.com/alunos');
      if (!javaResponse.ok) {
        throw new Error('Erro ao buscar alunos da API Java');
      }

      const alunosJava = await javaResponse.json();

      // 3. Criar um dicionário de {nome: id} para mapear os alunos
      const nomeParaId = {};
      alunosJava.forEach((aluno) => {
        if (aluno.nome) {
          nomeParaId[aluno.nome.toUpperCase()] = aluno.id;
        }
      });

      // 4. Atualizar cada aluno processado pela API Flask na API Java
      for (const aluno of alunosAtualizados) {
        const id = nomeParaId[aluno.nome.toUpperCase()]; // Match por nome
        if (id) {
          // Chamar a API Java para atualizar
          await fetch(`https://backspring-c8b11eddeece.herokuapp.com/alunos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno),
          });
        } else {
          console.warn(`Aluno não encontrado: ${aluno.nome}`);
        }
      }

      alert('Alunos atualizados com sucesso!');
      setShowPopup(false);
      fetchAlunos(); // Atualiza a lista de alunos na tabela
    } catch (error) {
      console.error('Erro no processo de atualização:', error);
      console.log(error);
      alert('Ocorreu um erro ao atualizar os alunos.');
    }
  };

  return (
    <div className="alunos-container">
      <Sidebar />
      <div className="alunos-wrapper">
        <div className="alunos-content">
          <h2>Lista de Alunos</h2>

          {/* Filtros de busca */}
          <div className="search-controls">
            <select
              className="search-type"
              value={searchType}
              onChange={handleSearchTypeChange}
            >
              <option value="nome">Buscar por Nome</option>
              <option value="turma">Buscar por Turma</option>
            </select>

            <input
              type="text"
              className="search-box"
              placeholder={
                searchType === 'nome' ? 'Digite o nome do aluno' : 'Digite o nome da turma'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button className="search-button" onClick={handleSearch}>
              Buscar
            </button>
          </div>

          {/* Tabela de alunos */}
          <table className="alunos-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Código do Aluno</th>
                <th>Turma</th>
                <th>Filiacao1</th>
                <th>Data de Nascimento</th>
                <th>CPF</th>
                <th>RG</th>
                <th>Código INEP</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(alunos) && alunos.length > 0 ? (
                alunos.map((aluno) => (
                  aluno && (
                    <tr key={aluno.id}>
                      <td>
                        <Link to={`/perfil-aluno/${aluno.id}`} className="link-aluno">
                          {aluno.nome}
                        </Link>
                      </td>
                      <td>{aluno.codigoAluno || 'Não informado'}</td>
                      <td>{aluno.turma || 'Não informado'}</td>
                      <td>{aluno.filiacao1 || 'Não informado'}</td>
                      <td>{aluno.dataNascimento || 'Não informado'}</td>
                      <td>{aluno.cpf || 'Não informado'}</td>
                      <td>{aluno.rg || 'Não informado'}</td>
                      <td>{aluno.codigoInep || 'Não informado'}</td>
                      <td className="opcoes-column">
                        <button onClick={() => navigate(`/editar-aluno/${aluno.id}`)}className="edit-button">Editar</button>
                        <button onClick={() => handleDelete(aluno.id)}className="delete-button">Deletar</button></td>
                    </tr>
                  )
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>
                    Nenhum aluno encontrado para {searchType === 'nome' ? 'Nome' : 'Turma'}: {searchTerm}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Botão para abrir o popup de atualização */}
          <button className="atualizar-button" onClick={() => setShowPopup(true)}>
            Atualizar Alunos
          </button>

          {/* Popup de atualização */}
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h3>Arraste o arquivo Excel aqui</h3>
                <input type="file" accept=".xlsx" onChange={handleFileChange} />
                <div className="popup-actions">
                  <button onClick={handleFileUpload}>Puxar dados EOL</button>
                  <button onClick={() => setShowPopup(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          )}
          {/* Botão para navegar para a tela de cadastro de aluno */}
          <Link to="/cadastra-aluno">
            <button className="cadastrar-button">Cadastrar Aluno</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Alunos;
