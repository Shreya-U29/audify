import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = () => {
    email.preventDefault();
    console.log(email);
  };
  return (
    <div className="flex flex-col">
      <h1 className="text-white mb-20 font-bold text-7xl font-serif">Audify</h1>
      <form action="" className="flex flex-col justify-center">
        {/* <label>Email</label> */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
          id="email"
          name="email"
          className="bg-slate-500/25 py-2 rounded-full px-12 hover:bg-slate-500/50 text-white text-justify"
        />
        {/* <label>Password</label> */}
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Your Password"
          id="password"
          name="password"
          className="bg-slate-500/25 mt-3 py-2 rounded-full px-12 hover:bg-slate-500/50 text-white"
        />
        <button
          type="sumbit"
          className="text-white text-center bg-transparent hover:bg-white hover:text-black rounded-full mt-3 px-4 py-2 border border-white"
        >
          Sign In
        </button>
      </form>
      <div className="mt-20">
        <p className="text-gray-500">-Don't have an account-</p>
        <button className="mt-3 border-white-50 text-white bg-transparent border border-white hover:bg-white hover:text-black rounded-full px-16 py-2">
          Sign Up here
        </button>
      </div>
      {/* <footer className="text-white ">2023</footer> */}
    </div>
  );
};

export default Login;
