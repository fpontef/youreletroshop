import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index}>
          <i
            style={{ color: color }}
            className={
              value >= index
                ? 'fas fa-star'
                : value >= index - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string.isRequired,
};

export default Rating;
