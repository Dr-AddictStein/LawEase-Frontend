import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Link, useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { BsArrowLeft, BsX } from "react-icons/bs";

const Availability = () => {
  const navigate = useNavigate();
  const { lawyer_id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user || user.user._id !== lawyer_id) {
      navigate('/');
    }
  }, [lawyer_id, navigate, user]);

  const [lawyer, setLawyer] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [currAv, setCurrAv] = useState(null);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [lastAdded, setLastAdded] = useState("");
  const [date, setDate] = useState(new Date());

  const fetchLawyer = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/lawyer/getLawyer/${lawyer_id}`);
      setLawyer(response.data);
    } catch (error) {
      console.error("Error fetching lawyer:", error);
    }
  };

  useEffect(() => {
    fetchLawyer();
  }, []);

  useEffect(() => {
    if (lawyer) {
      setAvailability(lawyer.availability);
    }
  }, [lawyer]);

  useEffect(() => {
    if (availability.length) {
      const currentDateStr = date.toDateString();
      const currentAvailability = availability.find((av) => av.date === currentDateStr);
      if (currentAvailability) {
        setCurrAv(currentAvailability);
        const lastSlotEndTime = currentAvailability.times.length
          ? currentAvailability.times[currentAvailability.times.length - 1].range.split('-')[1]
          : "00:00";
        setStartTime(lastSlotEndTime);
        updateEndTimeOptions(lastSlotEndTime);
      } else {
        setCurrAv({ date: currentDateStr, times: [] });
        setStartTime("00:00");
        setEndTime("00:00");
      }
    }
  }, [availability, date]);

  const handleDateChange = (date) => {
    setDate(date);
    const selectedAvailability = availability.find((av) => av.date === date.toDateString());
    if (selectedAvailability) {
      setCurrAv(selectedAvailability);
      const lastSlotEndTime = selectedAvailability.times.length
        ? selectedAvailability.times[selectedAvailability.times.length - 1].range.split('-')[1]
        : "00:00";
      setStartTime(lastSlotEndTime);
      updateEndTimeOptions(lastSlotEndTime);
    } else {
      setCurrAv({ date: date.toDateString(), times: [] });
      setStartTime("00:00");
      setEndTime("00:00");
    }
  };

  const handleStartTimeChange = (e) => {
    const selectedStartTime = e.target.value;
    setStartTime(selectedStartTime);
    updateEndTimeOptions(selectedStartTime);
  };

  const updateEndTimeOptions = (startTime) => {
    const filteredEndTimeOptions = [...Array(24).keys()]
      .filter(hour => `${hour.toString().padStart(2, '0')}:00` > startTime)
      .map(hour => `${hour.toString().padStart(2, '0')}:00`);
    if (filteredEndTimeOptions.length > 0) {
      setEndTime(filteredEndTimeOptions[0]);
    } else {
      setEndTime(startTime);
    }
  };

  const handleAddRange = async (e) => {
    e.preventDefault();
    const newRange = `${startTime}-${endTime}`;

    if (currAv.times.some(time => time.range === newRange)) {
      return;
    }

    const updatedCurrAv = { ...currAv, times: [...currAv.times, { range: newRange }] };
    setCurrAv(updatedCurrAv);
    setLastAdded(updatedCurrAv.date);

    const updatedAvailability = availability.map(av =>
      av.date === updatedCurrAv.date ? updatedCurrAv : av
    );

    if (!availability.some(av => av.date === updatedCurrAv.date)) {
      updatedAvailability.push(updatedCurrAv);
    }

    setAvailability(updatedAvailability);

    const updatedLawyer = { ...lawyer, availability: updatedAvailability };

    try {
      const response = await axios.patch(
        `http://localhost:4000/api/lawyer/updateLawyer/${lawyer_id}`,
        updatedLawyer
      );
      console.log("Form submitted successfully!", response.data);
      fetchLawyer();

      const lastSlotEndTime = updatedCurrAv.times.length
        ? updatedCurrAv.times[updatedCurrAv.times.length - 1].range.split('-')[1]
        : "00:00";
      setStartTime(lastSlotEndTime);
      updateEndTimeOptions(lastSlotEndTime);
    } catch (error) {
      if (error.response?.status === 409) {
        alert("Data already exists");
      } else {
        console.log(error);
      }
    }
  };

  const handleDeleteRange = async (range) => {
    const filteredTimes = currAv.times.filter(time => time.range !== range);
    const updatedCurrAv = { ...currAv, times: filteredTimes };
    setCurrAv(updatedCurrAv);

    const updatedAvailability = availability.map(av =>
      av.date === updatedCurrAv.date ? updatedCurrAv : av
    );
    setAvailability(updatedAvailability);

    const updatedLawyer = { ...lawyer, availability: updatedAvailability };

    try {
      const response = await axios.patch(
        `http://localhost:4000/api/lawyer/updateLawyer/${lawyer_id}`,
        updatedLawyer
      );
      console.log("Range deleted successfully!", response.data);
      fetchLawyer();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header isLoggedIn={true} />
      <div className="mx-auto px-5 lg:px-0 max-w-[970px]">
        <div className="grid my-5 grid-cols-2 gap-5">
          <Link
            className="w-full border bg-[#F5F5F5] py-3 text-[20px] text-center rounded-[8px]"
            to={`/appointments/${user.user._id}`}
          >
            Appointments
          </Link>
          <Link
            className="w-full bg-[#4D7D5D] py-3 text-[20px] text-center text-white rounded-[8px]"
            to={`/availability/${user.user._id}`}
          >
            Availability
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 bg-[#F9F9F9] border border-[#00000080] rounded-[8px]">
            <p className="text-center text-sm mt-5">
              Add Availability {currAv ? `for ${currAv.date}` : "..."}
            </p>
            <div className="pl-5 lg:pl-20 mt-10 flex items-center gap-10">
              <h1 className="text-[20px] font-medium">Start time</h1>
              <select
                className="px-8 py-2 border border-gray-500 rounded-[8px]"
                value={startTime}
                onChange={handleStartTimeChange}
              >
                {[...Array(24).keys()].map(hour => {
                  const hourStr = `${hour.toString().padStart(2, '0')}:00`;
                  return <option key={hourStr} value={hourStr}>{hourStr}</option>;
                })}
              </select>
            </div>
            <div className="pl-5 lg:pl-20 mt-5 flex items-center gap-10">
              <h1 className="text-[20px] font-medium">End time</h1>
              <select
                className="px-8 py-2 border border-gray-500 rounded-[8px]"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                {[...Array(24).keys()].map(hour => {
                  const hourStr = `${hour.toString().padStart(2, '0')}:00`;
                  if (`${hourStr}` > startTime) {
                    return <option key={hourStr} value={hourStr}>{hourStr}</option>;
                  }
                  return null;
                })}
              </select>
            </div>
            <div className="mt-10 flex mb-5 lg:mb-0 items-center justify-center">
              <button
                className="px-8 py-2 border border-black text-white flex items-center gap-2 rounded-[8px] bg-[#4D8360]"
                onClick={handleAddRange}
              >
                + Add
              </button>
            </div>
          </div>
          <div className="w-full">
            <Calendar onChange={handleDateChange} value={date} minDate={new Date()} />
          </div>
        </div>
        {currAv && currAv.times && (
          <div className="mt-5 mb-5 lg:mb-0 border w-full border-[#00000080] rounded-[8px]">
            <div className="border-b border-[#00000080] py-3 px-5">
            <p className="text-sm">
                Current Availability for {currAv.date}
              </p>
            </div>
            <div className="px-5 lg:px-20 py-10 flex items-center gap-5 lg:gap-y-8 lg:gap-x-20 flex-wrap">
              {currAv.times.map((item, index) => (
                <div key={index} className="border px-5 py-2 border-black rounded-[4px] bg-[#D9D9D97A]">
                  <div className="flex gap-2 justify-between items-center">
                    <p>{item.range}</p>
                    <button
                      className="text-white cursor-pointer flex items-center"
                      onClick={() => handleDeleteRange(item.range)}
                    >
                      <BsX className="bg-red-600 rounded-full" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Availability;