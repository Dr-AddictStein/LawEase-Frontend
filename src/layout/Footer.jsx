import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi"; // Importing icons

const Footer = () => {
  return (
    <div className="w-full bg-white border-t pt-8 pb-16 border-l border-r border-black">
      <div className="w-[80%] mx-auto flex items-center justify-between">
        <div>
          <div className="flex ml-8 items-center gap-3 mt-5">
            <FiMail className="w-5 h-5 text-[#4D8360]" />
            <p className="text-[18px]">lawease24@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex mt-5 mr-8 items-center gap-3">
            <FiPhone className="w-5 h-5 text-[#4D8360]" />
            <p className="text-[18px]">+1 306-580-2724</p>
          </div>

          {/* <a
            href="http://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
          <a
            href="http://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="http://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-6 h-6" />
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
