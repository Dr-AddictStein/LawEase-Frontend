import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuHome } from "react-icons/lu";
import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [isloggedIn, setUsedIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user) setUsedIsLoggedIn(true);
  }, [user]);
  return (
    <div className="w-full relative border-b border-black">
      <div className="bg-white flex py-3  items-center justify-between px-5 ">
        <Link to="/">
          <h1 className="text-[27px] font-[700] text-[#4D8360]">LawEase</h1>
        </Link>
        {isloggedIn ? (
          <div className="flex items-center ">
            <Link
              to="/"
              className=" rounded-[12px] px-3  flex items-center gap-1 "
            >
              <span className="pt-1"> Home</span>
            </Link>
            <Link
              to={`/profile/${user.user._id}`}
              className="  rounded-[12px] px-3  flex items-center gap-1 "
            >
              <span className="pt-1"> Profile</span>
            </Link>
            <Link
              to={`/appointments/${user.user._id}`}
              className=" rounded-[12px] px-3  flex items-center gap-1 "
            >
              <span className="pt-1"> Appointments</span>
            </Link>
            <Link
              to={`/availablity/${user.user._id}`}
              className="  rounded-[12px] px-3  flex items-center gap-1 "
            >
              <span className="pt-1"> Availablity</span>
            </Link>
            <Link
              to="/"
              className="font-semibold  rounded-[12px] px-3  flex items-center gap-1 "
            >
              <button
                className="border-[#4BAF70] border rounded-[12px] px-3 py-2 text-[#4BB070]"
                onClick={(e) => {
                  logout();
                  setUsedIsLoggedIn(false);
                }}
              >
                <span className="pt-1 "> Logout</span>
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className=" hidden lg:flex ">
              {/* <Link to="/" className="flex items-center gap-2 text-[18px] text-[#4D8360]"><LuHome className="w-5 h-5" /> Home</Link> */}
            </div>{" "}
            :{" "}
            <div className=" hidden lg:flex items-center gap-5">
              <Link to="/">Home</Link>
              <Link>
                <ScrollLink to="services" smooth={true} duration={500}>
                  Services
                </ScrollLink>
              </Link>
              <Link to="/login">Log In</Link>
              <Link
                to="/join"
                className="border-[#4BAF70] font-semibold border rounded-[12px] px-5 py-2 text-[#4BB070]"
              >
                Join
              </Link>
            </div>
            <FaBars
              onClick={() => setOpen(true)}
              className=" w-6 h-6 cursor-pointer lg:hidden"
            />
          </>
        )}
      </div>
      {open && (
        <div className=" absolute top-0 left-0 flex flex-col items-center justify-center gap-3 w-full bg-white h-full min-h-screen z-[70]">
          <div className=" absolute top-5 right-5 z-[90]">
            <AiOutlineClose
              className="w-6 h-6"
              onClick={() => setOpen(false)}
            />
          </div>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/login">Log In</Link>
          <Link
            to="/join"
            className="border-[#4BAF70] font-semibold border rounded-[12px] px-5 py-2 text-[#4BB070]"
          >
            Join
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
