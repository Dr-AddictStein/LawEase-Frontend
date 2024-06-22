import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const SearchResult = () => {
  const { category } = useParams();
  const [lawyers, setLawyers] = useState([]);
  const [location, setLocation] = useState("");
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // State to track which accordion is open

  const fetchLawyer = async () => {
    const response = await fetch(`http://localhost:4000/api/lawyer/getLawyer`);
    const data = await response.json();
    setLawyers(data);
  };

  useEffect(() => {
    fetchLawyer();
  }, [category]);

  useEffect(() => {
    if (lawyers) {
      const dex = lawyers.filter((l) => l.category === category);
      setFilteredLawyers(dex);
    }
  }, [lawyers, category]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle accordion open/close
  };

  return (
    <div className="bg-[#F1FFF4] pb-10 min-h-screen">
      <Header isuser={true} />
      <div className="my-[40px] px-3 lg:px-0 mx-auto max-w-[970px]">
        <Link to="/find-lawyer" className="flex items-center mt-8 gap-2">
          <BsArrowLeft className="w-4 h-4" />
          <p className="text-[14px]">Go Back</p>
        </Link>
        <div className="my-[20px] lg:my-[40px] flex items-start lg:items-center justify-between flex-col lg:flex-row gap-5 lg:gap-0">
          <h2 className="text-[20px] lg:text-[30px]">Here is a list of lawyers to choose from</h2>
          <select
            className="border border-black px-3 py-2 rounded-[8px]"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>Location</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
          </select>
          <select className="border border-black px-3 py-2 rounded-[8px]">
            <option>Sort</option>
            <option value="Experience">Experience</option>
            <option value="Availability">Availability</option>
          </select>
        </div>
        {filteredLawyers.map((item, index) => (
          <div key={index} className="w-full mb-5 bg-white border border-black rounded-[4px] overflow-hidden">
            <div className="p-4 flex flex-col lg:flex-row items-center justify-between transition-all duration-300 ease-in-out">
              <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto mb-4 lg:mb-0 lg:mr-5">
                <img src={item.image} className="w-[229px] h-auto" alt={`${item.firstname} ${item.lastname}`} />
              </div>
              <div className="flex flex-col w-full lg:w-[70%]">
                <h6 className="text-[30px] lg:text-[24px] font-medium mb-1">{item.firstname} {item.lastname}</h6>
                <p className="text-[14px] lg:text-[16px] text-gray-700 mb-2">{item.experience} Years Experience</p>
                {openIndex === index && (
                  <p className="text-[14px] lg:text-[16px] text-gray-800 mb-4">{item.bio}</p>
                )}
                <div className="flex items-center justify-center lg:justify-start">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="text-[#50B5FF] cursor-pointer"
                  >
                    {openIndex === index ? "Hide Details" : "View Details"}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4 lg:mt-0">
                <Link to={`/book-appointment/${item._id}`} className="bg-[#4D836030] border border-black text-nowrap text-[19px] lg:text-[20px] font-medium rounded-[8px] shadow-md px-3 py-3">
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
