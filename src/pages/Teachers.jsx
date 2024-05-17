import { useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const Teachers = () => {

  const navigate = useNavigate()

  const [login, setLogin] = useState({
    email: '',
    password: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin(prevData => ({
        ...prevData,
        [name]: value
      }));
  }

  const handleRegisterLogin = async (e) => {
    e.preventDefault();
  
    try {
      const fetchLogin = await fetch('https://node-mongo-t3v4.onrender.com/login-teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      });
  
      if (fetchLogin.ok) {
        const res = await fetchLogin.json();
        console.log('Login bem-sucedido:', res);
        localStorage.setItem('token', res.token);
        alert('Logado com sucesso!!');
        navigate('/loginteachers');
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      console.log(error);
      alert('Erro ao fazer login. Por favor, tente novamente.');
    }
  };
  
  

  return (
    <>
        <Header />
        <div className="content-teacher">
            <h1 style={{color: '#fff', textAlign: 'center', marginBottom: '1rem'}}>Central dos Professores</h1>
            <form className='form-teacher' onSubmit={handleRegisterLogin}>
              <legend id='legend'>Login</legend>
              <div className="inputs-teacher">
                <label htmlFor="email">E-mail :</label>
                <input 
                type="email"
                name='email'
                placeholder='email' 
                value={login.email}
                onChange={handleChange}
                required />
              </div>
              <div className="inputs-teacher">
                <label htmlFor="password">Senha :</label>
                <input 
                type="password" 
                name='password'
                placeholder='senha' 
                value={login.password}
                onChange={handleChange}
                required />
              </div>
              <div className="inputs-teacher">
                <button type='submit'>Entrar</button>
              </div>
            </form>
        </div>
    </>
  )
}

export default Teachers