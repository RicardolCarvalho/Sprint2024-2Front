import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './PerguntasRetencao.css';

const PerguntasRetencao = () => {
  const { id } = useParams(); // Obtém o ID do portfólio
  const [perguntas, setPerguntas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapeamento das perguntas
  const perguntasMap = {
    participacao_atividades_compensacao_ausencia: 'O aluno participou das atividades de compensação de ausência organizadas pela unidade educacional?',
    busca_ativa_frequencia_regular: 'A escola realizou a Busca Ativa, utilizando diferentes estratégias para garantir a frequência regular dos estudantes?',
    responsaveis_informados_sobre_frequencia: 'Os responsáveis foram informados sobre a frequência irregular do aluno de forma sistemática e bimestral?',
    conselho_tutelar_notificado_excesso_ausencias: 'O Conselho Tutelar foi notificado sobre o excesso de ausências do aluno, conforme a legislação vigente?',
    acoes_recuperacao_continua: 'Foram realizadas ações de recuperação contínua pelo professor regente ou em colaboração com o Projeto de Apoio Pedagógico (PAP)?',
    matricula_em_projetos_recuperacao_paralela: 'O aluno do Ensino Fundamental foi matriculado em projetos de recuperação paralela, como as turmas de Fortalecimento das Aprendizagens ou projetos do Programa Mais Educação?',
    atualizacao_bimestral_mapeamento_estudantes: 'As ações realizadas foram atualizadas bimestralmente no documento "Mapeamento dos Estudantes"?',
    instrumentos_diversificados_avaliacao: 'Foram utilizados instrumentos e procedimentos diversificados no processo de avaliação ao longo do ano letivo, considerando a faixa etária e características do estudante?',
    comunicacao_familia_sobre_desempenho: 'Foi realizada comunicação e ciência à família/responsáveis sobre o desempenho do aluno, com síntese dos registros das avaliações?',
    comunicacao_com_dre_naapa: 'Houve comunicação e articulação com a DRE/NAAPA em casos de necessidade de atendimento ao estudante pela rede protetiva?',
    plano_aee_registrado_sgp: 'Para estudantes público-alvo da Educação Especial, o Plano de AEE foi registrado no SGP, precedido de avaliação pedagógica/estudo de caso?',
  };

  useEffect(() => {
    const fetchPerguntas = async () => {
      try {
        const response = await fetch(`http://localhost:8080/portfolios/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar perguntas do portfólio');
        const data = await response.json();
        if (data && data.perguntas) {
          setPerguntas(data.perguntas);
        } else {
          throw new Error('Perguntas não encontradas no portfólio');
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerguntas();
  }, [id]);

  const handleRespostaChange = (pergunta, resposta) => {
    setPerguntas((prevPerguntas) => ({
      ...prevPerguntas,
      [pergunta]: resposta,
    }));
  };

  const handleSubmit = async () => {
    const updatedPortfolio = {
      perguntas: perguntas,
    };

    try {
      const response = await fetch(`http://127.0.0.1:5000/perguntas_retencao/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPortfolio),
      });

      if (!response.ok) throw new Error('Erro ao enviar as perguntas atualizadas');
      alert('Perguntas enviadas com sucesso!');
    } catch (err) {
      console.error('Erro ao enviar as perguntas:', err);
      alert('Erro ao enviar as perguntas.');
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="perguntas-retencao-container">
      <Sidebar />
      <div className="perguntas-content">
        <h2>Perguntas para Retenção</h2>
        <div className="perguntas-lista">
          {Object.entries(perguntas).map(([key, value]) => (
            <div key={key} className="pergunta-item">
              <p>{perguntasMap[key] || key}</p>
              <div className="respostas">
                <button
                  className={`resposta-button ${value === 'Sim' ? 'selected' : ''}`}
                  onClick={() => handleRespostaChange(key, 'Sim')}
                >
                  Sim
                </button>
                <button
                  className={`resposta-button ${value === 'Não' ? 'selected' : ''}`}
                  onClick={() => handleRespostaChange(key, 'Não')}
                >
                  Não
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="enviar-button" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default PerguntasRetencao;
