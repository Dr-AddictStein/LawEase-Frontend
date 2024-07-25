import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enUS from "date-fns/locale/en-US";
import Stepper from "../layout/Stepper"; // import the Stepper component

registerLocale("en-US", enUS);

const Book = () => {
  const navigate = useNavigate();
  const { lawyer_id } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const [lawyer, setLawyer] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState("");
  const [desc, setDesc] = useState("");
  const [otp, setOtp] = useState(""); // new state for OTP
  const [otpError,setOtpError]=useState(false);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const steps = ["Fill Form", "Enter OTP", "Success"]; // steps for the stepper

  const fetchLawyer = async () => {
    const response = await fetch(
      `http://localhost:4000/api/lawyer/getLawyer/${lawyer_id}`
    );
    const data = await response.json();
    setLawyer(data);
  };

  useEffect(() => {
    fetchLawyer();
  }, []);

  useEffect(() => {
    if (lawyer && date) {
      const formattedDate = formatDateToReadableString(date);
      const stash = lawyer?.availability?.filter(
        (ld) => ld.date === formattedDate
      )[0];
      if (stash) {
        setSlots(stash.times);
      } else {
        setSlots([]);
      }
    }
  }, [lawyer, date]);

  const formatDateToReadableString = (dateObject) => {
    const utcDayOfWeek = dateObject.toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    });
    const utcMonth = dateObject.toLocaleDateString("en-US", {
      month: "short",
      timeZone: "UTC",
    });
    const day = dateObject.getUTCDate();
    const year = dateObject.getUTCFullYear();

    return `${utcDayOfWeek} ${utcMonth} ${day} ${year}`;
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setSlot(slot);
  };

  const [actualOTP,setActualOTP]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = formatDateToReadableString(date);

    const toSend = {
      name: name,
      phone: phone,
      email: email,
      date: formattedDate,
      slot: slot,
      desc: desc,
    };

    if (activeStep === 0) {
      setActiveStep(1);
      const response = await axios.post(
        `http://localhost:4000/api/appointment/sendotp`,
        toSend
      );
      setActualOTP(response.data);
      return;
    }

    if (activeStep === 1) {
      if(actualOTP===otp){
        try {
          const response = await axios.post(
            `http://localhost:4000/api/appointment/createAppointment/${lawyer_id}`,
            toSend
          );
          console.log("Form submitted successfully!", response.data);
          setSuccessMessage(true);
          setTimeout(() => navigate("/"), 5000);
        } catch (error) {
          if (error.response.status === 409) {
            alert("Data already exists");
          } else {
            console.log(error);
          }
        }
      }
      else{
        setOtp("");
        setOtpError(true);
        return;
      }
      setActiveStep(2);
      setSuccessMessage(true);
      return;
    }



  };

  const highlightDates = () => {
    if (!lawyer || !lawyer.availability) return [];
    return lawyer.availability.map((entry) => new Date(entry.date));
  };

  return (
    <div className="bg-[#F1FFF4] min-h-screen">
      <Header isuser={true} />
      <div className="mx-auto px-5 pb-5 lg:pb-0 lg:px-0 max-w-[970px] mt-10">
        <div className="flex items-center justify-between">
          <Link to="/find-lawyer" className="flex items-center gap-2">
            <BsArrowLeft className="w-6 h-6" />
            <p className="text-[18px]">Go Back</p>
          </Link>
          <h1 className="text-[30px] font-semibold ml-[-80px] mb-6">
            Book Appointment
          </h1>
          <div></div>
        </div>
        <Stepper steps={steps} activeStep={activeStep} /> {/* Add the Stepper */}
        {activeStep === 0 && (
          <form
            className="w-full bg-white gap-5 border py-10 px-5 lg:px-20 border-[#00000080]"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center flex-wrap gap-5 lg:gap-10">
              <div className="flex items-center lg:w-auto justify-between lg:justify-normal w-full gap-5">
                <p className="text-[20px]">
                  Name<span className="text-red-500">*</span>
                </p>
                <input
                  type="text"
                  required
                  className="bg-[#E9E9E9A6] px-5 border border-[#CECECE] py-2 rounded-[8px]"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center lg:w-auto justify-between lg:justify-normal w-full gap-5">
                <p className="text-[20px]">
                  Contact Number<span className="text-red-500">*</span>
                </p>
                <input
                  type="text"
                  required
                  className="bg-[#E9E9E9A6] px-5 border border-[#CECECE] py-2 rounded-[8px]"
                  placeholder="eg: 306XXX1234"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center mt-10 gap-5 lg:gap-10 flex-wrap w-full lg:w-auto justify-between lg:justify-normal">
              <div className="flex w-full lg:w-auto justify-between lg:justify-normal items-center gap-5">
                <p className="text-[20px]">
                  Email<span className="text-red-500">*</span>
                </p>
                <input
                  type="email"
                  required
                  className="bg-[#E9E9E9A6] px-5 border border-[#CECECE] py-2 rounded-[8px] ml-[3px]"
                  placeholder="eg: johndoe@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex w-full lg:w-auto justify-between lg:justify-normal items-center gap-5 ml-[102px]">
                <p className="text-[20px]">
                  Date<span className="text-red-500">*</span>
                </p>
                <DatePicker
                  type={date}
                  selected={date}
                  onChange={handleDateChange}
                  highlightDates={highlightDates()}
                  dateFormat="yyyy-MM-dd"
                  className="bg-[#E9E9E9A6] px-5 border border-[#CECECE] py-2 rounded-[8px] cursor-pointer"
                  placeholderText="Select a date"
                  locale="en-US"
                />
              </div>
            </div>
            <div className="mt-10 flex items-start flex-col lg:flex-row gap-5">
              <p className="text-[20px]">
                Slots<span className="text-red-500">*</span>
              </p>
              <div className="px-5 ml-[10px] bg-[#F5F5F5] border border-black rounded-[8px] lg:px-10 py-5 flex items-center gap-5 lg:gap-y-5 lg:gap-x-10 flex-wrap">
                {slots.map((sl, index) => {
                  const isSelected = selectedSlot === sl.range;
                  return (
                    <div
                      key={index}
                      onClick={() => handleSlotClick(sl.range)}
                      className={`border px-5 py-2 border-black rounded-[4px] cursor-pointer ${
                        isSelected ? "bg-[#4D7D5D] text-white" : "text-black"
                      }`}
                    >
                      {sl.range}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full mt-5">
              <p className="text-[20px] mb-4"> Description</p>
              <div className="lg:pl-[65px]">
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="(optional)"
                  rows={5}
                  className="bg-[#E9E9E9A6] w-full px-5 ml-[10px] border border-[#CECECE] py-2 rounded-[8px]"
                ></textarea>
              </div>
            </div>
            <div className="flex items-center mt-5 justify-center">
              <button
                type="submit"
                className="px-8 py-2 text-white flex items-center gap-2 rounded-[8px] bg-[#4D7D5D]"
              >
                Next
              </button>
            </div>
          </form>
        )}
        {activeStep === 1 && (
          <div className="w-full bg-white gap-5 border py-10 px-5 lg:px-20 border-[#00000080]">
          {
            otpError && 
            <p className="text-[20px] mb-4 text-red-700 text-center">OTP is not correct.!.!.!.</p>
          }
            <p className="text-[20px] mb-4">Enter OTP</p>
            <input
              type="text"
              required
              className="bg-[#E9E9E9A6] w-full px-5 border border-[#CECECE] py-2 rounded-[8px]"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="flex items-center mt-5 justify-center">
              <button
                type="button"
                className="px-8 py-2 text-white flex items-center gap-2 rounded-[8px] bg-[#4D7D5D]"
                onClick={handleSubmit}
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}
        {activeStep === 2 && successMessage && (
          <div className="w-full bg-white gap-5 border py-10 px-5 lg:px-20 border-[#00000080] text-center text-green-500">
            Booking Confirmed!
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;
