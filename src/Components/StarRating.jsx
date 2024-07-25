import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ onRatingSelect }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="flex justify-center">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
                onRatingSelect(ratingValue);
              }}
              className="hidden"
            />
            <FaStar
              size={30}
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
