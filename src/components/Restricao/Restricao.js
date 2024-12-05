import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './Restricao.css';

const RestricaoAlimentar = () => {
  const { id } = useParams(); // ID do aluno vindo da URL
  const [saudeData, setSaudeData] = useState(null); // Armazena todos os dados de saúde
  const [comentario, setComentario] = useState(''); // Estado para a restrição alimentar
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  // Função para buscar os dados de saúde do aluno
  useEffect(() => {
    const fetchSaude = async () => {
      try {
        const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/saude/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar os dados de saúde');
        const data = await response.json();

        // Atualiza os estados com os dados existentes
        setSaudeData(data);
        setComentario(data.restricaoAlimentar || ''); // Preenche o campo com o valor existente
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar os dados de saúde.');
      }
    };

    fetchSaude();
  }, [id]);

  // Função para salvar ou atualizar o dado específico
  const handleSubmit = async () => {
    if (!comentario) {
      alert('Por favor, digite um comentário!');
      return;
    }

    // Atualiza somente o campo de restrição alimentar no JSON
    const updatedSaude = {
      ...saudeData, // Mantém os dados existentes
      restricaoAlimentar: comentario, // Atualiza o campo específico
    };

    try {
      setLoading(true);
      const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/saude/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSaude),
      });

      if (!response.ok) throw new Error('Erro ao salvar os dados de saúde');
      alert('Informações de restrição alimentar atualizadas com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar os dados de saúde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-restricao">
      <Sidebar />
      <div className="container-azul">
        <h2>Restrição Alimentar</h2>
        {error && <p className="error">{error}</p>}
        <textarea
          placeholder="Descreva a restrição alimentar aqui..."
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

export default RestricaoAlimentar;
