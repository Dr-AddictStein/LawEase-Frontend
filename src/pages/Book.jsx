import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
const Book = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const { lawyer_id } = useParams();

  const [lawyer, setLawyer] = useState(null);

  const fetchLawyer = async () => {
    const response = await fetch(`http://localhost:4000/api/lawyer/getLawyer/${lawyer_id}`);
    const data = await response.json();

    setLawyer(data);
  }
  useEffect(() => {
    fetchLawyer();
  }, [])

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [desc, setDesc] = useState("");
  const [slots, setSlots] = useState([]);


  const [inputDate, setInputDate] = useState(''); // For the input value in "yyyy-MM-dd" format
  const [formattedDate, setFormattedDate] = useState(''); // For the formatted date
  useEffect(() => {
    if (lawyer && formattedDate) {
      const stash = lawyer?.availability?.filter((ld) => {
        return ld.date === formattedDate
      })
      setSlots(stash);
    }
  }, lawyer)

  const handleDateChange = (e) => {
    const inputDate = e.target.value; // The input value in "yyyy-MM-dd" format
    setInputDate(inputDate); // Update the inputDate state

    // Convert the inputDate to a Date object and then format it
    const dateObject = new Date(inputDate);
    const formattedDateString = dateObject.toDateString(); // Convert to desired format
    setFormattedDate(formattedDateString); // Update the formattedDate state
  };

  useEffect(() => {
    if (lawyer && formattedDate) {
      const stash = lawyer?.availability?.filter((ld) => {
        return ld.date === formattedDate
      })[0].times;
      setSlots(stash);
    }
  }, [formattedDate])

  useEffect(() => {
    console.log("NIBIR", slots)

  }, [slot])


  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setSlot(slot);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const toSend = {
      name:name,
      phone:phone,
      email:email,
      date:formattedDate,
      slot:slot,
      desc:desc
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/appointment/createAppointment/${lawyer_id}`,
        toSend
      );
      console.log("Form submitted successfully!", response.data);
      navigate('/')
    } catch (error) {
      if (error.response.status === 409) {
        alert("Данные уже существуют");
      } else {
        console.log(error);
      }
    }

    
  }




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
        <p className="text-center py-5">Lawyer : {lawyer?.firstname + ' ' + lawyer?.lastname}</p>
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
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
                className="bg-[#E9E9E9A6] px-5 border border-[#CECECE] py-2 rounded-[8px]"
                value={inputDate}
                onChange={handleDateChange}
              />
            </div>
          </div>
          <div className="mt-10 flex items-start flex-col lg:flex-row gap-5">
            <p className="text-[20px]">
              Slots<span className="text-red-500">*</span>{" "}
            </p>
            <div className="px-5 bg-[#F5F5F5] border border-black rounded-[8px] lg:px-10 py-5 flex items-center gap-5 lg:gap-y-5 lg:gap-x-10 flex-wrap">
              {slots.map((sl, index) => {
                const isSelected = selectedSlot === sl.range;
                return (
                  <div
                    key={index}
                    onClick={() => handleSlotClick(sl.range)}
                    className={`border px-5 py-2 border-black rounded-[4px] cursor-pointer ${isSelected ? 'bg-green-500 text-white' : 'text-black'
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
              <textarea value={desc} onChange={(e)=>{
                setDesc(e.target.value)
              }} placeholder="(optional)" name="" rows={5} className=" bg-[#E9E9E9A6] w-full px-5  border border-[#CECECE] py-2 rounded-[8px]" id=""></textarea>
            </div>
          </div>
          <div className="flex items-center mt-5 justify-center">
            <button className="px-8 py-2 text-white flex items-center gap-2 rounded-[8px] bg-[#3B7355CC]" onClick={handleSubmit}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Book;
