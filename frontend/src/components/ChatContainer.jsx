import React, { useState, useEffect, useRef } from "react";

import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";

import { recievemessage } from "../service/opeartion/MessageAPI";
import { sendmessage } from "../service/opeartion/MessageAPI";
import { IoArrowBackCircle } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

export default function ChatContainer({
  currentChat,
  socket,
  setflag,
  flag,
  setCurrentChat,
}) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const navigate = useNavigate();
  useEffect(() => {
    const fun1 = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCAL_KEY)
      );
      const response = await recievemessage({
        from: data._id,
        to: currentChat._id,
      });

      setMessages(response.data.data);
    };

    // const response = await axios.post(recieveMessageRoute, {
    //   from: data._id,
    //   to: currentChat._id,
    // });
    fun1();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_KEY))
          ._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCAL_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    console.log(data._id, currentChat._id, msg);
    await sendmessage({ from: data._id, to: currentChat._id, message: msg });
    // await axios.post(sendMessageRoute, {
    //   from: data._id,
    //   to: currentChat._id,
    //   message: msg,
    // });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      console.log("msg send in socket");
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      // className={` flex flex-col w-full h-full
      //   max-[550px]:${
      //   flag === 0 ? "block" : "hidden"
      // }
      // `}
      className={` max-[550px]:${
        flag === 0 ? "block w-full " : "hidden"
      } flex flex-col w-full h-full `}
    >
      <div className="flex justify-between  items-center px-5 py-3 bg-richblack-700 ">
        <div className="flex items-center  gap-4">
          <div className="w-[50px] h-[50px]">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="text-caribbeangreen-400 font-bold text-xl">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <div
          className="block min-[550px]:hidden"
          onClick={() => {
            setCurrentChat(undefined);
            setflag(0);
          }}
        >
          <IoArrowBackCircle size={40} fill={"white"} />
        </div>
        <div className="hidden min-[550px]:block">
          <Logout />
        </div>
      </div>
      <div className="h-[calc[100%-10px]  pb-4 min-[550px]:px-[30px] min-[1000px]:px-50  px-[10px] pt-4 flex flex-col  gap-5  overflow-y-scroll">
        {/* <div className="w-[95%] "></div> */}
        <div className="h-[660px] w-[95%]"> </div>
        {messages.map((message) => {
          return (
            <div
              ref={scrollRef}
              key={uuidv4()}
              className={` flex  ${
                message.fromSelf ? "justify-end  " : "justify-start"
              }`}
            >
              <div>
                <div
                  className={` flex  ${
                    !message.fromSelf
                      ? "bg-caribbeangreen-200  "
                      : " bg-blue-200"
                  }  p-3 rounded-lg`}
                >
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
