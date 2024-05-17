import { useState, useEffect } from 'react';

const handleDeleteAluno = async (id, setLoading, setError, closeModal) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      alert('Aluno excluído com sucesso!');
      closeModal();
    } else if (response.status === 404) {
      throw new Error('Usuário não encontrado');
    } else {
      throw new Error('Erro ao excluir aluno');
    }
  } catch (error) {
    console.error(error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

const ModalContent = ({ alunos, handleDeleteAluno, closeModal }) => (
  <div className="modal-content">
    <span className="close" onClick={closeModal}>&times;</span>
    <h2>Lista de Alunos</h2>
    <ul>
      {alunos.map(aluno => (
        <li key={aluno.id}>
          {aluno.nome}
          <span
            className="delete-icon"
            onClick={() => handleDeleteAluno(aluno.id)}
          >
            🗑️
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAlunos = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios');
      const data = await response.json();
      setAlunos(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Abrir Lista de Alunos</button>
      {modalOpen && (
        <div className="modal">
          {loading ? (
            <p>Excluindo aluno...</p>
          ) : (
            <ModalContent
              alunos={alunos}
              handleDeleteAluno={(id) => handleDeleteAluno(id, setLoading, setError, closeModal)}
              closeModal={closeModal}
            />
          )}
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
