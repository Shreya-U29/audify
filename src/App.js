import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Upload from "./components/Upload";
import Dashboard from "./components/Dashboard";
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
            <Route
              exact
              path="/home"
              element={
                <ProtectedRoutes>
                  {/* <Account /> */}
                  <Home />
                </ProtectedRoutes>
              }
            ></Route>
            <Route exact path="/dashboard" element={<ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
            }></Route>
            <Route exact path="/upload" element={<ProtectedRoutes>
              <Upload />
            </ProtectedRoutes>
            }></Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
