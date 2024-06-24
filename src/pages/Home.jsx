import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";

const Home = () => {
  return (
    <>
      <Header />
      <div className=" py-[20px] px-3 lg:px-0 bg-[#F1FFF4]">
        <div className="max-w-[1120px] mx-auto">
          <div className=" bg-white border border-black  rounded-[12px] py-5 flex items-center flex-col gap-5">
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
          <div className=" border border-black bg-white justify-center rounded-[12px] p-8 flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
            <div>
              <img src="/j1.png" alt="" />
              <p className="text-[20px] mt-3 text-center">
                Choose the category
              </p>
            </div>
            <img
              src="/arrow.png"
              className=" rotate-90 lg:rotate-0 lg:my-0 my-[60px]"
              alt=""
            />
            <div>
              <img src="/j2.png" alt="" />
              <p className="text-[20px] mt-3 text-center">Select Lawyer</p>
            </div>
            <img
              src="/arrow.png"
              className=" rotate-90 lg:rotate-0 lg:my-0 my-[60px]"
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
                  icon: "/s1.png",
                  title: "Availability Management",
                  description:
                    "Expert advice to solve your business challenges and drive growth.",
                },
                {
                  id: 2,
                  icon: "/s2.png",
                  title: "Profile Management",
                  description:
                    "High-quality software development tailored to your needs.",
                },
                {
                  id: 3,
                  icon: "/s3.png",
                  title: "Reach Clients",
                  description:
                    "Creative and impactful design solutions for your brand.",
                },
                {
                  id: 4,
                  icon: "/s4.png",
                  title: "Safe and Secure",
                  description:
                    "Effective marketing strategies to reach and engage your audience.",
                },
                {
                  id: 5,
                  icon: "/s5.png",
                  title: "Always Growing",
                  description:
                    "Reliable support services to keep your operations running smoothly.",
                },
                {
                  id: 6,
                  icon: "/s6.png",
                  title: "User-friendly",
                  description:
                    "Comprehensive training programs to enhance your team’s skills.",
                },
              ].map((item) => (
                <div
                  className="bg-white rounded-[8px] flex items-center flex-col gap-3 border border-[#00000066] p-5"
                  key={item.id}
                >
                  <img
                    src={item.icon}
                    className="w-[60px]"
                    alt={`${item.title} icon`}
                  />
                  <p className="text-[#000] text-[18px] font-semibold text-center">
                    {item.title}
                  </p>
                  <p className="text-[#6C6C6C] text-center">
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
