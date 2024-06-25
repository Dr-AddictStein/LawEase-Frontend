import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const SearchResult = () => {
  const { category } = useParams();

  const [lawyers, setLawyers] = useState([]);
  const [location, setLocation] = useState("");
  const [sortOption, setSortOption] = useState("Sort");
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [expandedBio, setExpandedBio] = useState(null);

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
      const dex = lawyers.filter((l) => l.category.includes(category));
      setFilteredLawyers(dex);
    }
  }, [lawyers]);

  useEffect(() => {
    if (!location || location === "Location") {
      if (lawyers) {
        const dex = lawyers.filter((l) => l.category === category);
        setFilteredLawyers(dex);
      }
      return;
    }

    let dex = [];
    for (let i = 0; i < lawyers.length; i++) {
      if (lawyers[i].city === location) {
        dex.push(lawyers[i]);
      }
    }
    setFilteredLawyers(dex);
  }, [location]);

  useEffect(() => {
    let sortedLawyers = [...filteredLawyers];

    if (sortOption === "Experience") {
      sortedLawyers.sort((a, b) => b.experience - a.experience);
    }

    setFilteredLawyers(sortedLawyers);
  }, [sortOption]);

  const toggleBio = (index) => {
    setExpandedBio(expandedBio === index ? null : index);
  };

  return (
    <div className="bg-[#F1FFF4] pb-10 min-h-screen">
      <Header isuser={true} />

      <div className="my-[40px] px-3 lg:px-0 mx-auto max-w-[970px]">
        <Link to="/find-lawyer" className="flex items-center mt-8 gap-2">
          <BsArrowLeft className="w-6 h-6 " />
          <p className="text-[18px]  ">Go Back</p>
        </Link>
        <div className="my-[20px] lg:my-[40px] flex items-start lg:items-center justify-between flex-col lg:flex-row gap-5 lg:gap-0">
          <h2 className="text-[20px] lg:text-[30px]">
            Here is a list of lawyers to choose from
          </h2>
          <select
            className="border border-black px-3 py-2 rounded-[8px]"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>Location</option>
            <option value="Regina">Regina</option>
            <option value="Moose Jaw">Moose Jaw</option>
          </select>
          <select
            className="border border-black px-3 py-2 rounded-[8px]"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Sort</option>
            <option value="Experience">Experience</option>
            {/* <option value="Availability">Availability</option> */}
          </select>
        </div>
        {filteredLawyers.map((item, ind) => (
          <div
            key={ind}
            className="w-full mb-5 bg-white border border-black rounded-[4px] lg:px-3 py-5 flex flex-col justify-between transition-height duration-1000 ease-in-out"
            style={{
              maxHeight: expandedBio === ind ? "800px" : "600px",
              overflow: "hidden",
            }}
          >
            <div className="flex flex-col h-full lg:flex-row items-center justify-between w-full gap-3 lg:gap-[50px]">
              <img src={item.image} className="w-[229px]" alt="" />
              <div className="flex-grow">
                <h6 className="text-[30px] font-medium">
                  {item.firstname + " " + item.lastname}
                </h6>
                <p className="mt-[10px] lg:mt-[20px] mb-5">
                  {item.experience} Years Experience
                </p>
                <div className="text-center lg:text-left mt-3">
                  <button
                    onClick={() => toggleBio(ind)}
                    className="text-[#50B5FF]"
                  >
                    {expandedBio === ind ? "Hide Details" : "View Details"}
                  </button>
                </div>
                {expandedBio === ind && (
                  <div className="mt-3 text-gray-700">{item.bio}</div>
                )}
              </div>
            </div>
            <div className="mt-5 text-center lg:text-right">
              <Link
                to={`/book-appointment/${item._id}`}
                className="bg-[#4D836030] border border-black text-nowrap text-[19px] lg:text-[20px] font-medium rounded-[8px] shadow-md px-3 py-3"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
