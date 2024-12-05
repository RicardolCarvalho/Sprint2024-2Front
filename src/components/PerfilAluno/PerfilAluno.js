import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './PerfilAluno.css';

const PerfilAluno = () => {
  const { id } = useParams(); // Obtém o ID do aluno pela URL
  const [aluno, setAluno] = useState(null); // Estado para armazenar o aluno
  const [portfolio, setPortfolio] = useState(null); // Estado para o portfólio do aluno

  // Função para buscar os dados do aluno
  const fetchAluno = async () => {
    try {
      const response = await fetch(`http://localhost:8080/alunos/${id}`);
      const data = await response.json();
      setAluno(data);

      // Após buscar o aluno, buscar o portfólio associado pelo nome
      fetchPortfolio(data.nome);
    } catch (error) {
      console.error('Erro ao buscar aluno:', error);
    }
  };

  // Função para buscar o portfólio pelo nome do aluno
  const fetchPortfolio = async (nomeAluno) => {
    try {
      const response = await fetch(`http://localhost:8080/portfolios?nome=${nomeAluno}`);
      const data = await response.json();
      setPortfolio(data[0]); // Corrige o acesso para pegar o primeiro objeto do array
    } catch (error) {
      console.error('Erro ao buscar portfólio:', error);
    }
  };

  useEffect(() => {
    fetchAluno();
  }, [id]);

  if (!aluno || !portfolio) {
    return <div>Carregando...</div>;
  }

  console.log(aluno);
  return (
    <div className="perfil-container">
      <Sidebar />
      <div className="perfil-header">
        <h3 className="nome-aluno">{aluno.nome}</h3>
        <h3 className="turma-aluno">Turma: {aluno.turma}</h3>
      </div>

      <div className="tabela-container">
        <table className="tabela-itens">
          <tbody>
            <tr>
              <td>
                <Link to={`/relatorio/${portfolio.id}`} className="link-item">
                  Relatório completo
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to={`/saude/${aluno.id}`} className="link-item">
                  Saúde
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to={`/retencao/${portfolio.id}`} className="link-item">
                  Perguntas para retenção
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to={`/observacoes/${portfolio.id}`} className="link-item">
                  Observações sobre o aluno
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerfilAluno;
