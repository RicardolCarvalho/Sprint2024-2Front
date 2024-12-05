import React, { useState } from "react";
import Sidebar from "../Sidebar"; // Importando o componente Sidebar
import "./CadastraProfessor.css"; // Estilos específicos do componente CadastroProfessor

const CadastraProfessor = () => {
  const [formData, setFormData] = useState({
    nome: "",
    jornada: "JEIF",
    acumulo: "Não",
    curricular: "", // Alterado de 'componentesCurriculares' para 'curricular'
    turmas: "", // Alterado de 'turma' para 'turmas'
    projetos: "",
    ativo: true, // Campo adicional para o status
  });

  // Função para atualizar os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertendo "Sim"/"Não" para booleano no campo 'acumulo'
      const payload = {
        ...formData,
        acumulo: formData.acumulo === "Sim",
      };

      const response = await fetch("https://backspring-c8b11eddeece.herokuapp.com/professores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Professor cadastrado com sucesso!");
        setFormData({
          nome: "",
          jornada: "JEIF",
          acumulo: "Não",
          curricular: "",
          turmas: "",
          projetos: "",
          ativo: true,
        });
      } else {
        alert("Erro ao cadastrar professor.");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Erro ao cadastrar professor.");
    }
  };

  return (
    <div className="cadastro-professor-container">
      <Sidebar />
      <div className="content">
        <h2>Cadastro de Professor</h2>
        <form onSubmit={handleSubmit} className="form-cadastro">
          <table className="cadastro-professor-table">
            <tbody>
              <tr>
                <td><label htmlFor="nome">Nome:</label></td>
                <td>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="jornada">Jornada:</label></td>
                <td>
                  <select
                    id="jornada"
                    name="jornada"
                    value={formData.jornada}
                    onChange={handleChange}
                    required
                  >
                    <option value="JEIF">JEIF</option>
                    <option value="JBD">JBD</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="acumulo">Tem Acúmulo?</label></td>
                <td>
                  <select
                    id="acumulo"
                    name="acumulo"
                    value={formData.acumulo}
                    onChange={handleChange}
                    required
                  >
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="curricular">Componentes Curriculares:</label></td>
                <td>
                  <input
                    type="text"
                    id="curricular"
                    name="curricular"
                    value={formData.curricular}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="turmas">Turmas:</label></td>
                <td>
                  <input
                    type="text"
                    id="turmas"
                    name="turmas"
                    value={formData.turmas}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="projetos">Projetos:</label></td>
                <td>
                  <input
                    type="text"
                    id="projetos"
                    name="projetos"
                    value={formData.projetos}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="submit-button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastraProfessor;