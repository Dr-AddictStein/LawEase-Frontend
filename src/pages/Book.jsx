import React, { useState } from "react";
import Header from "../layout/Header";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
const Book = () => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#F1FFF4] min-h-screen">
      <Header isuser={true} />
      <div className="mx-auto px-5 pb-5 lg:pb-0 lg:px-0 max-w-[970px] mt-10">
        <div className="flex items-center justify-between">
          <Link to="/search-result" className="flex items-center  gap-2">
            <BsArrowLeft className=" w-4 h-4" />
            <p className="text-[14px] ">Go Back</p>
          </Link>
          <h1 className="text-[30px] font-semibold">Book Appointment</h1>
          <div></div>
        </div>
        <p className="text-center py-5">Lawyer : Guru Walia</p>
        <form className="w-full bg-white gap-5 border py-10 px-5 lg:px-20 border-[#00000080]">
          <div className="flex items-center flex-wrap gap-5 lg:gap-10">
            <div className="flex items-center lg:w-auto justify-between lg:justify-normal w-full gap-5">
              <p className="text-[20px]">
                {" "}
                Name<span className="text-red-500">*</span>{" "}
              </p>
              <input
                type="text"
                required
                className="bg-[#E9E9E9A6] px-5  border border-[#CECECE] py-2 rounded-[8px]"
                placeholder="Harry Sidhu"
              />
            </div>
            <div className="flex items-center lg:w-auto justify-between lg:justify-normal w-full gap-5">
              <p className="text-[20px]">
                {" "}
                Contact Number<span className="text-red-500">*</span>{" "}
              </p>
              <input
                type="text"
                required
                className="bg-[#E9E9E9A6] px-5  border border-[#CECECE] py-2 rounded-[8px]"
                placeholder="XXX-580-XXXX"
              />
            </div>
          </div>
          <div className="flex items-center mt-10  gap-5 lg:gap-10 flex-wrap w-full lg:w-auto justify-between lg:justify-normal">
            <div className="flex w-full lg:w-auto justify-between lg:justify-normal items-center gap-5">
              <p className="text-[20px]">
                {" "}
                Email<span className="text-red-500">*</span>{" "}
              </p>
              <input
                type="email"
                required
                className="bg-[#E9E9E9A6] px-5  border border-[#CECECE] py-2 rounded-[8px]"
                placeholder="hsidhu@gmail.com"
              />
            </div>
            <div className="flex w-full lg:w-auto justify-between lg:justify-normal items-center gap-5">
              <p className="text-[20px]">
                {" "}
                Date<span className="text-red-500">*</span>{" "}
              </p>
              <input
                type="date"
                required
                className="bg-[#E9E9E9A6] px-5  border border-[#CECECE] py-2 rounded-[8px]"
                placeholder="XXX-580-XXXX"
              />
            </div>
          </div>
          <div className="mt-10 flex items-start flex-col lg:flex-row gap-5">
            <p className="text-[20px]">
              Slots<span className="text-red-500">*</span>{" "}
            </p>
            <div className=" px-5 bg-[#F5F5F5] border border-black rounded-[8px] lg:px-10 py-5 flex items-center   gap-5  lg:gap-y-5 lg:gap-x-10 flex-wrap">
              <div
                onClick={() => setActive(1)}
                className={`border px-5 py-2 border-black rounded-[4px]  cursor-pointer ${
                  active === 1 ? "bg-[#3B7355B0] text-white" : "bg-white"
                }`}
              >
                08:00 - 09:00
              </div>
              <div
                onClick={() => setActive(2)}
                className={`border px-5 py-2 border-black rounded-[4px]  cursor-pointer ${
                  active === 2 ? "bg-[#3B7355B0] text-white" : "bg-white"
                }`}
              >
                09:00 - 10:00
              </div>
              <div
                onClick={() => setActive(3)}
                className={`border px-5 py-2 border-black rounded-[4px]  cursor-pointer ${
                  active === 3 ? "bg-[#3B7355B0] text-white" : "bg-white"
                }`}
              >
                10:00 - 11:00
              </div>
              <div
                onClick={() => setActive(4)}
                className={`border px-5 py-2 border-black rounded-[4px]  cursor-pointer ${
                  active === 4 ? "bg-[#3B7355B0] text-white" : "bg-white"
                }`}
              >
                11:00 - 12:00
              </div>
              <div
                onClick={() => setActive(5)}
                className={`border px-5 py-2 border-black rounded-[4px]  cursor-pointer ${
                  active === 5 ? "bg-[#3B7355B0] text-white" : "bg-white"
                }`}
              >
                14:00 - 15:00
              </div>
            </div>
          </div>
          <div className="w-full mt-5">
            <p className="text-[20px] mb-4"> Description</p>
          <div className="lg:pl-[65px]">
          <textarea placeholder="(optional)" name="" rows={5}   className=" bg-[#E9E9E9A6] w-full px-5  border border-[#CECECE] py-2 rounded-[8px]" id=""></textarea>
          </div>
          </div>
          <div className="flex items-center mt-5 justify-center">
          <button className="px-8 py-2 text-white flex items-center gap-2 rounded-[8px] bg-[#3B7355CC]">
          Confirm
                  </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Book;
