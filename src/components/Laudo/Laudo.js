import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './Laudo.css';

const Laudos = () => {
  const { id } = useParams(); // ID do aluno
  const [file, setFile] = useState(null); // Arquivo PDF
  const [laudos, setLaudos] = useState([]); // Lista de laudos
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [selectedFileName, setSelectedFileName] = useState(''); // Nome do arquivo selecionado

  // Busca a lista de laudos
  const fetchLaudos = async () => {
    try {
      const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/laudos/${id}`);
      if (!response.ok) throw new Error('Erro ao buscar laudos.');
      const data = await response.json();
      setLaudos(data); // Atualiza a lista de laudos
    } catch (error) {
      console.error('Erro ao buscar laudos:', error);
      alert('Erro ao carregar os laudos.');
    }
  };

  // Envia o arquivo para upload
  const handleFileUpload = async () => {
    if (!file) {
      alert('Selecione um arquivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/laudos/${id}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erro ao fazer upload do arquivo.');

      alert('Laudo enviado com sucesso!');
      setFile(null); // Limpa o arquivo
      setSelectedFileName(''); // Limpa o nome do arquivo
      fetchLaudos(); // Atualiza a lista de laudos
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
      alert('Erro ao enviar o laudo.');
    } finally {
      setLoading(false);
    }
  };

  // Atualiza o arquivo selecionado
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setSelectedFileName(selectedFile ? selectedFile.name : '');
  };

  useEffect(() => {
    fetchLaudos();
  }, [id]);

  return (
    <div className="laudos-container">
      <Sidebar />
      <div className="laudos-content">
        <h2>Laudos Médicos</h2>

        {/* Upload de Arquivo */}
        <div className="upload-section">
          <label htmlFor="file-upload" className="upload-button">
            Selecionar Arquivo
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {selectedFileName && (
            <p className="selected-file-name">Arquivo Selecionado: {selectedFileName}</p>
          )}
          <button
            onClick={handleFileUpload}
            className="upload-submit"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>

        {/* Lista de Laudos */}
        <div className="laudos-list">
          <h4>Laudos:</h4>
          {laudos.length > 0 ? (
            <ul>
              {laudos.map((laudo) => (
                <li key={laudo.id}>
                  {laudo.fileName}{' '}
                  <a
                    href={`https://backspring-c8b11eddeece.herokuapp.com/laudos/id/${laudo.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Baixar
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum laudo encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Laudos;
