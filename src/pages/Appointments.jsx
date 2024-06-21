import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import { useAuthContext } from "../hooks/useAuthContext";
import 'react-calendar/dist/Calendar.css';

const Appointments = () => {
  const navigate = useNavigate();
  const { lawyer_id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user || user.user._id !== lawyer_id) {
      navigate('/');
    }
  }, [lawyer_id, navigate, user]);

  const [date, setDate] = useState(new Date());
  const [dat, setDat] = useState([]);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const response = await fetch(`http://localhost:4000/api/appointment/getAppointment/${lawyer_id}`);
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
    if (view === 'month') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const checkDate = new Date(tileDate.getFullYear(), tileDate.getMonth(), tileDate.getDate());
  
      // Check if there are appointments on the tileDate
      const hasAppointments = appointments.some((appo) => {
        const appoDate = new Date(appo.date);
        return (
          appoDate.getFullYear() === tileDate.getFullYear() &&
          appoDate.getMonth() === tileDate.getMonth() &&
          appoDate.getDate() === tileDate.getDate()
        );
      });
  
      if (checkDate < today) {
        return 'text-gray-400'; // Past dates
      } else if (hasAppointments) {
        return 'react-calendar__tile--booked'; // Dates with appointments
      } else if (tileDate.toDateString() === date.toDateString()) {
        return 'react-calendar__tile--active'; // Active date
      } else {
        return 'text-black'; // Default
      }
    }
    return '';
  };
  

  return (
    <div>
      <Header isloggedIn={true} />
      <div className="mx-auto px-5 lg:px-0 max-w-[970px]">
        <div className="grid my-5 grid-cols-2 gap-5">
          <Link
            className="w-full bg-[#4D7D5D] py-3 text-[20px] text-center text-white rounded-[8px]"
            to={`/appointments/${user.user._id}`}
          >
            Appointments
          </Link>
          <Link
            className="w-full border bg-[#F5F5F5] py-3 text-[20px] text-center rounded-[8px]"
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
            <div className="border rounded-[8px] p-5">
              <p className="text-[14px]">
                Appointment for {date.toDateString()}
              </p>
              {dat.map((appo) => (
                <div key={appo._id} className="bg-white border my-2 p-5 rounded-[8px]">
                  <div className="flex items-start pb-1 border-b justify-between w-full">
                    <div>
                      <h1 className="text-[20px]">{appo.clientname}</h1>
                      <p className="text-[#989898] text-[12px]">{appo.slot}</p>
                    </div>
                    <div className="flex items-center text-[14px] gap-2">
                      <FaPhoneAlt className="w-4 h-4 text-[#3E7D5AAB]" />
                      {appo.phone}
                    </div>
                  </div>
                  <p className="text-[14px] mt-2">Description</p>
                  <p className="mt-2 text-[12px] text-[#00000066]">{appo.desc}</p>
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
