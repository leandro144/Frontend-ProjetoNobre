import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const DashTeachers = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    student: '',
    totalPresences: '',
    totalAbsences: '',
    activity1: '',
    activity2: '',
    exam: '',
    average: '',
    finalResult: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/get-teacher-data', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTeacherData(data);
        } else {
          console.error('Erro ao recuperar dados do professor');
        }
      } catch (error) {
        console.error('Erro ao fazer solicitação para recuperar dados do professor:', error);
      }
    };

    fetchTeacherData();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/usuarios', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          console.error('Erro ao recuperar dados dos alunos');
        }
      } catch (error) {
        console.error('Erro ao fazer solicitação para recuperar dados dos alunos:', error);
      }
    };

    fetchStudents();
  }, []);

  const toggleDetails = () => {
    setShowDetails(prevState => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchSubmit = await fetch('http://localhost:3000/add-dayli', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          student: formData.student,
          totalPresences: formData.totalPresences,
          totalAbsences: formData.totalAbsences,
          activity1: formData.activity1,
          activity2: formData.activity2,
          exam: formData.exam,
          average: formData.average,
          finalResult: formData.finalResult
        })
      });

      if (fetchSubmit.ok) {
        const res = await fetchSubmit.json();
        console.log(res);
        alert('Dados adicionados');
        setFormData({
          student: '',
          totalPresences: '',
          totalAbsences: '',
          activity1: '',
          activity2: '',
          exam: '',
          average: '',
          finalResult: ''
        });
      } else {
        console.error('Erro ao adicionar notas');
        alert('Erro ao adicionar notas');
      }
    } catch (error) {
      console.error('Erro ao adicionar notas:', error);
      alert('Erro ao adicionar notas');
    }
  };

  return (
    <>
      <Header />
      <div className='content-dash-teacher'>
        <div className="logout-data">
          {teacherData ? (
            <div className="teacher-details">
              <div>
                <h3>
                  Professor: {teacherData.nome}{' '}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    onClick={toggleDetails}
                    style={{ cursor: 'pointer' }}
                  />
                </h3>
                {showDetails && (
                  <div className='show-details'>
                    <p>Email: {teacherData.email}</p>
                    <p>Disciplina: {teacherData.matters}</p>
                  </div>
                )}
              </div>
              <div className='logout-icon' onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} style={{color: 'red', cursor: 'pointer'}} />
              </div>
            </div>
          ) : (
            <h1>Carregando...</h1>
          )}
        </div>

        <div className='content-add-grades'>
          <form className='add-grades-form' onSubmit={handleSubmit}>
            <h2>Adicionar Notas</h2>
            <div className='form-group'>
              <label htmlFor='student'>Aluno:</label>
              <select
                name='student'
                value={formData.student}
                onChange={handleInputChange}
                required
              >
                <option value='' style={{color: '#000'}}>Selecione um aluno</option>
                {students.map(student => (
                  <option key={student._id} value={student._id} style={{color: '#000'}}>{student.nome}</option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='totalPresences'>Total de Presenças:</label>
              <input
                type='number'
                name='totalPresences'
                value={formData.totalPresences}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='totalAbsences'>Total de Faltas:</label>
              <input
                type='number'
                name='totalAbsences'
                value={formData.totalAbsences}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='activity1'>Atividade 1:</label>
              <input
                type='number'
                name='activity1'
                value={formData.activity1}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='activity2'>Atividade 2:</label>
              <input
                type='number'
                name='activity2'
                value={formData.activity2}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='exam'>Prova:</label>
              <input
                type='number'
                name='exam'
                value={formData.exam}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='average'>Média:</label>
              <input
                type='number'
                name='average'
                value={formData.average}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='finalResult'>Resultado Final:</label>
              <input
                type='text'
                name='finalResult'
                value={formData.finalResult}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type='submit'>Adicionar Notas</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DashTeachers;
