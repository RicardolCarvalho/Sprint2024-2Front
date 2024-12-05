import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './Acompanhamento.css';

const AcompanhamentoPsicologico = () => {
  const { id } = useParams();
  const [saudeData, setSaudeData] = useState(null);
  const [comentario, setComentario] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSaude = async () => {
      try {
        const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/saude/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar os dados de saúde');
        const data = await response.json();
        setSaudeData(data);
        setComentario(data.acompanhamentoPsicologico || '');
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar os dados de saúde.');
      }
    };

    fetchSaude();
  }, [id]);

  const handleSubmit = async () => {
    if (!comentario) {
      alert('Por favor, digite um comentário!');
      return;
    }

    const updatedSaude = {
      ...saudeData,
      acompanhamentoPsicologico: comentario,
    };

    try {
      setLoading(true);
      const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/saude/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSaude),
      });

      if (!response.ok) throw new Error('Erro ao salvar os dados de saúde');
      alert('Acompanhamento psicológico atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar os dados de saúde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-psicologico">
      <Sidebar />
      <div className="container-azul">
        <h2>Acompanhamento Psicológico</h2>
        {error && <p className="error">{error}</p>}
        <textarea
          placeholder="Descreva o acompanhamento psicológico aqui..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="comentario-textarea"
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

export default AcompanhamentoPsicologico;
