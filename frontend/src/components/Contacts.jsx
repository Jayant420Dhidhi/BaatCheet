import React, { useState, useEffect, useMemo } from "react";

import Logo from "../assets/logo.png";
import Logout from "./Logout";

export default function Contacts({ contacts, changeChat, setflag, flag }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [color, setColor] = useState("text-red-500");
  
  const colors = useMemo(
    () => [
      "text-white",
      "text-pink-300",
      "text-yellow-400",
      "text-teal-400",
      "text-blue-400",
      "text-green-400",
      "text-[rgb(255,99,71)]",
      "text-[rgb(72,61,139)]",
      "text-[rgb(255,165,0)]",
      "text-[rgb(0,191,255)]",
      "text-[rgb(34,139,34)]",
    ],
    []
  );

  useEffect(() => {

    const interval = setInterval(() => {
      setColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 2000);
    return () => clearInterval(interval); 
  }, [colors]);

  useEffect(() => {
    const fun1 = async () => {
      const storedData = localStorage.getItem(process.env.REACT_APP_LOCAL_KEY);
      if (storedData) {
        const data = JSON.parse(storedData);
        setCurrentUserName(data?.username || "Guest"); 
        setCurrentUserImage(data?.avatarImage || "default-avatar.png"); 
      } else {
        console.warn("No user data found in localStorage");
      }
    };
    fun1();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && (
        <div
          className={`flex flex-col  max-[550px]:${
            flag === 0 ? "block w-full" : "hidden  w-0 overflow-hidden"
          } min-[550px]:w-full h-full  min-[550px]:border-r-blue-100   min-[550px]:border-[5px]`}
        >
          <div
            className="flex h-fit gap-4 items-center ju w-full
            min-[550px]:border-b-white  min-[550px]:border-[5px] 
            p-4 bg-richblack-900 justify-between min-[550px]:justify-center font-bold "
          >
            <div className="flex gap-3 items-center">
              <img src={Logo} alt="logo" className="w-[40px] h-[40px]" />
              <h3 className={`${color} font-bold pl-1 text-1xl md:text-2xl`}>BAATCHEET</h3>
            </div>

            {flag === 0 && (
              <div className="block  pb-3 min-[550px]:hidden ">
                <Logout></Logout>
              </div>
            )}
          </div>
          <div className="h-[calc(100%-100px)] mx-3 flex flex-col items-start gap-4 pt-2 pb-2  overflow-y-scroll  ">
            <div className="w-[95%]">
              {contacts?.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`${
                      index === currentSelected
                        ? "bg-caribbeangreen-200 p-2 my-1 rounded-lg"
                        : " pb-5"
                    } flex  h-fit gap-3 items-center justify-center min-[550px]:justify-start rounded-lg p-3 mb-4 min-[550px]:mb-0 max-[550px]:bg-pink-900  max-[550px]:p-3`}
                    onClick={() => {
                      changeCurrentChat(index, contact);
                      setflag(1);
                    }}
                  >
                    <div className="w-[40px] h-[40px]">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="text-white font-bold text-xl pb-3 md:pb-0 pt-1  min-[1000px]:pt-0">
                      <h3>{contact?.username}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-4 min-[550px]:border-t-white  min-[550px]:border-[5px] items-center  p-4 bg-richblack-900 justify-center font-bold ">
            <div className="flex gap-4 items-center w-full justify-center ">
              <div className="w-[60px] h-[60px] ">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="text-2xl font-bold text-white ">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
