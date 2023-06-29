import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import "material-icons/iconfont/material-icons.css";

export default function Home() {
  const { user, logout } = UserAuth();
  const Navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      Navigate("/");
      console.log("You are logged out");
    } catch (error) {
      console.log(error.message);
    }
  };
  const [active, setActive] = useState(false);
  const showMenu = () => {
    setActive(!active);
  };

  return (
    <div>
      {/* Navbar section */}
      <div className="text-white fixed w-full flex justify-between p-4 items-center">
        <div className="text-2xl font-bold text-center">
          <h1 className="text-4xl ">Audify</h1>
        </div>

        <nav>
          <div className="md:hidden scale-125 hover:scale-150">
            <button class="material-icons-outlined" onClick={showMenu}>
              menu
            </button>
          </div>
          <ul className="hidden md:flex gap-8 p-4 uppercase ">
            <li className="  hover:scale-125 hover:underline underline-offset-4 px-4 py-2">
              <Link to="/home">Home</Link>
            </li>
            <li className=" hover:scale-125 hover:underline underline-offset-4  px-4 py-2">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className=" hover:scale-125 hover:underline underline-offset-4  px-4 py-2">
              <Link to="/upload">Upload</Link>
            </li>
            <li className="hover:scale-125  px-4 py-2">
              <button
                onClick={handleLogout}
                className="uppercase hover:underline underline-offset-4 "
              >
                Logout
              </button>
            </li>
          </ul>
          <MenuItems showMenu={showMenu} active={active}></MenuItems>
        </nav>
      </div>
      {/* Welcome content */}
      <div className="h-screen flex flex-col justify-center items-center">
        <p className="text-white font-bold text-6xl">Welcome to Audify...</p>
        <p className="text-gray-300/70 italic text-2xl font-light mt-2 mb-6 ">
          Convert Your Videos into Audio Files with Ease
        </p>
        <p className="text-gray-200/80 text-xl mx-16 font-light px-16 italic">
          Are you looking to extract the audio from your favorite videos? We
          provide a simple and efficient way to convert any video file into an
          audio format. Whether it's a music video, a tutorial, or a memorable
          speech, our tool empowers you to transform videos into high-quality
          audio tracks.
        </p>
        <p className="text-gray-300/70 mt-4 text-xl font-light italic mb-6">
          Start converting now and enjoy your favorite videos in audio form!
        </p>
        <button className="text-white/60 text-xl bg-transparent border border-spacing-7 hover:bg-white hover:text-black rounded-full px-6 py-4 uppercase hover:text-2xl">
          <Link to="/upload">Start Uploading</Link>
        </button>
      </div>
      {/* Logged-in account-details */}
      <div className="absolute bottom-0 right-0">
        <p className="text-gray-200/50 ">--Logged in as--</p>
        <p className="text-white  mb-4 mr-4 hover:underline underline-offset-1">
          {user.email}
        </p>
      </div>
    </div>
  );
}
