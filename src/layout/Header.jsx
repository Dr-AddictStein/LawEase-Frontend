import React,{useState} from "react";
import { Link } from "react-router-dom";
import { LuHome } from "react-icons/lu";
import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";

const Header = ({ isloggedIn, isuser }) => {
  const [open, setOpen] = useState(false)
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
              className="font-semibold  rounded-[12px] px-3  flex items-center gap-1 "
            >
           <span className="pt-1"> Home</span>
            </Link>
            <Link
              to="/profile"
              className="font-semibold  rounded-[12px] px-3  flex items-center gap-1 "
            >
             <span className="pt-1"> Profile</span>
            </Link>
            <Link
              to="/"
              className="font-semibold  rounded-[12px] px-3  flex items-center gap-1 "
            >
              <span className="pt-1"> Logout</span>
            </Link>
          </div>
        ) : (
        <>
    {isuser ?      <div className=" hidden lg:flex ">
            <Link to="/" className="flex items-center gap-2 text-[18px] text-[#4D8360]"><LuHome className="w-5 h-5"/> Home</Link>
         
          </div> :       <div className=" hidden lg:flex items-center gap-5">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Log In</Link>
            <Link
              to="/join"
              className="border-[#4BAF70] font-semibold border rounded-[12px] px-5 py-2 text-[#4BB070]"
            >
              Join
            </Link>
          </div>}
          <FaBars onClick={()=>setOpen(true)} className=" w-6 h-6 cursor-pointer lg:hidden"/>
        </>
        )}
      </div>
    {open &&  <div className=" absolute top-0 left-0 flex flex-col items-center justify-center gap-3 w-full bg-white h-full min-h-screen z-[70]">
      <div className=" absolute top-5 right-5 z-[90]">
      <AiOutlineClose className="w-6 h-6" onClick={()=>setOpen(false)} />

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
      </div>}
    </div>
  );
};

export default Header;
