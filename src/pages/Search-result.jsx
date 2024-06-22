import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
const SearchResult = () => {

  const { category } = useParams();

  const [lawyers, setLawyers] = useState([]);
  const [location,setLocation]=useState("");

  const [filteredLawyers, setFilteredLawyers] = useState([]);

  const fetchLawyer = async () => {
    const response = await fetch(`http://localhost:4000/api/lawyer/getLawyer`);
    const data = await response.json();

    setLawyers(data);
  }
  useEffect(() => {
    fetchLawyer();
  }, [category])

  useEffect(() => {
    if (lawyers) {
      const dex = lawyers.filter((l) => {
        return (l.category === category);
      });

      setFilteredLawyers(dex);
    }
  }, [lawyers])

  useEffect(()=>{
    console.log("OTOTOTOTOT",filteredLawyers)
  },[filteredLawyers])

  useEffect(()=>{
    console.log("SO",location);
    
    if(!location || location==="Location"){
      if (lawyers) {
        const dex = lawyers.filter((l) => {
          return (l.category === category);
        });
  
        setFilteredLawyers(dex);
      }
      return;
    }

    let dex=[];
    for(let i=0;i<lawyers.length;i++){
      if(lawyers[i].city===location){
        dex.push(lawyers[i]);
      }
    }

    setFilteredLawyers(dex);
  },[location]);

  
  return (
    <div className="bg-[#F1FFF4] pb-10 min-h-screen">
      <Header isuser={true} />

      <div className=" my-[40px] px-3 lg:px-0 mx-auto max-w-[970px]">
        <Link to="/find-lawyer" className="flex items-center mt-8 gap-2">
          <BsArrowLeft className=" w-4 h-4" />
          <p className="text-[14px] ">Go Back</p>

        </Link>
        <div className=" my-[20px] lg:my-[40px] flex items-start lg:items-center justify-between flex-col lg:flex-row gap-5 lg:gap-0">
          <h2 className="text-[20px] lg:text-[30px]">
            Here is a list of lawyers to choose from
          </h2>
          <select
            className="border border-black px-3 py-2 rounded-[8px]"
            name=""
            id=""
            value={location}
            onChange={(e)=>{
              setLocation(e.target.value);
            }}
          >
            <option>Location</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
          </select>
          <select
            className="border border-black px-3 py-2 rounded-[8px]"
            name=""
            id=""
          >
            <option>Sort</option>
            <option value="Experience">Experience</option>
            <option value="Availablity">Availablity</option>
          </select>
        </div>
        {filteredLawyers.map((item, ind) => (
          <div key={ind} className=" w-full mb-5 bg-white border border-black rounded-[4px] lg:h-[231px] px-3 flex items-center lg:items-end flex-col lg:flex-row justify-between">
            <div className="flex flex-col h-full lg:flex-row items-center justify-center lg:justify-normal w-full gap-3 lg:gap-[50px]">
              <img src={item.image} className="w-[229px]" alt="" />
              <div className=" pb-5 lg:pb-0">
                <h6 className="text-[30px] font-medium">{item.firstname + ' '+ item.lastname}</h6>
                <p className="mt-[10px] lg:mt-[60px] mb-5">{item.experience} Years Experience</p>
                <div className=" text-center lg:text-left">
                  <Link to="/view-details" className="  text-[#50B5FF]">View Details</Link>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <Link to={`/book-appointment/${item._id}`} className="bg-[#4D836030] border border-black text-nowrap text-[19px] lg:text-[20px] font-medium rounded-[8px] shadow-md px-3 py-3">
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
