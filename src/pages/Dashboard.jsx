import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { IoMdLogOut } from "react-icons/io";
import { FaUserGraduate } from "react-icons/fa";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const fetchData = await fetch("https://node-mongo-t3v4.onrender.com/user-data", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        });

        if (!fetchData.ok) {
          throw new Error('Erro ao buscar dados do usuário');
        }

        const userData = await fetchData.json();
        setUserData(userData);
        console.log(userData);
      } catch (error) {
        console.log(error);
        alert('Ocorreu um erro ao buscar dados do usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isValidFileType = (filePath) => {
    return filePath.toLowerCase().endsWith('.pdf');
  };

  const handleDownload = async () => {
    try {
      if (!userData || !userData.filePath) {
        throw new Error('Dados do usuário não disponíveis');
      }
  
      const token = localStorage.getItem('token');
      const fileName = userData.filePath;
  
      const fetchData = await fetch(`https://node-mongo-t3v4.onrender.com/download-pdf/${fileName}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!fetchData.ok) {
        throw new Error('Erro ao baixar o arquivo');
      }
  
      const blob = await fetchData.blob();
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
      alert('Ocorreu um erro ao baixar o arquivo');
    }
  };
  
  return (
    <>
      <Header />
      <div className="content-dash">
        <div className="flex-dash">
            <button id="btn-dash" onClick={handleLogout}>
            <span className="icon-dash">
              <IoMdLogOut />
            </span>
          </button>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="datadash">
              <span><FaUserGraduate /></span>
              <p>{userData ? userData.nome : 'Não disponível'}</p>
              {userData && userData.filePath && isValidFileType(userData.filePath) && (
                <a href="#" onClick={handleDownload} id="btn-download">Baixar Arquivo</a>
              )}
              {userData && !isValidFileType(userData.filePath) && (
                <p>O arquivo não é do tipo PDF</p>
              )}
            </div>
          )}
        </div>
        <div className="center-table">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Total de presença</th>
                <th>Total de faltas</th>
                <th>Nota atv-1</th>
                <th>Nota atv-2</th>
                <th>Nota da Prova</th>
                <th>Média</th>
                <th>Resultado final</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData ? userData.nome : 'Não disponível'}</td>
                <td>{userData ? userData.totalAttendance : 'Não disponível'}</td>
                <td>{userData ? userData.totalFault : 'Não disponível'}</td>
                <td>{userData ? userData.Ativ1 : 'Não disponível'}</td>
                <td>{userData ? userData.ativ2 : 'Não disponível'}</td>
                <td>{userData ? userData.Prova : 'Não disponível'}</td>
                <td>{userData ? userData.media : 'Não disponível'}</td>
                <td>{userData ? userData.resultFinal : 'Não disponível'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
