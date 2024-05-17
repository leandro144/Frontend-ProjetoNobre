
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

const Admin = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchData = await fetch("http://localhost:3000/login-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(admin)
      });
      const res = await fetchData.json();

      if (fetchData.ok) {
        localStorage.setItem('token', res.token);
        navigate('/admin-logado');
      } else {
        alert(res.message || 'Ocorreu um erro durante o login');
      }

      setAdmin({
        email: "",
        password: ""
      });
    } catch (error) {
      console.log(error);
      alert('Ocorreu um erro durante o login');
    }
  };

  return (
    <>
      <Header />
      <div className="form-admin">
        <form className="adm" onSubmit={handleSubmit}>
            <legend>Central do administradores</legend>
            <div className="adm-login">
              <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={admin.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  required
                />
            </div>
                <div className="adm-login">
                  <label htmlFor="password">Senha</label>
                  <input
                  type="password"
                  name="password"
                  value={admin.password}
                  onChange={handleChange}
                  placeholder="Senha"
                  required
                  />
                </div>
                <div className="adm-login"> 
                  <button type="submit" id="btn" style={{cursor: "pointer"}}>Entrar</button>
                </div>
        </form>
      </div>
    </>
  );
};

export default Admin;
