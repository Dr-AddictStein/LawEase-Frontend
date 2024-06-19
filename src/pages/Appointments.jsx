import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import Calendar from 'react-calendar';
import { useAuthContext } from "../hooks/useAuthContext";

const Appointments = () => {
  const navigate = useNavigate();
  const { lawyer_id } = useParams();
  const { user } = useAuthContext();



  useEffect(() => {
    if (!user || user.user._id !== lawyer_id) {
      navigate('/')
    }
  }, [lawyer_id])

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
  }
  useEffect(() => {
    fetchAppointments();
    if (appointments) {
      setDat(appointments.filter((appo) => {
        return (appo.date === date.toDateString());
      }))

    }
  }, [lawyer_id])




  useEffect(() => {
    if (appointments) {
      setDat(appointments.filter((appo) => {
        return (appo.date === date.toDateString());
      }))

    }
  }, [date])

  useEffect(()=>{
    console.log("APAPAPAPAPAP",dat);
  },[dat])



  return (
    <div>
      <Header isloggedIn={true} />
      <div className="mx-auto px-5 lg:px-0  max-w-[970px]">
        <div className="grid my-5 grid-cols-2 gap-5">
          <Link
            className="w-full bg-[#4D7D5D] py-3 text-[20px] text-center text-white rounded-[8px]"
            to={`/appointments/${user.user._id}`}
          >
            Appointments
          </Link>
          <Link
            className="w-full border bg-[#F5F5F5] py-3 text-[20px] text-center  rounded-[8px]"
            to={`/availablity/${user.user._id}`}
          >
            Availability
          </Link>
        </div>
        <div className="grid grid-cols-1  lg:grid-cols-5 gap-5">
          <div className=" lg:hidden w-full">
            <Calendar onChange={handleDateChange} value={date} />
          </div>
          <div className=" lg:col-span-3 bg-[#D9D9D926]   overflow-y-auto">
            <div className="border rounded-[8px] p-5">
              <p className="text-[14px]">
                Appointment for {date.toDateString()}
              </p>
              {
                dat.map((appo) => {
                  return (
                    <div className=" bg-white border my-2 p-5 rounded-[8px]">
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
                    </div>)
                })

              }
              
            </div>
          </div>
          <div className="hidden lg:block w-full">
            <Calendar onChange={handleDateChange} value={date} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
