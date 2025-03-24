import React from 'react';

const StarRating = ({ rating }) => {
  // Garante que a classificação não seja maior que 5
  const filledStars = Math.min(Math.max(rating, 0), 5);

  return (
    <div className="star-rating">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          className="star"
          xmlns="http://www.w3.org/2000/svg"
            width="44" 
            height="42" 
            viewBox="0 0 44 42"
          fill={index < filledStars ?'#F9A826' : '#AFA9A9'} 
          
        >
          <path d="M21.0489 0.701624C21.3483 -0.219687 22.6517 -0.219686 22.9511 0.701625L27.3883 14.3582C27.5222 14.7702 27.9062 15.0491 28.3394 15.0491H42.6987C43.6675 15.0491 44.0702 16.2888 43.2865 16.8582L31.6696 25.2984C31.3191 25.553 31.1724 26.0044 31.3063 26.4164L35.7436 40.0729C36.0429 40.9943 34.9884 41.7604 34.2047 41.191L22.5878 32.7508C22.2373 32.4961 21.7627 32.4961 21.4122 32.7508L9.79527 41.191C9.01155 41.7604 7.95707 40.9943 8.25642 40.0729L12.6937 26.4164C12.8276 26.0044 12.6809 25.553 12.3304 25.2984L0.713483 16.8582C-0.0702302 16.2888 0.332547 15.0491 1.30127 15.0491H15.6606C16.0938 15.0491 16.4778 14.7702 16.6117 14.3582L21.0489 0.701624Z"/>
        </svg>
      ))}
    </div>
  );
};

export default StarRating;

   