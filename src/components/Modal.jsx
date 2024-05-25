import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isVisible, onClose }) => {
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch("https://node-mongo-t3v4.onrender.com/getteachers");
        if (response.ok) {
          const data = await response.json();
          setTeacher(data);
        } else {
          throw new Error("Erro ao carregar lista de professores");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (isVisible) {
      fetchTeacher();
    }
  }, [isVisible]);

  const handleDeleteTeacher = async (id) => {
    try {
      const response = await fetch(`https://node-mongo-t3v4.onrender.com/getteachers/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Professor excluído com sucesso!");
        setTeacher(teacher.filter(t => t._id !== id));
      } else {
        throw new Error("Erro ao excluir professor");
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao excluir o professor. Por favor, tente novamente.");
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Lista de Professores</h2>
        <ul>
          {teacher.map((teacher) => (
            <li key={teacher._id}>
              {teacher.nome}
              <span className="delete-icon" onClick={() => handleDeleteTeacher(teacher._id)}>🗑️</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
