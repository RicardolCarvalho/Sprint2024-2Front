import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Laudo from './components/Laudo/Laudo';
import Home from './components/Home';
import PerfilAluno from './components/PerfilAluno/PerfilAluno';
import Alunos from './components/Alunos/Alunos';
import Professores from './components/Professores/Professores';
import Turmas from './components/Turmas/Turmas';
import Saude from './components/Saude/Saude';
import Projetos from './components/Projetos/Projetos';
import ObsAluno from './components/ObsAluno/ObsAluno';
import RelatorioCompleto from './components/RelatorioCompleto/RelatorioCompleto';
import CadastraAluno from './components/CadastraAluno/CadastraAluno';
import CadastraProfessor from './components/CadastraProfessor/CadastraProfessor';
import Notas from './components/Notas/Notas';
import EditarAluno from './components/EditarAluno/EditarAluno';
import ProblemasFamiliares from './components/ProblemasFamiliares/ProblemasFamiliares';
import Acompanhamento from './components/Acompanhamento/Acompanhamento';
import Programa from './components/Programa/Programa';
import Restricao from './components/Restricao/Restricao';
import Alergicos from './components/Alergicos/Alergicos';
import PerguntasRetencao from './components/PerguntasRetencao/PerguntasRetencao';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cadastra-aluno" element={<CadastraAluno />} />
      <Route path="/perfil-aluno/:id" element={<PerfilAluno />} />
      <Route path="/alunos" element={<Alunos />} />
      <Route path="/laudos/:id" element={<Laudo />} />
      <Route path="/cadastra-professor" element={<CadastraProfessor />} />
      <Route path="/relatorio/:id" element={<RelatorioCompleto />} />
      <Route path="/notas_frequencias/:id" element={<Notas />} />
      <Route path="/projetos/:id" element={<Projetos />} />
      <Route path="/saude/:id" element={<Saude />} />
      <Route path="/observacoes/:id" element={<ObsAluno />} />
      <Route path="/professores" element={<Professores />} />
      <Route path="/turmas" element={<Turmas />} />
      <Route path="/editar-aluno/:id" element={<EditarAluno />} />
      <Route path="/problemas-familiares/:id" element={<ProblemasFamiliares />} />
      <Route path="/retencao/:id" element={<PerguntasRetencao />} />

      {/* Novas rotas para os novos componentes */}
      <Route path="/acompanhamento/:id" element={<Acompanhamento />} />
      <Route path="/cefai/:id" element={<Programa />} /> {/* Corrigido */}
      <Route path="/restricao/:id" element={<Restricao />} />
      <Route path="/alergicos/:id" element={<Alergicos />} />
    </Routes>
  );
};

export default App;
