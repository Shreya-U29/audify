import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import "material-icons/iconfont/material-icons.css";
import { Howl } from "howler";
import { app } from "../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { arrayRemove, updateDoc } from "firebase/firestore";
import { deleteObject } from "firebase/storage";

export default function Dashboard() {
  const { user, logout } = UserAuth();
  const db = getFirestore(app);
  const [audios, setAudios] = useState([]);
  const Navigate = useNavigate();
  const [audioDurations, setAudioDurations] = useState({});

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
      } catch (e) {
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

      {/* Link on the dashboard */}

      {/* style={{ textAlign: "center", color: "white" }} */}
      <div className="grid grid-rows-3 grid-flow-col mx-14">
        {/* <section className="h-screen flex flex-col justify-center items-center w-64 h-24 gap-10 text-center"> */}
        <div>
          <ul>
            {audios ? (
              audios.map((audio, index) => {
                const audioname = `Audio ${index + 1}`;
                const link = `https://firebasestorage.googleapis.com/v0/b/audify-c5c34.appspot.com/o/audios%2F${audio}?alt=media`;

                return (
                  <>
                    <li className="bg-gray-500/30 p-8 rounded-xl   hover:scale-110 my-8">
                      <p className="text-left text-sm text-yellow-400/60">
                        <span
                          className="material-icons mr-2 text-xl"
                          style={{ color: "yellow" }}
                        >
                          audiotrack
                        </span>
                        Listen to &emsp;
                        <span className="">
                          <a
                            href={link}
                            target="_blank"
                            className="text-white hover:underline text-lg "
                          >
                            {audioname}
                          </a>
                        </span>
                      </p>
                    </li>
                  </>
                );
              })
            ) : (
              <li className="text-white font-light italic text-center">
                Try converting video into mp3 audio files in the Uploads
                section...
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* end of link */}

      {/* Logged-in account-details */}
      <div style={{ position: "fixed", bottom: 0, right: 0 }}>
        <p className="text-gray-200/50 ">--Logged in as--</p>
        <p className="text-white  mb-4 mr-4 hover:underline underline-offset-1">
          {user.email}
        </p>
      </div>
    </div>
  );
}
