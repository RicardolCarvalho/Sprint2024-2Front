import React, { useState } from 'react';
import Sidebar from '../Sidebar'; // Importando o componente Sidebar
import './CadastraAluno.css'; // Estilos específicos do componente CadastroAluno

const CadastraAluno = () => {
  const [formData, setFormData] = useState({
    nome: '',
    filiacao1: '',
    filiacao2: '',
    nomeSocialAluno: '',
    nomeAfetivoAluno: '',
    dataNascimento: '',
    cpf: '',
    rg: '',
    codigoAluno: '',
    codigoInep: '',
    turma: '',
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
      const response = await fetch('https://backspring-c8b11eddeece.herokuapp.com/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Aluno cadastrado com sucesso!');
        setFormData({
          nome: '',
          filiacao1: '',
          filiacao2: '',
          nomeSocialAluno: '',
          nomeAfetivoAluno: '',
          dataNascimento: '',
          cpf: '',
          rg: '',
          codigoAluno: '',
          codigoInep: '',
          turma: '',
        });
      } else {
        alert('Erro ao cadastrar aluno.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao cadastrar aluno.');
    }
  };

  return (
    <div className="cadastro-aluno-container">
      <Sidebar />
      <div className="content">
        <h2>Cadastro de Aluno</h2>
        <form onSubmit={handleSubmit} className="form-cadastro">
          <table className="cadastro-aluno-table">
            <tbody>
              <tr>
                <td><label htmlFor="nome">Nome:</label></td>
                <td><input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="filiacao1">Filiação 1:</label></td>
                <td><input type="text" id="filiacao1" name="filiacao1" value={formData.filiacao1} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="filiacao2">Filiação 2:</label></td>
                <td><input type="text" id="filiacao2" name="filiacao2" value={formData.filiacao2} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="nomeSocialAluno">Nome Social:</label></td>
                <td><input type="text" id="nomeSocialAluno" name="nomeSocialAluno" value={formData.nomeSocialAluno} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="nomeAfetivoAluno">Nome Afetivo:</label></td>
                <td><input type="text" id="nomeAfetivoAluno" name="nomeAfetivoAluno" value={formData.nomeAfetivoAluno} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="dataNascimento">Data de Nascimento:</label></td>
                <td><input type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="cpf">CPF:</label></td>
                <td><input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="rg">RG:</label></td>
                <td><input type="text" id="rg" name="rg" value={formData.rg} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="codigoAluno">Código do Aluno:</label></td>
                <td><input type="text" id="codigoAluno" name="codigoAluno" value={formData.codigoAluno} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="codigoInep">Código INEP:</label></td>
                <td><input type="text" id="codigoInep" name="codigoInep" value={formData.codigoInep} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="turma">Turma:</label></td>
                <td><input type="text" id="turma" name="turma" value={formData.turma} onChange={handleChange} required /></td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="submit-button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastraAluno;
