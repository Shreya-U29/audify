import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import "material-icons/iconfont/material-icons.css";
import {app} from '../firebase';
import { getFirestore, collection,addDoc,setDoc,doc, getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";

export default function Dashboard() {
  const { user, logout } = UserAuth();
  const db = getFirestore(app);
  const [ videos, setVideos ] = useState([]);
  const Navigate = useNavigate();
  const [files, setfiles] = useState();

  async function getUserVideos() {
    if (user) {
      try {
        const userUID = user.uid;
        const userDocRef = doc(db, "UserCollection", userUID);
        const docSnapshot = await getDoc(userDocRef);
  
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const videos = userData.videos;
          setVideos(videos);
          // Do something with the audios data
        } else {
          console.log("Document does not exist");
        }
      } catch(e) {
        console.log(e);
      }
    }
  }

  const handleUpload= async(video)=>{
    const formData = new FormData();
    const fileUrl = `https://firebasestorage.googleapis.com/v0/b/audify-c5c34.appspot.com/o/videoFiles%2F${video}?alt=media`;
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    setfiles(blob);
    formData.append("file",blob)
    // console.log(file)    
    try {
      fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    .then(data => console.log(data));
    handleSubmit(blob);
      
    } catch (error) {
      console.log("Internal Server Error occured")
    }
  }

  const handleSubmit = async (files) => {
    try {
      if (!files) {
        console.log("No file found");
      } else {
        const response = await fetch("http://127.0.0.1:5000/convert", {
          method: "GET",
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const audioElement = new Audio(url);
          const link = document.createElement("a");
          link.href = url;
          link.download = "audio.mp3";
          link.click();

          URL.revokeObjectURL(url);
        } else {
          console.log("Error occurred during conversion");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getUserVideos();
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
          <ul>
            {videos.length?videos.map((video) => {
              const link = `https://firebasestorage.googleapis.com/v0/b/audify-c5c34.appspot.com/o/videoFiles%2F${video}?alt=media`;
              return(
                <li><a href={link} target="_blank" style={{textDecoration:"underline", cursor:"pointer"}}>{video}</a></li>
              )
            }
            ):<li>Loading...</li>}
          </ul>
          <MenuItems showMenu={showMenu} active={active}></MenuItems>
        </nav>
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
