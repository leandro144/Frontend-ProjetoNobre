import PropTypes from 'prop-types';

const Cards = ({ img, title, description }) => {
  return (
    <>
      <div className="cards">
        <div className="cards-item">
          <img src={img} alt="cursos" />
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

Cards.propTypes = {
  img: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired, 
  description: PropTypes.string.isRequired,
};

export default Cards;
