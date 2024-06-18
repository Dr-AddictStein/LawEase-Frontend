import React,{useState} from "react";
import Header from "../layout/Header";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import Calendar from 'react-calendar';

const Appointments = () => {
    const [value, onChange] = useState(new Date());
  return (
    <div>
      <Header isloggedIn={true} />
      <div className="mx-auto px-5 lg:px-0  max-w-[970px]">
        <div className="grid my-5 grid-cols-2 gap-5">
          <Link
            className="w-full bg-[#4D7D5D] py-3 text-[20px] text-center text-white rounded-[8px]"
            to="/appointments"
          >
            Appointments
          </Link>
          <Link
            className="w-full border bg-[#F5F5F5] py-3 text-[20px] text-center  rounded-[8px]"
            to="/availablity"
          >
            Availability
          </Link>
        </div>
        <div className="grid grid-cols-1  lg:grid-cols-5 gap-5">
        <div className=" lg:hidden w-full">
          <Calendar onChange={onChange} value={value} />
          </div>
          <div className=" lg:col-span-3 bg-[#D9D9D926]   overflow-y-auto">
            <div className="border rounded-[8px] p-5">
              <p className="text-[14px]">
                Appointment for 13th June 2024, Wednesday{" "}
              </p>
              <div className=" bg-white border my-2 p-5 rounded-[8px]">
                <div className="flex items-start pb-1 border-b justify-between w-full">
                  <div>
                    <h1 className="text-[20px]">Harry Sidhu</h1>
                    <p className="text-[#989898] text-[12px]">09:00 - 10:00</p>
                  </div>
                  <div className="flex items-center text-[14px] gap-2">
                    <FaPhoneAlt className="w-4 h-4 text-[#3E7D5AAB]"/>
                  +1 (XXX)-580-XXXX
                  </div>
                </div>
                <p className="text-[14px] mt-2">Description</p>
                <p className="mt-2 text-[12px] text-[#00000066]">Legal aid required for car crash.</p>
              </div>
              <div className=" bg-white border my-2 p-5 rounded-[8px]">
                <div className="flex items-start pb-1 border-b justify-between w-full">
                  <div>
                    <h1 className="text-[20px]">Harry Sidhu</h1>
                    <p className="text-[#989898] text-[12px]">09:00 - 10:00</p>
                  </div>
                  <div className="flex items-center text-[14px] gap-2">
                    <FaPhoneAlt className="w-4 h-4 text-[#3E7D5AAB]"/>
                  +1 (XXX)-580-XXXX
                  </div>
                </div>
                <p className="text-[14px] mt-2">Description</p>
                <p className="mt-2 text-[12px] text-[#00000066]">Legal aid required for car crash.</p>
              </div>
              <div className=" bg-white border my-2 p-5 rounded-[8px]">
                <div className="flex items-start pb-1 border-b justify-between w-full">
                  <div>
                    <h1 className="text-[20px]">Harry Sidhu</h1>
                    <p className="text-[#989898] text-[12px]">09:00 - 10:00</p>
                  </div>
                  <div className="flex items-center text-[14px] gap-2">
                    <FaPhoneAlt className="w-4 h-4 text-[#3E7D5AAB]"/>
                  +1 (XXX)-580-XXXX
                  </div>
                </div>
                <p className="text-[14px] mt-2">Description</p>
                <p className="mt-2 text-[12px] text-[#00000066]">Legal aid required for car crash.</p>
              </div>
              <div className=" bg-white border my-2 p-5 rounded-[8px]">
                <div className="flex items-start pb-1 border-b justify-between w-full">
                  <div>
                    <h1 className="text-[20px]">Harry Sidhu</h1>
                    <p className="text-[#989898] text-[12px]">09:00 - 10:00</p>
                  </div>
                  <div className="flex items-center text-[14px] gap-2">
                    <FaPhoneAlt className="w-4 h-4 text-[#3E7D5AAB]"/>
                  +1 (XXX)-580-XXXX
                  </div>
                </div>
                <p className="text-[14px] mt-2">Description</p>
                <p className="mt-2 text-[12px] text-[#00000066]">Legal aid required for car crash.</p>
              </div>
              <div className=" bg-white border my-2 p-5 rounded-[8px]">
                <div className="flex items-start pb-1 border-b justify-between w-full">
                  <div>
                    <h1 className="text-[20px]">Harry Sidhu</h1>
                    <p className="text-[#989898] text-[12px]">09:00 - 10:00</p>
                  </div>
                  <div className="flex items-center text-[14px] gap-2">
                    <FaPhoneAlt className="w-4 h-4 text-[#3E7D5AAB]"/>
                  +1 (XXX)-580-XXXX
                  </div>
                </div>
                <p className="text-[14px] mt-2">Description</p>
                <p className="mt-2 text-[12px] text-[#00000066]">Legal aid required for car crash.</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-full">
          <Calendar onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
