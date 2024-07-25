import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [actualOtp, setActualOtp] = useState("");

  const { login, error } = useLogin();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    const response = await login(email, password);

    if (response) {
      alert(response);
      setEmail("");
      setPassword("");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/lawyer/login/forgetpassword",
        { email }
      );
      setActualOtp(response.data);
      setIsForgotPassword("otp");
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

    setIsForgotPassword("resetPassword");
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:4000/api/lawyer/updatePassword/${email}`,
        { password: newPassword }
      );
      alert("Password updated successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Error updating password:", error);
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
            <img src="/login.png" className="mt-[60px]" alt="" />
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
              Welcome Back
            </h2>
            {!isForgotPassword && (
              <form
                className="my-[20px] lg:my-[90px]"
                onSubmit={handleLoginSubmit}
              >
                <div className="flex items-center flex-col lg:flex-row mt-[20px] lg:mt-[50px]">
                  <input
                    placeholder="E-mail"
                    className="border-b min-w-[280px] lg:min-w-[350px] bg-transparent border-black py-1 outline-none"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex items-center flex-col lg:flex-row mt-[20px] lg:mt-[50px]">
                  <input
                    placeholder="Password"
                    className="border-b min-w-[280px] lg:min-w-[350px] bg-transparent border-black py-1 outline-none"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="w-full flex items-center justify-center">
                  <button className="px-[80px] min-w-[280px] lg:min-w-[350px] mt-[30px] lg:mt-[50px] py-3 bg-[#52715D] text-[#E0E1DD] font-semibold rounded-[12px] text-[20px]">
                    LogIn
                  </button>
                </div>
                <div className="flex justify-center mt-5">
                  <button
                    type="button"
                    className="text-[#52715D] font-semibold"
                    onClick={() => setIsForgotPassword(true)}
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
            )}
            {isForgotPassword === true && (
              <form
                className="my-[20px] lg:my-[90px]"
                onSubmit={handleForgotPasswordSubmit}
              >
                <div className="flex items-center flex-col lg:flex-row mt-[20px] lg:mt-[50px]">
                  <input
                    placeholder="Enter your email"
                    className="border-b min-w-[280px] lg:min-w-[350px] bg-transparent border-black py-1 outline-none"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-full flex items-center justify-center">
                  <button className="px-[80px] min-w-[280px] lg:min-w-[350px] mt-[30px] lg:mt-[50px] py-3 bg-[#52715D] text-[#E0E1DD] font-semibold rounded-[12px] text-[20px]">
                    Send OTP
                  </button>
                </div>
              </form>
            )}
            {isForgotPassword === "otp" && (
              <form
                className="my-[20px] lg:my-[90px]"
                onSubmit={handleOtpSubmit}
              >
                <div className="flex items-center flex-col lg:flex-row mt-[20px] lg:mt-[50px]">
                  <input
                    placeholder="Enter OTP"
                    className="border-b min-w-[280px] lg:min-w-[350px] bg-transparent border-black py-1 outline-none"
                    required
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className="w-full flex items-center justify-center">
                  <button className="px-[80px] min-w-[280px] lg:min-w-[350px] mt-[30px] lg:mt-[50px] py-3 bg-[#52715D] text-[#E0E1DD] font-semibold rounded-[12px] text-[20px]">
                    Verify OTP
                  </button>
                </div>
              </form>
            )}
            {isForgotPassword === "resetPassword" && (
              <form
                className="my-[20px] lg:my-[90px]"
                onSubmit={handleResetPasswordSubmit}
              >
                <div className="flex items-center flex-col lg:flex-row mt-[20px] lg:mt-[50px]">
                  <input
                    placeholder="New Password"
                    className="border-b min-w-[280px] lg:min-w-[350px] bg-transparent border-black py-1 outline-none"
                    required
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center flex-col lg:flex-row mt-[20px] lg:mt-[50px]">
                  <input
                    placeholder="Confirm New Password"
                    className="border-b min-w-[280px] lg:min-w-[350px] bg-transparent border-black py-1 outline-none"
                    required
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
                <div className="w-full flex items-center justify-center">
                  <button className="px-[80px] min-w-[280px] lg:min-w-[350px] mt-[30px] lg:mt-[50px] py-3 bg-[#52715D] text-[#E0E1DD] font-semibold rounded-[12px] text-[20px]">
                    Reset Password
                  </button>
                </div>
              </form>
            )}

            <div className="flex mt-[60px] mb-3 lg:mb-0 lg:mt-[140px] items-center gap-4 justify-center">
              <p className="font-light">New to LawEase?</p>{" "}
              <Link
                to="/join"
                className="border-[#4BAF70] font-semibold border rounded-[12px] px-5 py-2 text-[#4BB070]"
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
