import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Turmas.css';
import Sidebar from '../Sidebar';

const Turmas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('nomeTurma');
  const [turmas, setTurmas] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);

  const fetchTurmas = async (queryParam = '') => {
    try {
      const response = await fetch(`http://localhost:8080/turmas${queryParam}`);
      const data = await response.json();
      setTurmas(data);
    } catch (error) {
      console.error('Erro ao buscar as turmas:', error);
    }
  };

  useEffect(() => {
    fetchTurmas();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      fetchTurmas();
    } else {
      const queryParam = searchType === 'nomeTurma'
        ? `?nomeTurma=${searchTerm}`
        : `?anoTurma=${searchTerm}`;
      fetchTurmas(queryParam);
    }
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchTerm('');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Por favor, selecione um arquivo Excel.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/turmas', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erro ao enviar arquivo para a API Flask');
      const jsonData = await response.json();

      // Chamada para a API Java
      const javaResponse = await fetch('http://localhost:8080/turmas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });

      if (!javaResponse.ok) throw new Error('Erro ao enviar JSON para a API Java');

      alert('Turma cadastrada com sucesso na API Java!');

      // Chamada para a nova API Flask
      const flaskResponse = await fetch('http://127.0.0.1:5000/atualizar-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });

      if (!flaskResponse.ok) throw new Error('Erro ao atualizar o portfólio na API Flask');

      alert('Portfólio atualizado com sucesso!');

      setShowPopup(false);
      setFile(null);
      fetchTurmas();
    } catch (error) {
      console.error(error);
      alert('Erro durante o processamento do arquivo.');
    }
  };

  return (
    <div className="turmas-container">
      <Sidebar />
      <div className="content">
        <h2>Lista de Turmas</h2>

        <div className="search-controls">
          <select className="search-type" value={searchType} onChange={handleSearchTypeChange}>
            <option value="nomeTurma">Buscar por Nome da Turma</option>
            <option value="anoTurma">Buscar por Ano da Turma</option>
          </select>

          <input
            type="text"
            className="search-box"
            placeholder={searchType === 'nomeTurma' ? 'Digite o nome da turma' : 'Digite o ano da turma'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className="search-button" onClick={handleSearch}>
            Buscar
          </button>
        </div>

        <table className="turmas-table">
          <thead>
            <tr>
              <th>Nome da Turma</th>
              <th>Ano</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(turmas) && turmas.length > 0 ? (
              turmas.map((turma) => (
                turma && (
                  <tr key={turma.id}>
                    <td>
                      <Link to={`/alunos?nomeTurma=${encodeURIComponent(turma.nomeTurma)}`} className="link-turma">
                        {turma.nomeTurma}
                      </Link>
                    </td>
                    <td>{turma.ano}</td>
                  </tr>
                )
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>
                  Nenhuma turma encontrada para {searchType === 'nomeTurma' ? 'Nome da Turma' : 'Ano da Turma'}: {searchTerm}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button className="adicionar-button" onClick={() => setShowPopup(true)}>
          Adicionar Turma
        </button>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Arraste o arquivo Excel aqui</h3>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
            <div className="popup-actions">
              <button onClick={handleFileUpload}>Salvar Turma</button>
              <button onClick={() => setShowPopup(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Turmas;
