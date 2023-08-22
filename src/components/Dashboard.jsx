import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import "material-icons/iconfont/material-icons.css";
import { app } from '../firebase';
import { getFirestore, collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Dashboard() {
  const { user, logout } = UserAuth();
  const db = getFirestore(app);
  const [audios, setAudios] = useState([]);
  const Navigate = useNavigate();

  async function getUserAudios() {
    if (user) {
      try {
        const userUID = user.uid;
        const userDocRef = doc(db, "UserCollection", userUID);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const audios = userData.audios;
          setAudios(audios);
          // Do something with the audios data
        } else {
          console.log("Document does not exist");
        }
      } catch(e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    getUserAudios();
  }, [user]);

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
      <div className="text-white w-full flex justify-between p-4 items-center">
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
            <li className=" hover:scale-125 hover:underline underline-offset-4  px-4 py-2">
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
      <div style={{ textAlign: "center", color: "white" }}>
        <ul>
          {audios ? audios.map((audio) => {
            const link = `https://firebasestorage.googleapis.com/v0/b/audify-c5c34.appspot.com/o/audios%2F${audio}?alt=media`;
            return (
              <>
               
                <li><a href={link} target="_blank" style={{ textDecoration: "underline", cursor: "pointer" }} >{audio}</a></li>
                
              </>
            )
          }
          ) : <li>Loading...</li>}
        </ul>
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
