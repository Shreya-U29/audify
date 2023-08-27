import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContextProvider, UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email);
    setErr("");
    try {
      await createUser(email, password);
      navigate("/home");
    } catch (error) {
      setErr(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center ">
      <h1 className="text-white mb-20 font-bold text-7xl font-serif">Audify</h1>
      <form
        action=""
        className="flex flex-col justify-center"
        onSubmit={handleSubmit}
      >
        {/* <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your Name"
          id="name"
          // name="name"
          className="bg-slate-500/25 py-2 my-3 rounded-full px-12 hover:bg-slate-500/50 text-white text-justify"
        /> */}
        {/* <label>Name</label> */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
          id="email"
          // name="email"
          className="bg-slate-500/25 py-2 rounded-full px-12 hover:bg-slate-500/50 text-white text-justify"
        />
        {/* <label>Password</label> */}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Your Password"
          id="password"
          // name="password"
          className="bg-slate-500/25 mt-3 py-2 rounded-full px-12 hover:bg-slate-500/50 text-white"
        />
        <button
          type="sumbit"
          className="text-white text-center bg-transparent hover:bg-white hover:text-black rounded-full mt-3 px-4 py-2 border border-white"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-20">
        <p className="text-gray-500">-Already have an account-</p>
        <Link to="/">
          <button className="mt-3 border-white-50 text-white bg-transparent border border-white hover:bg-white hover:text-black rounded-full px-16 py-2">
            Login here
          </button>
        </Link>
      </div>
      {/* <footer className="text-white ">2023</footer> */}
    </div>
  );
};

export default Signup;
