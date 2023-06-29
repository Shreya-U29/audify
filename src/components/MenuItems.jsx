import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "material-icons/iconfont/material-icons.css";

export default function MenuItems({ showMenu, active }) {
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

  return (
    <div>
      <nav className="uppercase">
        <ul
          className={
            active
              ? "flex-col flex fixed items-center  justify-center inset-0 left-3/4 bg-black/50 backdrop-blur-lg md:hidden"
              : "hidden"
          }
        >
          <li className="rounded-full px-2 py-2 hover:scale-150">
            <button class="material-icons-outlined" onClick={showMenu}>
              close
            </button>
          </li>
          <li className=" hover:scale-125 hover:underline underline-offset-4 px-4 py-2">
            <Link to="/home">Home</Link>
          </li>
          <li className=" hover:scale-125 hover:underline underline-offset-4 px-4 py-2">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className=" hover:scale-125 hover:underline underline-offset-4 px-4 py-2">
            <Link to="/upload">Upload</Link>
          </li>
          <li className="hover:scale-125  px-4 py-2">
            <button
              onClick={handleLogout}
              className="uppercase hover:underline underline-offset-4"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
