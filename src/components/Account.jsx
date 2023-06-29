import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Account() {
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
    <div className="text-white">
      <p>Account details</p>
      <p className="flex flex-col text-center">Email:{user && user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
