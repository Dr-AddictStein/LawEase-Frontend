import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const { lawyer_id } = useParams();
  const { user } = useAuthContext();



  useEffect(() => {
    if (!user || user.user._id !== lawyer_id) {
      navigate('/')
    }
  }, [lawyer_id])

  const [lawyer, setLawyer] = useState(null);

  const fetchLawyer = async () => {
    const response = await fetch(`http://localhost:4000/api/lawyer/getLawyer/${lawyer_id}`);
    const data = await response.json();

    setLawyer(data);
  }
  useEffect(() => {
    fetchLawyer();
  }, [])

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [experience, setexperience] = useState("");
  const [category, setcategory] = useState("");
  const [city, setcity] = useState("");
  const [bio, setbio] = useState("");
  const [dp, setdp] = useState("");
  
  const [filehandler,setFileHandler]=useState(null);

  useEffect(() => {
    if (lawyer) {
      setfirstname(lawyer.firstname)
      setlastname(lawyer.lastname)
      setexperience(lawyer.experience)
      setcategory(lawyer.category)
      setcity(lawyer.city)
      setbio(lawyer.bio)
      setdp(lawyer.image)
    }
    console.log("law", lawyer)
  }, [lawyer])

  const uploadFile = async (file, id) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`http://localhost:4000/api/file/image/${id}`, formData);
      return response.data.data.url;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const thumbImageUrl = filehandler ? await uploadFile(filehandler, Date.now().toString()) : dp;
    const toSend = {
      ...lawyer,
      firstname: firstname,
      lastname: lastname,
      experience: experience,
      category: category,
      city: city,
      bio: bio,
      image: thumbImageUrl
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
  }


  return (
    <div>
      <Header isloggedIn={true} />
      <div className="mt-10 mx-auto max-w-[1000px]">
        <div className=" border border-[#00000069]">
          <div className="bg-[#3E7D5A] w-full py-3 flex items-center justify-center text-white font-semibold">
            User Profile
          </div>
          <div className=" py-7 px-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div>
                <div className="bg-[#677D66] flex items-center justify-center rounded-[12px]">
                  <img src={dp} className="w-full object-cover" alt="" />
                </div>
                <input type="file" className=" hidden" name="file" id="file" onChange={(e)=>{
                  setFileHandler(e.target.files[0])
                }}/>
                <label
                  className=" w-full  text-center cursor-pointer "
                  htmlFor="file"
                >
                  <div className="bg-[#E9E9E9A6] rounded-[8px] mt-3 py-2 border border-[#00000042] flex items-center justify-center">
                    Choose image
                  </div>
                </label>
              </div>
              <div className=" lg:col-span-2">
                <div className=" grid grid-cols-1  lg:grid-cols-2 gap-10">
                  <input
                    type="text"
                    className="bg-[#E9E9E9A6] px-5  border border-[#CECECE] py-2 rounded-[8px]"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => {
                      setfirstname(e.target.value)
                    }}
                  />
                  <input
                    type="text"
                    className="bg-[#E9E9E9A6] px-5  border border-[#CECECE] py-2 rounded-[8px]"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => {
                      setlastname(e.target.value)
                    }}
                  />
                  <input
                    type="text"
                    className="bg-[#E9E9E9A6] px-5  border border-[#CECECE] py-2 rounded-[8px]"
                    placeholder="Experience"
                    value={experience}
                    onChange={(e) => {
                      setexperience(e.target.value)
                    }}
                  />
                  <select
                    className="px-5 py-2 border bg-[#E9E9E9A6] border-[#CECECE] rounded-[8px]"
                    name=""
                    id=""
                    value={category}
                    onChange={(e) => {
                      setcategory(e.target.value)
                    }}
                  >
                    <option value="">Expertise</option>
                    <option value="Criminal law">Criminal law</option>
                    <option value="Public">Public </option>
                  </select>
                  <select
                    className="px-5 py-2 border bg-[#E9E9E9A6] border-[#CECECE] rounded-[8px]"
                    name=""
                    id=""
                    value={city}
                    onChange={(e) => {
                      setcity(e.target.value)
                    }}
                  >
                    <option value="">City</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai </option>
                  </select>
                </div>
                <div className="mt-10">
                  <textarea
                    name=""
                    id=""
                    rows={6}
                    placeholder="Bio/Description"
                    className="bg-[#E9E9E9A6] w-full px-5  border border-[#CECECE] py-2 rounded-[8px]"
                    value={bio}
                    onChange={(e) => {
                      setbio(e.target.value)
                    }}
                  ></textarea>
                </div>
                <div className="mt-10 flex items-center justify-end gap-5">
                  <button className="px-8 py-2 border border-[#AAAAAA] text-[#B5B5B5] flex items-center gap-2 rounded-[8px] ">
                    Cancel
                  </button>
                  <button className="px-8 py-2 text-white flex items-center gap-2 rounded-[8px] bg-[#4D8360]" onClick={handleEdit}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
