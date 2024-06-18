import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-ful bg-white border-t pt-8 pb-16 border-l border-r border-black ">
      <div className=" w-[80%] mx-auto  flex  items-center justify-between">
        <div>
          <p className="text-[20px]">info@lawease.com</p>
          <p className="text-[20px]">+1XXX590XXXX</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="http://" target="_blank" rel="noopener noreferrer"><FaFacebook  className="w-6 h-6"/></a>
          <a href="http://" target="_blank" rel="noopener noreferrer"><FaLinkedin  className="w-6 h-6"/></a>
          <a href="http://" target="_blank" rel="noopener noreferrer"><FaInstagram  className="w-6 h-6"/></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
