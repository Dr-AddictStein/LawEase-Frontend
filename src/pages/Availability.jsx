import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const Availability = () => {
  const navigate = useNavigate();
  const { lawyer_id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user || user.user._id !== lawyer_id) {
      navigate('/')
    }
  }, [lawyer_id]);

  const [lawyer, setLawyer] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [currAv, setCurrAv] = useState(null);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [lastAdded, setLastAdded] = useState("");

  const fetchLawyer = async () => {
    const response = await fetch(`http://localhost:4000/api/lawyer/getLawyer/${lawyer_id}`);
    const data = await response.json();

    setLawyer(data);
  };

  useEffect(() => {
    fetchLawyer();
  }, []);

  useEffect(() => {
    if (lawyer) {
      setAvailability(lawyer.availability);
    }
  }, [lawyer]);

  useEffect(()=>{
    if(lastAdded && availability){
      setCurrAv(availability.filter((av)=>{
        return av.date===lastAdded
      })[0]);
      setDate(availability?.filter((av)=>{
        return av?.date===lastAdded
      })[0]?.date);
    }
    else if(availability){
      setCurrAv(availability[0]);
      setDate(availability[0]?.date);
    }
  },[availability])

  const [date, setDate] = useState(new Date());

  const [times, setTimes] = useState([]);

  const handleDateChange = (date) => {
    setDate(date);
    for (let i = 0; i < availability.length; i++) {
      if (availability[i].date === date.toDateString()) {
        setCurrAv(availability[i]);
        return;
      }
    }
    setCurrAv(
      {
        date: date.toDateString(),
        times: []
      }
    );
  };

  const handleAddRange = async (e) => {
    e.preventDefault();

    let dex = currAv;
    dex.times.push({
      range: startTime + "-" + endTime
    });

    setCurrAv(dex);
    setLastAdded(dex.date);
    let tensor = availability;
    let found = false;
    for (let i = 0; i < tensor.length; i++) {
      if (tensor[i].date === currAv.date) {
        tensor[i].times = currAv.times;
        found = true;
        break;
      }
    }

    if (!found) {
      tensor.push(currAv);
    }
    setAvailability(tensor);

    const toSend = {
      ...lawyer,
      availability: availability
    };

    try {
      const response = await axios.patch(
        `http://localhost:4000/api/lawyer/updateLawyer/${lawyer_id}`,
        toSend
      );
      console.log("Form submitted successfully!", response.data);
      fetchLawyer();
    } catch (error) {
      if (error.response.status === 409) {
        alert("Данные уже существуют");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div>
        <Header isloggedIn={true} />
        <div className="mx-auto px-5 lg:px-0  max-w-[970px]">
          <div className="grid my-5 grid-cols-2 gap-5">
            <Link
              className="w-full border bg-[#F5F5F5] py-3 text-[20px] text-center  rounded-[8px]"
              to={`/appointments/${user.user._id}`}
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
                Add Availability {(currAv) ? "for " + currAv.date : "..."}
              </p>
              <div className="pl-5 lg:pl-20 mt-10 flex items-center gap-10">
                <h1 className="text-[20px] font-medium">Start time</h1>
                <select
                  className="px-8 py-2 border border-gray-500 rounded-[8px]"
                  name=""
                  id=""
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                >
                  <option value="00:00">00:00</option>
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                  <option value="04:00">04:00</option>
                  <option value="05:00">05:00</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                  <option value="24:00">24:00</option>
                </select>
              </div>
              <div className="pl-5 lg:pl-20 mt-5 flex items-center gap-10">
                <h1 className="text-[20px] mr-[7px] font-medium">End time</h1>
                <select
                  className="px-8 py-2 border border-gray-500 rounded-[8px]"
                  name=""
                  id=""
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                >
                  <option value="00:00">00:00</option>
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                  <option value="04:00">04:00</option>
                  <option value="05:00">05:00</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                  <option value="24:00">24:00</option>
                </select>
              </div>
              <div className="mt-10 flex mb-5 lg:mb-0 items-center justify-center">
                <button className="px-8 py-2 border border-black text-white flex items-center gap-2 rounded-[8px] bg-[#4D8360]" onClick={handleAddRange}>
                  + Add
                </button>
              </div>
            </div>
            <div className="w-full">
              <Calendar onChange={handleDateChange} value={date} />
            </div>
          </div>
          {(currAv && currAv.times) && <div className="mt-5 mb-5 lg:mb-0 border w-full border-[#00000080] rounded-[8px]">
            <div className="border-b border-[#00000080] py-3 px-5">
              <p className="text-sm">
                Current Availability {(currAv) ? "for " + currAv.date : "..."}
              </p>
            </div>
            <div className=" px-5 lg:px-20 py-10 flex items-center   gap-5  lg:gap-y-8 lg:gap-x-20 flex-wrap">
              {
                currAv.times.map((item, index) => {
                  return (
                    <div key={index} className="border px-5 py-2 border-black rounded-[4px] bg-[#D9D9D97A]">{item.range}</div>
                  )
                })
              }
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Availability;
