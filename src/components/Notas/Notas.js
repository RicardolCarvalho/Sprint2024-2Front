import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './Notas.css'; // Arquivo de estilo para a página

const Notas = () => {
  const { id } = useParams(); // Obtém o ID do portfólio da URL
  const [notasFrequencias, setNotasFrequencias] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar as notas e frequências
  const fetchNotasFrequencias = async () => {
    try {
      const response = await fetch(`https://backspring-c8b11eddeece.herokuapp.com/portfolios/${id}/notas-frequencias`);
      if (!response.ok) {
        throw new Error('Erro ao buscar notas e frequências');
      }
      const data = await response.json();
      setNotasFrequencias(data);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar notas e frequências:', err);
      setError('Erro ao carregar as notas e frequências.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotasFrequencias();
  }, [id]);

  if (loading) {
    return <div>Carregando notas e frequências...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="notas-container">
      <Sidebar />
      <div className="notas-wrapper">
        <div className="notas-content">
          <h2>Notas e Frequências</h2>
          <table className="tabela-notas">
            <thead>
              <tr>
                <th>Matéria</th>
                <th>Notas e Frequências</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(notasFrequencias).map(([materia, detalhes]) => (
                <tr key={materia}>
                  <td>{materia}</td>
                  <td>
                    {Object.entries(detalhes).map(([chave, valor]) => (
                      <div key={chave}>
                        {chave}: {valor}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Notas;
