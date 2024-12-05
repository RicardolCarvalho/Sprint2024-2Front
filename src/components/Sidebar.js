import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import home from "../image/home.png";
import alunos from "../image/alunos.png";
import professores from "../image/professores.png";
import turmas from "../image/turmas.png";
import sair from "../image/sair.png";
import voltar from "../image/seta_voltar.png";
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
          <div className="sidebar">
        <div className="menu-item">
          <Link to="/home" className={`menu-link ${location.pathname === '/home' ? 'active' : ''}`}>
            <img src={home} alt="Home" className="icon" />
            <span className="menu-text">Home</span>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/alunos" className={`menu-link ${location.pathname === '/alunos' ? 'active' : ''}`}>
            <img src={alunos} alt="Alunos" className="icon" />
            <span className="menu-text">Alunos</span>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/professores" className={`menu-link ${location.pathname === '/professores' ? 'active' : ''}`}>
            <img src={professores} alt="Professores" className="icon" />
            <span className="menu-text">Professores</span>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/turmas" className={`menu-link ${location.pathname === '/turmas' ? 'active' : ''}`}>
            <img src={turmas} alt="Turmas" className="icon" />
            <span className="menu-text">Turmas</span>
          </Link>
        </div>
        <div className="menu-item">
          <button onClick={() => navigate(-1)} className="menu-link">
            <img src={voltar} alt="Voltar" className="icon" />
            <span className="menu-text">Voltar</span>
          </button>
        </div>
        <div className="menu-item">
          <Link to="/" className={`menu-link ${location.pathname === '/' ? 'active' : ''}`}>
            <img src={sair} alt="Sair" className="icon" />
            <span className="menu-text">Sair</span>
          </Link>
        </div>
      </div>
  );
}; 
export default Sidebar;
