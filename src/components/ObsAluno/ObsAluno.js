import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa o hook useParams
import Sidebar from '../Sidebar';
import './ObsAluno.css';

const ObsAluno = () => {
  const { id } = useParams(); // Obtém o ID diretamente dos parâmetros da rota
  const [observacoes, setObservacoes] = useState([]);
  const [novaObservacao, setNovaObservacao] = useState('');

  const fetchObservacoes = async () => {
    try {
      const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/portfolios/${id}/observacoes`);
      if (!response.ok) {
        throw new Error('Erro ao buscar observações');
      }
      const data = await response.json();
      setObservacoes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const adicionarObservacao = async () => {
    if (!novaObservacao.trim()) {
      alert('A observação não pode estar vazia.');
      return;
    }
    try {
      const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/portfolios/${id}/observacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([novaObservacao]),
      });
      if (!response.ok) {
        throw new Error('Erro ao adicionar observação');
      }
      const data = await response.json();
      setObservacoes(data.observacoes);
      setNovaObservacao('');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const deletarObservacao = async (observacao) => {
    try {
        const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/portfolios/${id}/observacoes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: (observacao.trim()),
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('Erro no servidor:', errorDetails);
            throw new Error('Erro ao deletar observação');
        }

        const data = await response.json();
        setObservacoes(data.observacoes); // Atualiza a lista no frontend
        alert('Observação deletada com sucesso!');
    } catch (error) {
        console.error(error);
        alert('Erro ao deletar observação.');
    }
};

  useEffect(() => {
    fetchObservacoes();
  }, [id]);

  return (
    <div className="observacoes-container">
      <Sidebar />
      <div className="observacoes-content">
        <h2>Observações</h2>
        <ul>
          {observacoes.map((observacao, index) => (
            <li key={index} className="observacao-item">
              <span>{observacao}</span>
              <button
                className="delete-button"
                onClick={() => deletarObservacao(observacao)}
              >
                Deletar
              </button>
            </li>
          ))}
        </ul>
        <div className="adicionar-observacao">
          <input
            type="text"
            placeholder="Nova observação"
            value={novaObservacao}
            onChange={(e) => setNovaObservacao(e.target.value)}
          />
          <button className="add-button" onClick={adicionarObservacao}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ObsAluno;
