import React from "react";
import Header from "../layout/Header";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
const FindLaywer = () => {
  const laywerCategory = [
    {
      image: "/f1.png",
      href: "/search-result",
      title: "Criminal Lawyer",
    },
    {
      image: "/f2.png",
      href: "/search-result",
      title: "Employment Lawyer",
    },
    {
      image: "/f3.png",
      href: "/search-result",
      title: "Immigration Lawyer",
    },
    {
      image: "/f4.png",
      href: "/search-result",
      title: "Personal Injury and Claim Lawyer",
    },
    {
      image: "/f5.png",
      href: "/search-result",
      title: "Civil Lawyer",
    },
    {
      image: "/f6.png",
      href: "/search-result",
      title: "Tax Lawyer",
    },
  ];
  return (
    <div className="bg-[#F1FFF4] min-h-screen">
      <Header isuser={true} />
      <div className=" py-[40px]">
        <h2 className="text-[26px] font-medium text-center">
          Finding it hard to get legal help ?
        </h2>
        <h2 className="text-[30px] font-medium text-center">
          Get in touch with the right lawyer for you !
        </h2>
        <div className="my-5 flex items-center justify-center">
          <form className="flex items-center gap-2 border bg-white border-black rounded-[8px]  p-2">
            <input
              required
              placeholder="Location"
              className=" border-none outline-none"
              type="text"
            />{" "}
            <button type="submit">
              <CiSearch className="w-5 h-5" />
            </button>
          </form>
        </div>
        <div className=" my-5 mx-auto max-w-[970px]">
          <p className="text-[20px]  text-[#00000080]">Select one :</p>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10">
            {laywerCategory.map((item, ind) => (
              <Link className="border border-black rounded-[4px] p-3 bg-white flex flex-col items-center justify-center gap-6" to={item.href}>
                <img src={item.image} alt="" />
                <p className="text-center ">{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindLaywer;
