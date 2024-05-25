import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom"; // Certifique-se de estar usando react-router-dom para navegação
import Header from "../components/Header";
import Modal from "../components/Modal";

const Sigin = () => {
  const navigate = useNavigate(); 

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

  // State for teacher registration
  const [registerTeacher, setRegisterTeacher] = useState({
    name: '',
    email: '',
    password: '',
    matters: ''
  });

  const handleRegisterTeacherChange = (e) => {
    const { name, value } = e.target;
    setRegisterTeacher(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchRegisterTeacher = await fetch('https://node-mongo-t3v4.onrender.com/register-teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerTeacher)
      });

      if (fetchRegisterTeacher.ok) {
        const res = await fetchRegisterTeacher.json();
        setRegisterTeacher(res);
        setRegisterTeacher({
          name: '',
          email: '',
          password: '',
          matters: '',
        });
        alert('Professor adicionado com sucesso!!');
      }
    } catch (error) {
      console.log(error);
      alert('Erro ao cadastrar professor!!');
    }
  };

  // State for student list and modal visibility
  const [modalOpen, setModalOpen] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [teacherModalOpen, setTeacherModalOpen] = useState(false);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await fetch("https://node-mongo-t3v4.onrender.com/usuarios");
        if (response.ok) {
          const data = await response.json();
          setAlunos(data);
        } else {
          throw new Error("Erro ao carregar lista de alunos");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlunos();
  }, [modalOpen]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDeleteAluno = async (id) => {
    try {
      const response = await fetch(`https://node-mongo-t3v4.onrender.com/usuarios/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Aluno excluído com sucesso!");
        setModalOpen(false);
      } else {
        throw new Error("Erro ao excluir aluno");
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao excluir o aluno. Por favor, tente novamente.");
    }
  };

  const handleModalTeacher = () => {
    setTeacherModalOpen(true);
  };

  const closeTeacherModal = () => {
    setTeacherModalOpen(false);
  };

  // Função de logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/secretaria');
  };

  return (
    <>
      <Header />
      <div className="logout-adm">
        <button onClick={handleLogout}>Sair</button>
      </div>
      <div className="content-admin">
        <form className="form-login" onSubmit={handleRegisterSubmit} encType="multipart/form-data">
          <div className="modal-flex">
            <legend>Registro de alunos para declaração</legend>
            <button className="modal-btn" type="button" onClick={openModal}>Ver Alunos</button>
          </div>
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
        <form className="form-login" onSubmit={handleTeacherSubmit}>
          <div className="modal-flex">
            <legend>Cadastro de professores</legend>
            <button className="modal-btn" type="button" onClick={handleModalTeacher}>Professores</button>
          </div>
          <div className="input-admin">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              name="name"
              placeholder="Nome completo"
              value={registerTeacher.name}
              onChange={handleRegisterTeacherChange}
              required />
          </div>
          <div className="input-admin">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="e-mail"
              value={registerTeacher.email}
              onChange={handleRegisterTeacherChange}
              required />
          </div>
          <div className="input-admin">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={registerTeacher.password}
              onChange={handleRegisterTeacherChange}
              required />
          </div>
          <div className="input-admin">
            <label htmlFor="matters">Matéria</label>
            <input
              type="text"
              name="matters"
              placeholder="disciplina que dará aula"
              value={registerTeacher.matters}
              onChange={handleRegisterTeacherChange}
              required />
          </div>
          <div className="input-admin">
            <button type="submit" id="btn" style={{ cursor: 'pointer' }}>Enviar</button>
          </div>
        </form>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Lista de Alunos</h2>
            <ul>
              {alunos.map((aluno) => (
                <li key={aluno._id}>
                  {aluno.nome}
                  <span className="delete-icon" onClick={() => handleDeleteAluno(aluno._id)}>🗑️</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Modal isVisible={teacherModalOpen} onClose={closeTeacherModal} />
    </>
  );
};

export default Sigin;
