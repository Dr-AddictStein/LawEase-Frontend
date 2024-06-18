import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Home = () => {
  return (
    <>
    <Header/>
    <div className=" py-[20px] px-3 lg:px-0 bg-[#F1FFF4]">
      <div className="max-w-[1120px] mx-auto">
        <div className=" bg-white border border-black  rounded-[12px] py-5 flex items-center flex-col gap-5">
          <img className="w-[177px]" src="/home.png" alt="" />
          <p className="text-[20px] text-center">
            Are you in a condition where finding legal help is difficult ? Dont
            Worry <br />
            We are here to help you
          </p>
          <button className="text-white font-medium bg-[#4D7D5D] px-14 rounded-[8px] py-[10px]">
            GET HELP
          </button>
        </div>
        <h2 className="py-5 text-[32px] font-semibold">Services</h2>
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((item, ind) => (
            <div className="bg-white rounded-[8px] flex items-center flex-col gap-3 border border-[#00000066] p-5">
              <img src={`/s${item}.png`} className="w-[60px]" alt="" />
              <p className="text-[#6C6C6C]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                mattis convallis facilisis. Fusce vel nulla diam. Orci varius
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Maecenas ut risus vehicula, cursus ex sit amet,
                sodales.
              </p>
            </div>
          ))}
        </div>
        <h2 className="py-5 text-[32px] font-semibold">Just three steps</h2>
        <div className=" border border-black bg-white justify-center rounded-[12px] p-8 flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
          <div>
            <img src="/j1.png" alt="" />
            <p className="text-[20px] mt-3 text-center">Choose the category</p>
          </div>
          <img src="/arrow.png" className=" rotate-90 lg:rotate-0 lg:my-0 my-[60px]" alt="" />
          <div>
            <img src="/j2.png" alt="" />
            <p className="text-[20px] mt-3 text-center">Select Lawyer</p>
          </div>
          <img src="/arrow.png" className=" rotate-90 lg:rotate-0 lg:my-0 my-[60px]" alt="" />
          <div>
            <img src="/j3.png" alt="" />
            <p className="text-[20px] mt-3 text-center">Book Appointment</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
