import React from 'react';

const Stepper = ({ steps, activeStep }) => {
  return (
    <div className="flex justify-center mb-10">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${index <= activeStep ? 'bg-[#4D7D5D] text-white' : 'bg-gray-200 text-black'}`}>
            {index + 1}
          </div>
          {index < steps.length - 1 && <div className="w-8 border-t-2 border-black"></div>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
