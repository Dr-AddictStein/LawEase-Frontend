import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import {
  MdBusiness,
  MdBuild,
  MdPeople,
  MdSecurity,
  MdTrendingUp,
  MdSchool,
} from "react-icons/md"; // Importing necessary icons from react-icons

const Home = () => {
  return (
    <>
      <Header />
      <div className="py-[20px] px-3 lg:px-0 bg-[#F1FFF4]">
        <div className="max-w-[1120px] mx-auto">
          <div className="bg-white border border-black rounded-[12px] py-5 flex items-center flex-col gap-5">
            <img className="w-[177px]" src="/home.png" alt="" />
            <p className="text-[20px] text-center">
              Are you in a condition where finding legal help is difficult ?
              Dont Worry <br />
              We are here to help you
            </p>
            <Link to="find-lawyer">
              <button className="text-white font-medium bg-[#4D7D5D] px-14 rounded-[8px] py-[10px]">
                GET HELP
              </button>
            </Link>
          </div>

          <h2 className="py-5 text-[32px] font-semibold text-center">
            Just three simple steps to get legal help
          </h2>
          <div className="border border-black bg-white justify-center rounded-[12px] p-8 flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
            <div>
              <img src="/j1.png" alt="" />
              <p className="text-[20px] mt-3 text-center">
                Choose the category
              </p>
            </div>
            <img
              src="/arrow.png"
              className="rotate-90 lg:rotate-0 lg:my-0 my-[60px]"
              alt=""
            />
            <div>
              <img src="/j2.png" alt="" />
              <p className="text-[20px] mt-3 text-center">Select Lawyer</p>
            </div>
            <img
              src="/arrow.png"
              className="rotate-90 lg:rotate-0 lg:my-0 my-[60px]"
              alt=""
            />
            <div>
              <img src="/j3.png" alt="" />
              <p className="text-[20px] mt-3 text-center">Book Appointment</p>
            </div>
          </div>
          <Element name="services">
            <h2 className="py-5 text-[32px] font-semibold text-center">
              Services for Lawyers
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {[
                {
                  id: 1,
                  icon: <MdBusiness />,
                  title: "Availability Management",
                  description:
                    "Easily manage and add your availability the days and the time you are available for appointments.",
                },
                {
                  id: 2,
                  icon: <MdBuild />,
                  title: "Profile Management",
                  description:
                    "Stay updated with law and let the potential clients know about the changes in your expertise by updating profile information.",
                },
                {
                  id: 3,
                  icon: <MdPeople />,
                  title: "Reach Clients",
                  description:
                    "Reach a wider audience apart from the traditional methods and gain financial stability",
                },
                {
                  id: 4,
                  icon: <MdSecurity />,
                  title: "Safe and Secure",
                  description:
                    "Your information is secure with us and no private information is shared with client without your permission.",
                },
                {
                  id: 5,
                  icon: <MdTrendingUp />,
                  title: "Always Growing",
                  description:
                    "Our userbase is increasing and is reaching a wider audience for you to get more clients.",
                },
                {
                  id: 6,
                  icon: <MdSchool />,
                  title: "User-friendly",
                  description:
                    "Easy to use platform with minimal steps required to perform daily tasks.",
                },
              ].map((item) => (
                <div
                  className="bg-white rounded-[8px] flex items-center flex-col gap-3 border border-[#000] p-5"
                  key={item.id}
                >
                  <div className="w-[60px] h-[60px] mt-3 flex items-center justify-center rounded-full bg-[#4D7D5D] text-white text-[28px]">
                    {item.icon}
                  </div>
                  <p className="text-[#000] mt-5 text-[20px] text-center ">
                    {item.title}
                  </p>
                  <p className="text-[#6C6C6C] mt-5 text-center">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Element>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
