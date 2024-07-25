import React, { useState } from 'react'
import StarRating from '../Components/StarRating';
import Header from '../layout/Header';

const ReviewPosting = () => {
    const [rating, setRating] = useState(null);
    const handleRatingSelect = (selectedRating) => {
        setRating(selectedRating);
    };
    return (
        <>
            <div className="bg-[#F1FFF4] min-h-screen">
                <Header />
                <div className="mt-10 mx-auto max-w-[1000px] bg-white">
                    <div className="border border-[#00000069]">
                        <div className="bg-[#3E7D5A] w-full text-[18px] py-3 flex items-center justify-center text-white">
                            Share Your Honest Feedback
                        </div>
                        <div className="py-7 px-10">
                            <div className="flex w-full lg:w-auto justify-between lg:justify-normal items-center gap-5 ml-[102px]">
                                <p className="text-[20px]">
                                    Rating<span className="text-red-500">*</span>
                                </p>
                                <StarRating onRatingSelect={handleRatingSelect} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewPosting