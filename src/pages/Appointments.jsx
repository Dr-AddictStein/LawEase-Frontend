import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import { useAuthContext } from "../hooks/useAuthContext";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const Appointments = () => {
  const navigate = useNavigate();
  const { lawyer_id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user || user.user._id !== lawyer_id) {
      navigate("/");
    }
  }, [lawyer_id, navigate, user]);

  const [date, setDate] = useState(new Date());
  const [dat, setDat] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const fetchAppointments = async () => {
    const response = await fetch(
      `http://localhost:4000/api/appointment/getAppointment/${lawyer_id}`
    );
    const data = await response.json();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, [lawyer_id]);

  useEffect(() => {
    if (appointments) {
      setDat(appointments.filter((appo) => appo.date === date.toDateString()));
    }
  }, [appointments, date]);

  const tileClassName = ({ date: tileDate, view }) => {
    if (view === "month") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const checkDate = new Date(
        tileDate.getFullYear(),
        tileDate.getMonth(),
        tileDate.getDate()
      );

      // Check if there are appointments on the tileDate
      const hasAppointments = appointments.some((appo) => {
        const appoDate = new Date(appo.date);
        return (
          appoDate.getFullYear() === tileDate.getFullYear() &&
          appoDate.getMonth() === tileDate.getMonth() &&
          appoDate.getDate() === tileDate.getDate()
        );
      });

      // Past dates
      if (checkDate < today) {
        return "text-gray-400";
      }

      // Dates with appointments
      if (hasAppointments) {
        return "react-calendar__tile--booked";
      }

      // Active date (selected date)
      if (tileDate.toDateString() === date.toDateString()) {
        return "react-calendar__tile--active";
      }

      // Default
      return "text-black";
    }
    return "";
  };

  return (
    <div>
      <Header isloggedIn={true} />
      <div className="mx-auto px-5 lg:px-0 max-w-[970px]">
        <div className="grid my-5 grid-cols-2 gap-5">
          <Link
            className="w-full bg-[#4D7D5D] py-3 text-[18px] text-center text-white rounded-[12px]"
            to={`/appointments/${user.user._id}`}
          >
            Appointments
          </Link>
          <Link
            className="w-full border bg-[#F5F5F5] py-3 text-[18px] text-center rounded-[12px]"
            to={`/availablity/${user.user._id}`}
          >
            Availability
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:hidden w-full">
            <Calendar
              onChange={handleDateChange}
              value={date}
              tileClassName={tileClassName}
            />
          </div>
          <div className="lg:col-span-3 bg-[#D9D9D926] overflow-y-auto">
            <div className="border rounded-[8px] p-5 ">
              <p className="text-[18px] ">
                Appointments for {date.toDateString()}
              </p>
              {dat.map((appo) => (
                <div
                  key={appo._id}
                  className="bg-white border my-2 p-5 rounded-[12px] appointment-card"
                >
                  <div className="flex items-start pb-1 border-b justify-between w-full">
                    <div>
                      <h1 className="text-[18px] mb-2">{appo.clientname}</h1>
                    </div>
                    <div className="flex items-center text-[18px] gap-2">
                      <FaPhoneAlt className="w-4 h-4 text-[#3E7D5AAB]" />
                      {appo.phone}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="">
                      <p className="text-[#989898] mt-2 text-[14px]">{appo.slot}</p>
                      {/* <p className="text-[14px] mt-2 text-[#00000066] font-normal italic">Description</p> */}
                      <p className="mt-2 text-[14px] text-[#00000066]">
                        {appo.desc}
                      </p>
                    </div>
                    {
                      (!appo.iscompleted) ?
                        <div className="mt-2 flex mb-5 lg:mb-0 items-center justify-center">
                          <button
                            className="px-4 py-1 ml-[-15px] border border-black text-white flex items-center gap-2 rounded-[8px] bg-[#4D8360]"
                            onClick={async () => {
                              const response = await axios.patch(
                                `http://localhost:4000/api/appointment/markascompleted/${appo._id}`,
                              );
                              fetchAppointments();
                            }}
                          >
                            Mark as Completed
                          </button>
                        </div>
                        :
                        <div className="w-full bg-white gap-5 py-4 px-5 lg:px-10 text-end text-green-500">
                          Appointment Completed.!.
                        </div>
                    }

                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block w-full">
            <Calendar
              onChange={handleDateChange}
              value={date}
              tileClassName={tileClassName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
