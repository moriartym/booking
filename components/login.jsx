"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [isChecked, setIsChecked] = useState(true);
  const router = useRouter();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = () => {
    if (isChecked) {
      router.push("/createBooking");
    } else {
      router.push("/addBooking");
    }
  };

  return (
    <div className="flex w-screen h-screen bg-graybg">
      <div className="p-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md">
        <div className="w-[500px] flex flex-col ">
          <h1 className="text-4xl font-bold text-center">BookNow</h1>
          <h3 className="text-xl font-semibold text-center m-4">
            Welcome to Booknow, book your room now!
          </h3>
          <div>
            <div className="flex items-center w-full p-2 bg-gray-100 rounded-lg justify-center">
              <p
                className={`text-gray-700 font-bold mr-2 ${
                  isChecked ? "text-gray-900" : "text-gray-400"
                }`}
              >
                Staff
              </p>
              <label
                htmlFor="checkbox"
                className="relative inline-block w-14 h-8 bg-gray-600 rounded-full cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="checkbox"
                  className="hidden"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span
                  className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md transition duration-300 ${
                    isChecked ? "left-7" : "left-1"
                  }`}
                ></span>
              </label>
              <p
                className={`text-gray-700 font-bold ml-2 ${
                  isChecked ? "text-gray-400" : "text-gray-900"
                }`}
              >
                Student
              </p>
            </div>
            <div className="mb-4 mt-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 focus:outline-none w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-8"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 focus:outline-none w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-8"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-400"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
