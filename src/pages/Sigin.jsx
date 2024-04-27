import { useState } from "react";
import Header from "../components/Header";

const Sigin = () => {

  const [registerData, setRegisterData] = useState({
    nome: '',
    email: '',
    password: '',
    file: ''
  });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nome', registerData.nome);
      formData.append('email', registerData.email);
      formData.append('password', registerData.password);
      formData.append('file', registerData.file);

      const fetchData = await fetch('https://node-mongo-t3v4.onrender.com/register', {
        method: 'POST',
        body: formData,
      });

      if (fetchData.ok) {
        const res = await fetchData.json();
        console.log(res);
        alert('Usuário registrado com sucesso!');
        setRegisterData({
          nome: '',
          email: '',
          password: '',
          file: ''
        });
      } else {
        const errorMessage = await fetchData.text();
        console.error('Erro ao registrar usuário:', errorMessage);
        alert('Ocorreu um erro durante o registro: ' + errorMessage);
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      alert('Ocorreu um erro durante o registro. Por favor, tente novamente.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRegisterData(prevData => ({
      ...prevData,
      file: file
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <>
      <Header />
      <div className="content-admin">
        <form className="form-login" onSubmit={handleRegisterSubmit} encType="multipart/form-data">
          <legend>Registro de usuários para declaração</legend>
          <div className="input-admin">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={registerData.nome}
              onChange={handleRegisterChange}
              required />
          </div>
          <div className="input-admin">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="e-mail"
              value={registerData.email}
              onChange={handleRegisterChange}
              required />
          </div>
          <div className="input-admin">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required />
          </div>
          <div className="input-admin">
            <label htmlFor="file">Anexo da declaração</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange} />
          </div>
          <div className="input-admin">
            <button type="submit" id="btn" style={{ cursor: 'pointer' }}>Enviar</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Sigin;
