import logo from '../assets/logo.png'
import Mobile from './Mobile'

const Header = () => {

    return (
        <>
            <header className='menu'>
                <div className="logo">
                    <img src={logo} alt="imagem-logo" />
                </div>
                <nav>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="#cards-item">Cursos</a></li>
                        <li><a href="/teste">Contato</a></li>
                        <li><a href="/secretaria">Secretaria</a></li>
                        <li><a href="/centraldoaluno">Central do Aluno</a></li>
                    </ul>
                </nav>
            </header>
            <Mobile />
        </>
  )
}

export default Header