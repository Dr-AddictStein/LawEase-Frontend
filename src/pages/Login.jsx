import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="w-full relative lg:h-screen overflow-hidden bg-white  lg:bg-[#7AA689]">
      <div className="hidden lg:flex items-center relative justify-end w-full">
        <img
          src="/abackground.png"
          className=" w-[60%] relative -top-[100px] h-[1200px]"
          alt=""
        />
      </div>
      <div className="w-full px-3 lg:absolute top-0 left-0 z-50">
        <div className="lg:w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className=" hidden lg:block">
            <Link to="/" className="flex items-center mt-8 gap-3">
              <BsArrowLeft className="text-white w-5 h-5" />
              <p className="text-[20px] text-white">Back to Homepage</p>
            </Link>
            <img src="/login.png" className="mt-[60px]" alt="" />
          </div>
          <div className="lg:px-[80px] mx-auto">
          <Link to="/" className=" flex lg:hidden items-center justify-center mt-8 gap-3">
              <BsArrowLeft className=" w-4 h-4" />
              <p className="text-[14px] ">Back to Homepage</p>
            </Link>
            <h2 className="text-[#415A77] text-[30px] lg:text-[50px] font-semibold text-center mt-[50px] lg:mt-[150px]">
            Welcome Back
            </h2>
            <form className="my-[20px] lg:my-[90px]" action="">
         
              <div className="flex items-center  flex-col lg:flex-row  mt-[20px]  lg:mt-[50px]">
                <input
                  placeholder="E-mail"
                  className="border-b min-w-[280px] lg:min-w-[350px]  bg-transparent border-black py-1 outline-none"
                  required
                  type="Email"
                />
              </div>
              <div className="flex items-center  flex-col lg:flex-row  mt-[20px]  lg:mt-[50px]">
                <input
                  placeholder="Password"
                  className="border-b min-w-[280px] lg:min-w-[350px]  bg-transparent border-black py-1 outline-none"
                  required
                  type="text"
                />
              </div>
       
            <div className="w-full flex items-center ">
            <button className="  px-[80px]  min-w-[280px] lg:min-w-[350px] mt-[30px] lg:mt-[50px] py-3 bg-[#52715D] text-[#E0E1DD] font-semibold rounded-[12px] text-[20px]">
            LogIn
              </button>
            </div>
            </form>

            <div className="flex mt-[60px] mb-3 lg:mb-0 lg:mt-[140px] items-center gap-4 justify-center">
<p className=" font-light">New to LawEase ? </p>  <Link to="/join" className='border-[#4BAF70] font-semibold border rounded-[12px] px-5 py-2 text-[#4BB070]'>Join</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
