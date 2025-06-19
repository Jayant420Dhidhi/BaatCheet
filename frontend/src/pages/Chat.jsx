import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { getalluser } from "../service/opeartion/UserAPI";
import { host } from "../service/apis";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_KEY))) {
      navigate("/login");
    } else {
      setCurrentUser(
        JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_KEY))
      );
    }
  }, [navigate]);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser?._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fun1 = async () => {
      if (currentUser) {
        if (currentUser?.isAvatarImageSet) {
          const response = await getalluser({ id: currentUser?._id });

          setContacts(response?.data?.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fun1();
  }, [currentUser,navigate]);

  // const user = JSON.parse(
  //   localStorage.getItem(process.env.REACT_APP_LOCAL_KEY)
  // );
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   } else if (!user?.isAvatarImageSet) {
  //     navigate("/setavatar");
  //   }

  //   const fun1 = async () => {
  //     // const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //     const response = await getalluser({ id: user._id });
  //     console.log("response now", response?.data?.data);
  //     console.log("hello ji");

  //     setContacts(response?.data?.data);
  //     setCurrentUser(
  //       JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_KEY))
  //     );
  //   };

  //   fun1();
  // }, [currentUser]);

  // console.log("contacts is", contacts);
  // console.log("current curruser is", currentUser);

  // if (currentUser) {
  //   socket.current = io(host);
  //   socket.current.emit("add-user", currentUser._id);
  // }

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  const [flag, setflag] = useState(0);
  return (
    <>
      <div className="flex ">
        <div
          // className={`w-full   max-[550px]:{${
          //   flag === 1 ? " hidden w-0" : "w-full block"
          // }}min-[550px]:w-2/5 min-[1000px]:w-1/5 bg-gray-900 h-screen `}
          className={`max-[550px]:${
            flag === 0 ? "w-screen block" : "hidden w-0 "
          } ${
            currentChat === undefined ? "w-full" : ""
          }  min-[550px]:w-2/5 min-[1000px]:w-1/5 bg-gray-900 h-screen `}
        >
          <Contacts
            contacts={contacts}
            changeChat={handleChatChange}
            setflag={setflag}
            flag={flag}
          />
        </div>
        <div
          className={` h-screen ${
            currentChat === undefined ? "w-fit" : "w-[100vw]"
          } min-[550px]:w-3/5 min-[1000px]:w-4/5 bg-gray-900  `}
        >
          {currentChat === undefined ? (
            <div
              className={`hidden  max-[550px]:${
                flag === 1 ? "w-0" : "w-0"
              }  min-[550px]:block `}
            >
              <Welcome />
            </div>
          ) : (
            // </div>
            <div
              className={`h-screen   max-[550px]:${
                flag === 1 ? "w-100vw" : "w-0 overflow-hidden"
              }`}
            >
              <ChatContainer
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                socket={socket}
                setflag={setflag}
                flag={flag}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
