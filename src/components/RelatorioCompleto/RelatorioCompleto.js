import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar'; // Mantendo a Sidebar
import './RelatorioCompleto.css'; // Arquivo CSS para o relatório

const RelatorioCompleto = () => {
  const { id } = useParams(); // Obtém o ID do portfólio da URL
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar o portfólio pelo ID
  console.log(id);
  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`http://localhost:8080/portfolios/${id}`);
      const data = await response.json();
      setPortfolio(data);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar portfólio:', err);
      setError('Erro ao carregar o relatório completo.');
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!portfolio) {
      console.error('Portfólio não carregado');
      return;
    }

    try {
      const url = `http://127.0.0.1:5000/relatorio_completo/${portfolio.nome}`; // Ajuste aqui para a URL correta
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erro ao gerar o relatório");
      }

      const blob = await response.blob();
      const link = document.createElement('a');

      // Nome do arquivo para download
      link.href = URL.createObjectURL(blob);
      link.download = `relatorio_completo_${portfolio.nome}.xlsx`;  // Garantir o mesmo nome
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Erro ao baixar o relatório:', err);
      setError('Erro ao baixar o relatório.');
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [id]);

  if (loading) {
    return <div>Carregando relatório completo...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const parseNotas = (notas) => {
    let frequencia = "-";
    let compAus = "-";
    let faltas = "-";
    const bimestres = {
      '1º': "-",
      '2º': "-",
      '3º': "-",
      '4º': "-"
    };

    for (const [key, value] of Object.entries(notas)) {
      if (key.startsWith('%')) {
        frequencia = value;
      } else if (key.startsWith('CA')) {
        compAus = value;
      } else if (key.startsWith('F')) {
        faltas = value;
      } else if (/^1º|2º|3º|4º(_\d+)?$/.test(key)) {
        const bimestre = key.split('_')[0]; // Extração do bimestre, ignorando sufixo
        bimestres[bimestre] = value;
      }
    }

    return { frequencia, compAus, faltas, ...bimestres };
  };

  return (
    <div className="relatorio-container">
      <Sidebar />
      <div className="relatorio-content">
        <h2>Relatório Completo</h2>
        <h3>Nome: {portfolio.nome}</h3>

        <h4>Dados do Aluno:</h4>
        <table className="dados-aluno-tabela">
          <thead>
            <tr>
              <th>Matéria</th>
              <th>Ano/Turma</th>
              <th>1º</th>
              <th>2º</th>
              <th>3º</th>
              <th>4º</th>
              <th>Frequência</th>
              <th>Comp. Aus.</th>
              <th>Faltas</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(portfolio.dadosAluno).map(([aluno, materias]) =>
              materias.map((materia, index) => {
                const { frequencia, compAus, faltas, '1º': primeiro, '2º': segundo, '3º': terceiro, '4º': quarto } = parseNotas(materia.notas);
                return (
                  <tr key={index}>
                    <td>{materia.materia}</td>
                    <td>{materia.anoTurma}</td>
                    <td>{primeiro}</td>
                    <td>{segundo}</td>
                    <td>{terceiro}</td>
                    <td>{quarto}</td>
                    <td>{frequencia}</td>
                    <td>{compAus}</td>
                    <td>{faltas}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <h4>Laudos:</h4>
        <pre>{JSON.stringify(portfolio.laudos, null, 2)}</pre>

        <h4>Observações:</h4>
        <pre>{JSON.stringify(portfolio.observacoes, null, 2)}</pre>

        <h4>Perguntas:</h4>
        <table className="dados-perguntas-tabela">
          <thead>
            <tr>
              <th>Pergunta</th>
              <th>Resposta</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(portfolio.perguntas).map(([pergunta, resposta], index) => (
              <tr key={index}>
                <td>{pergunta.replace(/_/g, ' ')}</td> {/* Substituir underscores por espaços */}
                <td>{resposta}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botão para download */}
        <button onClick={handleDownload}>Baixar Relatório Completo</button>
      </div>
    </div>
  );
};

export default RelatorioCompleto;