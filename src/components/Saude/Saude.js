import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './Saude.css';

const Saude = () => {
  const { id } = useParams(); // Obtém o ID (RA) pela URL
  const navigate = useNavigate(); // Hook para redirecionamento

  // Funções de redirecionamento para as respectivas páginas
  const handleLaudoClick = () => {
    navigate(`/laudos/${id}`);
  };

  const handleProblemasFamiliaresClick = () => {
    navigate(`/problemas-familiares/${id}`);
  };

  const handleAcompanhamentoPsicologicoClick = () => {
    navigate(`/acompanhamento/${id}`);
  };

  const handleCefaiClick = () => {
    navigate(`/cefai/${id}`);
  };

  const handleRestricaoAlimentarClick = () => {
    navigate(`/restricao/${id}`);
  };

  const handleAlergicosClick = () => {
    navigate(`/alergicos/${id}`);
  };

  return (
    <div className="saude-container">
      <Sidebar />
      <h2>Informações de Saúde</h2>
      <button className="saude-button" onClick={handleLaudoClick}>
        Laudos Médicos
      </button>
      <button className="saude-button" onClick={handleAcompanhamentoPsicologicoClick}>
        Acompanhamentos Psicológicos
      </button>
      <button className="saude-button" onClick={handleRestricaoAlimentarClick}>
        Restrição Alimentar
      </button>
      <button className="saude-button" onClick={handleCefaiClick}>
        CEFAI
      </button>
      <button className="saude-button" onClick={handleAlergicosClick}>
        Alérgicos
      </button>
      <button className="saude-button" onClick={handleProblemasFamiliaresClick}>
        Problemas Familiares
      </button>
    </div>
  );
};

export default Saude;
