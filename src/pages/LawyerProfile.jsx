import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";

const LawyerProfile = () => {
    const { lawyer_id } = useParams();
    const navigate = useNavigate();
    const [lawyer, setLawyer] = useState(null);

    const DEFAULT_FAVICON = "https://via.placeholder.com/155";

    const fetchLawyer = async () => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/lawyer/getLawyer/${lawyer_id}`
            );
            const fetchedLawyer = response.data;

            setLawyer(fetchedLawyer);
        } catch (error) {
            console.error("Error fetching lawyer:", error);
        }
    };

    useEffect(() => {
        fetchLawyer();
    }, []);

    return (
        <div className="bg-[#F1FFF4] min-h-screen">
            <Header isloggedIn={true} />
            <div className="mt-10 mx-auto max-w-[1000px] bg-white">
                <div className="flex items-center justify-between bg-[#F1FFF4] py-4">
                    <Link to="/find-lawyer" className="flex items-center gap-2">
                        <BsArrowLeft className="w-6 h-6" />
                        <p className="text-[18px]">Go Back</p>
                    </Link>
                </div>
                <div className="border border-[#00000069]">
                    <div className="bg-[#3E7D5A] w-full text-[18px] py-3 flex items-center justify-center text-white">
                        {lawyer?.firstname}'s Profile
                    </div>
                    <div className="py-7 px-10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div>
                                <div className="bg-[#677D66] flex items-center justify-center rounded-[12px]">
                                    <img src={lawyer?.image || DEFAULT_FAVICON} className="w-full object-cover" alt="" />
                                </div>
                                <h3 className="text-center mb-2 mt-5">Bio:</h3>
                                <p className="flex justify-center text-center text-lg">
                                    {lawyer?.bio}
                                </p>
                            </div>
                            <div className="lg:col-span-2">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    <div className="bg-[#E9E9E9A6] px-5 py-2 rounded-[8px]">
                                        <p className="text-[18px] font-semibold my-2">First Name</p>
                                        <p>{lawyer?.firstname}</p>
                                    </div>
                                    <div className="bg-[#E9E9E9A6] px-5 py-2 rounded-[8px]">
                                        <p className="text-[18px] font-semibold my-2">Last Name</p>
                                        <p>{lawyer?.lastname}</p>
                                    </div>
                                    <div className="bg-[#E9E9E9A6] px-5 py-2 rounded-[8px]">
                                        <p className="text-[18px] font-semibold my-2">Experience</p>
                                        <p>{lawyer?.experience} years</p>
                                    </div>
                                    <div className="bg-[#E9E9E9A6] px-5 py-2 rounded-[8px]">
                                        <p className="text-[18px] font-semibold my-2">City</p>
                                        <p>{lawyer?.city}</p>
                                    </div>
                                    <div className="bg-[#E9E9E9A6] px-5 py-2 rounded-[8px] lg:col-span-2">
                                        <p className="text-[18px] font-semibold my-2">Fields of Expertise</p>
                                        <div className="flex flex-wrap gap-2 my-2">
                                            {lawyer?.category?.map((cat, index) => (
                                                <div key={index} className="bg-[#4D7D5D] text-white px-2 py-1 rounded">
                                                    {cat}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LawyerProfile;
