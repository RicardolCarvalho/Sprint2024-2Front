import React from 'react';
import { useParams } from 'react-router-dom';

const Projetos = () => {
  const { ra } = useParams();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Projetos</h1>
      <p>Lista de projetos realizados pelo aluno com RA: {ra}</p>
      <ul>
        <li>Projeto 1: Sistema Solar - Nota: A</li>
        <li>Projeto 2: Aplicação React Básica - Nota: B+</li>
        <li>Projeto 3: Experimento de Química - Nota: A-</li>
      </ul>
    </div>
  );
};

export default Projetos;
