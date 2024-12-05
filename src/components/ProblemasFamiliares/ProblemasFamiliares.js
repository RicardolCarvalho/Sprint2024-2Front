import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProblemasFamiliares.css';
import Sidebar from '../Sidebar';

const ProblemasFamiliares = () => {
  const { id } = useParams(); // ID do aluno vindo da URL
  const [saudeData, setSaudeData] = useState(null); // Dados completos de saúde
  const [problema, setProblema] = useState(''); // Estado do problema familiar
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  // Buscar os dados de saúde do aluno
  useEffect(() => {
    const fetchSaude = async () => {
      try {
        const response = await fetch(`http://localhost:8080/saude/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar os dados de saúde');
        const data = await response.json();
        setSaudeData(data); // Salva os dados completos
        setProblema(data.problemasFamiliares || ''); // Preenche o problema familiar existente
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar os dados de saúde.');
      }
    };

    fetchSaude();
  }, [id]);

  // Função para enviar ou atualizar os dados
  const handleSubmit = async () => {
    if (!problema) {
      alert('Por favor, digite algo sobre o problema!');
      return;
    }

    const updatedSaude = {
      ...saudeData, // Preserva os outros campos
      problemasFamiliares: problema, // Atualiza apenas o problema familiar
    };

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/saude/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSaude),
      });

      if (!response.ok) throw new Error('Erro ao salvar os dados de saúde');
      alert('Problemas familiares atualizados com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar os dados de saúde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="problemas-container">
      <Sidebar />
      <div className="container-azul">
        <h2>Problemas Familiares</h2>
        {error && <p className="error">{error}</p>}
        <textarea
          placeholder="Descreva os problemas familiares aqui..."
          value={problema}
          onChange={(e) => setProblema(e.target.value)}
          className="problema-textarea"
          disabled={loading}
        />
      </div>
      <div className="button-container">
        <button onClick={handleSubmit} className="submit-button" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
};

export default ProblemasFamiliares;
