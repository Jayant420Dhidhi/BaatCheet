import React, { useRef, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import useOnClickOutside from "../hooks/useOnClickOutside";

import { VscSend } from "react-icons/vsc";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setMsg(msg + emoji);
  };
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowEmojiPicker(false));
  return (
    <div className="bg-richblack-900 flex    justify-center   items-center   w-full h-[100px] border-[3px] border-t-white">
      <div className=" flex gap-4 relative  mt-4  pb-2 items-center  w-9/12 h-[90%] ">
        <div className="flex flex-col  w-fit h-fit  ">
          <BsEmojiSmileFill
            onClick={handleEmojiPickerhideShow}
            size={30}
            fill={"yellow"}
          />
          <div className="absolute top-[-440px] l-[30px] " ref={ref}>
            {showEmojiPicker && (
              <Picker onEmojiSelect={addEmoji} autoFocus data={data} />
            )}
          </div>
        </div>

        <form onSubmit={(event) => sendChat(event)}>
          <div className="relative w-[55vw]">
            <input
              type="text"
              placeholder="type your message "
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="h-fit   relative w-[55vw] min-[550px]:w-[39vw]  min-[1000px]:w-[55vw] rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <button
              type="submit"
              className="absolute  top-[10px] right-[19px]    min-[1000px]:top-[10px] min-[1000px]:right-[19px]"
            >
              <VscSend size={25} fill={"white"} />
            </button>
            <div className=" hidden min-[1000px]:hidden min-[550px]:block">
              <button
                type="submit"
                className=" absolute top-[10px]  left-[190px] min-[610px]:left-[215px] min-[700px]:left-[255px] min-[900px]:left-[330px] min-[800px]:left-[285px]  "
              >
                <VscSend size={25} fill={"white"} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
