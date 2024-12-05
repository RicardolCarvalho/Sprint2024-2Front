import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nome || !senha) {
            setErrorMessage('Por favor, preencha todos os campos!');
            return;
        }
        console.log(JSON.stringify({ nome, senha }));

        try {
            const response = await fetch('http://localhost:8080/gestores/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, senha }),
            });

            if (!response.ok) {
                throw new Error('Credenciais inválidas!');
            }

            const data = await response.json();
            localStorage.setItem('gestor', JSON.stringify(data)); // Salva os dados do gestor
            navigate('/home'); // Redireciona para a página inicial
        } catch (error) {
            setErrorMessage('Credenciais inválidas! Tente novamente.');
        }
    };

    return (
        <div className="login-page">
            {/* Título no canto superior esquerdo */}
            <div className="top-left-title">Gestão Escolar</div>

            <div className="login-container">
                <form className="form-container" onSubmit={handleSubmit}>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <div className="input-container">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Digite seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <div className="button-container">
                        <button type="submit" className="submit">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
