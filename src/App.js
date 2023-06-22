import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Account from "./components/Account";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleform = (forName) => {
    setCurrentForm(forName);
  };
  return (
    <div className="App">
      {/* {currentForm === "login" ? (
        <Login onFormSwitch={toggleform} />
      ) : (
        <Register />
      )} */}
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/account" element=
            {<ProtectedRoutes>
              <Account />
            </ProtectedRoutes>}></Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
