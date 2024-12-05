import React, { useState } from 'react';
import './Home.css';
import Sidebar from './Sidebar';

const Home = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [years] = useState([2024, 2023, 2022, 2021,2020,2019,2018,2017,2016,2015,]);
  const [classes] = useState(['1 ANO A', '2 ANO B', '3 ANO C', '4 ANO D']);

  const handleYearClick = (year) => {
    setSelectedYear(selectedYear === year ? null : year);
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
          <h1>Olá! Bem-Vindo ao Portfólio do Aluno</h1>
        <div className="welcome-message">
          <div className="description-box">
            Este espaço foi criado para celebrar a jornada de aprendizado de cada estudante da Escola Gonzaguinha. Aqui, você encontrará projetos, conquistas e momentos que refletem o crescimento, a criatividade e o empenho de nossos alunos.
            Mais do que um registro de atividades, este portfólio é uma janela para as histórias de quem aprende, explora e transforma o conhecimento em algo significativo. Nosso objetivo é humanizar a educação, valorizando cada passo dado nesse processo.
            Descubra os talentos, sonhos e realizações que tornam cada aluno único. Afinal, aprender é muito mais do que acumular saberes: é crescer como pessoa e contribuir para um mundo melhor.
          </div>
        </div>
          <h2 className='years-title'>Anos</h2>
        <div className="years-container">
          <div className="scrollable-years">
            {years.map((year) => (
              <div key={year} className="year-item">
                <button
                  className={`year-button ${selectedYear === year ? 'active' : ''}`}
                  onClick={() => handleYearClick(year)}
                >
                  {year}
                </button>
                {selectedYear === year && (
                  <div className="classes-container">
                    <div className="scrollable-classes">
                      {classes.map((classItem) => (
                        <div key={classItem} className="class-item">
                          {classItem}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="add-year-button">Adicionar ano</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
