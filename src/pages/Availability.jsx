import React, { useState } from "react";
import Header from "../layout/Header";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import Calendar from "react-calendar";

const Availability = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <div>
        <Header isloggedIn={true} />
        <div className="mx-auto px-5 lg:px-0  max-w-[970px]">
          <div className="grid my-5 grid-cols-2 gap-5">
            <Link
              className="w-full border bg-[#F5F5F5] py-3 text-[20px] text-center  rounded-[8px]"
              to="/appointments"
            >
              Appointments
            </Link>
            <Link
              className="w-full bg-[#4D7D5D] py-3 text-[20px] text-center text-white rounded-[8px]"
              to="/availablity"
            >
              Availability
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className=" lg:col-span-3 bg-[#F9F9F9] border border-[#00000080]  rounded-[8px]  ">
              <p className="text-center text-sm mt-5">
                Add Availability for 13th June 2024, Wednesday{" "}
              </p>
              <div className="pl-5 lg:pl-20 mt-10 flex items-center gap-10">
                <h1 className="text-[20px] font-medium">Start time</h1>
                <select
                  className="px-8 py-2 border border-gray-500 rounded-[8px]"
                  name=""
                  id=""
                >
                  <option value="">00.00</option>
                  <option value="">01.00</option>
                  <option value="">02.00</option>
                  <option value="">03.00</option>
                  <option value="">04.00</option>
                  <option value="">05.00</option>
                  <option value="">06.00</option>
                  <option value="">07.00</option>
                  <option value="">08.00</option>
                  <option value="">09.00</option>
                  <option value="">10.00</option>
                  <option value="">11.00</option>
                  <option value="">12.00</option>
                  <option value="">13.00</option>
                  <option value="">14.00</option>
                  <option value="">15.00</option>
                  <option selected value="">
                    16.00
                  </option>
                  <option value="">17.00</option>
                  <option value="">18.00</option>
                  <option value="">19.00</option>
                  <option value="">20.00</option>
                  <option value="">21.00</option>
                  <option value="">22.00</option>
                  <option value="">23.00</option>
                  <option value="">24.00</option>
                </select>
              </div>
              <div className="pl-5 lg:pl-20 mt-5 flex items-center gap-10">
                <h1 className="text-[20px] mr-[7px] font-medium">End time</h1>
                <select
                  className="px-8 py-2 border border-gray-500 rounded-[8px]"
                  name=""
                  id=""
                >
                  <option value="">00.00</option>
                  <option value="">01.00</option>
                  <option value="">02.00</option>
                  <option value="">03.00</option>
                  <option value="">04.00</option>
                  <option value="">05.00</option>
                  <option value="">06.00</option>
                  <option value="">07.00</option>
                  <option value="">08.00</option>
                  <option value="">09.00</option>
                  <option value="">10.00</option>
                  <option value="">11.00</option>
                  <option value="">12.00</option>
                  <option value="">13.00</option>
                  <option value="">14.00</option>
                  <option value="">15.00</option>
                  <option value="">16.00</option>
                  <option selected value="">
                    17.00
                  </option>
                  <option value="">18.00</option>
                  <option value="">19.00</option>
                  <option value="">20.00</option>
                  <option value="">21.00</option>
                  <option value="">22.00</option>
                  <option value="">23.00</option>
                  <option value="">24.00</option>
                </select>
              </div>
              <div className="mt-10 flex mb-5 lg:mb-0 items-center justify-center">
                <button className="px-8 py-2 border border-black text-white flex items-center gap-2 rounded-[8px] bg-[#4D8360]">
                  + Add
                </button>
              </div>
            </div>
            <div className="w-full">
              <Calendar onChange={onChange} value={value} />
            </div>
          </div>
          <div className="mt-5 mb-5 lg:mb-0 border w-full border-[#00000080] rounded-[8px]">
            <div className="border-b border-[#00000080] py-3 px-5">
              <p className="text-sm">
                Current Availability for 13th June 2024, Wednesday{" "}
              </p>
            </div>
            <div className=" px-5 lg:px-20 py-10 flex items-center   gap-5  lg:gap-y-8 lg:gap-x-20 flex-wrap">
              <div className=" border px-5 py-2 border-black rounded-[4px] bg-[#D9D9D97A]">08:00 - 09:00</div>
              <div className=" border px-5 py-2 border-black rounded-[4px] bg-[#D9D9D97A]">09:00 - 10:00</div>
              <div className=" border px-5 py-2 border-black rounded-[4px] bg-[#D9D9D97A]">10:00 - 11:00</div>
              <div className=" border px-5 py-2 border-black rounded-[4px] bg-[#D9D9D97A]">11:00 - 12:00</div>
              <div className=" border px-5 py-2 border-black rounded-[4px] bg-[#D9D9D97A]">14:00 - 15:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;
