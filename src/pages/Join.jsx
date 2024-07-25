import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import axios from "axios";

const Join = () => {
  const navigate = useNavigate();
  const { signup, error } = useSignup();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [actualOtp, setActualOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userData = {
      firstName,
      lastName,
      phone,
      email,
      password,
    };

    try {
      const response = await axios.post(
        `http://localhost:4000/api/lawyer/signup/sendotp`,
        { email, phone, firstName, lastName }
      );
      setActualOtp(response.data);
      setShowOtpInput(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otp !== actualOtp) {
      alert("Incorrect OTP. Please try again.");
      return;
    }

    const response = await signup(firstName, lastName, phone, email, password);
    if (response) {
      alert(response);
    } else {
      // navigate("/");
    }
  };

  return (
    <div className="w-full relative lg:h-screen overflow-hidden bg-white lg:bg-[#7AA689]">
      <div className="hidden lg:flex items-center relative justify-end w-full">
        <img
          src="/abackground.png"
          className="w-[60%] relative -top-[100px] h-[1200px]"
          alt=""
        />
      </div>
      <div className="w-full px-3 lg:absolute top-0 left-0 z-50">
        <div className="lg:w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="hidden lg:block">
            <Link to="/" className="flex items-center mt-8 gap-3">
              <BsArrowLeft className="text-white w-5 h-5" />
              <p className="text-[20px] text-white">Back to Homepage</p>
            </Link>
            <img src="/join.png" className="mt-[60px]" alt="" />
          </div>
          <div className="lg:px-[80px] mx-auto">
            <Link
              to="/"
              className="flex lg:hidden items-center justify-center mt-8 gap-3"
            >
              <BsArrowLeft className="w-4 h-4" />
              <p className="text-[14px]">Back to Homepage</p>
            </Link>
            <h2 className="text-[#415A77] text-[30px] lg:text-[50px] font-semibold text-center mt-[50px] lg:mt-[150px]">
              Getting started
            </h2>
            {!showOtpInput ? (
              <form
                className="my-[20px] lg:my-[60px]"
                onSubmit={handleSubmit}
              >
                <div className="flex items-center flex-col lg:flex-row gap-5 lg:gap-10">
                  <input
                    placeholder="First Name"
                    className="border-b min-w-[280px] lg:min-w-[auto] bg-transparent border-black py-1 outline-none"
                    required
                    type="text"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <input
                    placeholder="Last Name"
                    className="border-b min-w-[280px] lg:min-w-[auto] bg-transparent border-black py-1 outline-none"
                    required
                    type="text"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>

                <div className="flex items-center flex-col lg:flex-row mt-[20px] lg:mt-[50px]">
                  <input
                    placeholder="Mobile"
                    className="border-b min-w-[280px] lg:min-w-[auto] bg-transparent border-black py-1 outline-none"
                    required
                    type="text"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>
                <div className="flex items-center flex-col lg:flex-row mt-[20px] lg:mt-[50px]">
                  <input
                    placeholder="E-mail"
                    className="border-b min-w-[280px] lg:min-w-[auto] bg-transparent border-black py-1 outline-none"
                    required
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="flex items-center flex-col lg:flex-row gap-5 lg:gap-10 mt-[20px] lg:mt-[50px]">
                  <input
                    placeholder="Enter Password"
                    className="border-b min-w-[280px] lg:min-w-[auto] bg-transparent border-black py-1 outline-none"
                    required
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <input
                    placeholder="Confirm Password"
                    className="border-b min-w-[280px] lg:min-w-[auto] bg-transparent border-black py-1 outline-none"
                    required
                    type="password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-[30px] flex justify-center lg:justify-start items-center gap-2">
                  <input required type="checkbox" name="agree" id="agree" />{" "}
                  <label htmlFor="agree" className="text-[#404D42DB]">
                    I agree to terms and conditions
                  </label>
                </div>
                <div className="w-full flex items-center justify-center">
                  <button className="px-[80px] mt-[30px] py-3 bg-[#52715D] text-[#E0E1DD] font-semibold rounded-[12px] text-[20px]">
                    Create account
                  </button>
                </div>
              </form>
            ) : (
              <form
                className="my-[20px] lg:my-[60px]"
                onSubmit={handleOtpSubmit}
              >
                <div className="flex items-center justify-center flex-col lg:flex-row mt-[20px] lg:mt-[50px]">
                  <input
                    placeholder="Enter OTP"
                    className="border-b min-w-[280px] lg:min-w-[auto] bg-transparent border-black py-1 outline-none"
                    required
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full flex items-center justify-center">
                  <button className="px-[80px] mt-[30px] py-3 bg-[#52715D] text-[#E0E1DD] font-semibold rounded-[12px] text-[20px]">
                    Verify OTP
                  </button>
                </div>
              </form>
            )}

            <div className="flex mt-[60px] mb-3 lg:mb-0 lg:mt-[140px] items-center gap-2 justify-center">
              <p className="font-light">Already have an account?</p>{" "}
              <p>
                Click here to <Link className="text-pr" to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
