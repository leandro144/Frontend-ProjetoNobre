import { useState } from 'react';
import logo from '../assets/logo.png';
import { TiThMenu } from "react-icons/ti";

const Mobile = () => {
    const [mobile, setMobile] = useState(false);

    const toggleMenu = () => {
        setMobile(!mobile);
    };

    return (
        <>
            <header className='menu-mobile'>
                <div className="logo">
                    <img src={logo} alt="imagem-logo" />
                </div>
                <nav className={`menu-mobile-nav ${mobile ? 'active' : ''}`}>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="">Cursos</a></li>
                        <li><a href="">Carreiras</a></li>
                        <li><a href="">Contato</a></li>
                        <li><a href="/secretaria">Secretaria</a></li>
                        <li><a href="/centraldoaluno">Central do aluno</a></li>
                        <li><a href="/centraldosprofessores">Central dos professores</a></li>
                    </ul>
                </nav>
                <TiThMenu className={`icon ${mobile ? 'active' : ''}`} onClick={toggleMenu} />
            </header>
        </>
    );
};

export default Mobile;
