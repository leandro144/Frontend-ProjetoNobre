const Contact = () => {
  return (
    <div className="contact-container">
      <div className="background-animation" />
      <div className="contact-form">
        <div className="titles">
          <h1>Entre em contato conosco</h1>
          <p>Conheça todos os cursos que nós oferecemos e escolha a melhor opção para você!!</p>
        </div>
        <div className="info-form">
          <form action="https://formsubmit.io/send/hectorsilva6907@gmail.com" method="POST">
            <input type="text" name="name" placeholder="Nome Completo" className="input-field" />
            <input type="email" name="email" placeholder="E-mail" className="input-field" />
            <input type="tel" name="telefone" placeholder="ex:(11)0000-0000" className="input-field" />
            <input type="text" name="curso" placeholder="Curso de interesse" className="input-field" />
            <input name="_formsubmit_id" type="text" style={{ display: 'none' }} />
            <button type="submit" id="submit-button">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
