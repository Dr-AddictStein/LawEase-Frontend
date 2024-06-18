import React from "react";
import Header from "../layout/Header";

const Profile = () => {
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
                <div className="bg-[#677D66] p-5 flex items-center justify-center rounded-[12px]">
                  <img src="/r1.png" className="w-full object-cover" alt="" />
                </div>
                <input type="file" className=" hidden" name="file" id="file" />
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
                  />
                  <input
                    type="text"
                    className="bg-[#E9E9E9A6] px-5  border border-[#CECECE] py-2 rounded-[8px]"
                    placeholder="Last Name"
                  />
                  <input
                    type="text"
                    className="bg-[#E9E9E9A6] px-5  border border-[#CECECE] py-2 rounded-[8px]"
                    placeholder="Experience"
                  />
                  <select
                    className="px-5 py-2 border bg-[#E9E9E9A6] border-[#CECECE] rounded-[8px]"
                    name=""
                    id=""
                  >
                    <option value="">Expertise</option>
                    <option value="">Criminal law</option>
                    <option value="">Public </option>
                  </select>
                  <select
                    className="px-5 py-2 border bg-[#E9E9E9A6] border-[#CECECE] rounded-[8px]"
                    name=""
                    id=""
                  >
                    <option value="">City</option>
                    <option value="">Pune</option>
                    <option value="">Mumbai </option>
                  </select>
                </div>
                <div className="mt-10">
                  <textarea
                    name=""
                    id=""
                    rows={6}
                    placeholder="Bio/Description"
                    className="bg-[#E9E9E9A6] w-full px-5  border border-[#CECECE] py-2 rounded-[8px]"
                  ></textarea>
                </div>
                <div className="mt-10 flex items-center justify-end gap-5">
                  <button className="px-8 py-2 border border-[#AAAAAA] text-[#B5B5B5] flex items-center gap-2 rounded-[8px] ">
                    Cancel
                  </button>
                  <button className="px-8 py-2 text-white flex items-center gap-2 rounded-[8px] bg-[#4D8360]">
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
