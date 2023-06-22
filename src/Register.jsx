import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    email.preventDefault();
    console.log(email);
  };
  return (
    <form action="">
      <label>Name</label>
      <input
        value={name}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Fullname"
        id="name"
        name="name"
      />
      <label>Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Your Email"
        id="email"
        name="email"
      />
      <label>Password</label>
      <input
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        type="password"
        placeholder="Your Password"
        id="password"
        name="password"
      />
      <button type="submit">SIGN IN</button>
    </form>
  );
};

export default Register;
