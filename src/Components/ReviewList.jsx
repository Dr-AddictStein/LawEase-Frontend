import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewList = ({ reviews }) => {
  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className=" border-gray-300 py-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold">{review.clientName}</h4>
              <div className="ml-4 flex top-3 relative">
                {[...Array(5)].map((star, i) => (
                  <FaStar
                    key={i}
                    color={i < review.rating ? '#ffc107' : '#e4e5e9'}
                  />
                ))}
              </div>
            </div>
            <p className="mt-0 w-full">{review.date}</p>
            <p className="mt-2 w-full">{review.desc}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
