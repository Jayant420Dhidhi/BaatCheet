import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { logout } from "../service/opeartion/UserAPI";

export default function Logout() {
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCAL_KEY)
    )._id;

    await logout({ navigate, id });
  };

  return (
    <div
      className={`absolute top-2 right-4 flex items-center justify-center m-2 transition-transform ${
        isHovered ? "scale-110" : "scale-100"
      }`}
      onMouseEnter={() => setIsHovered(true)} // Trigger on hover
      onMouseLeave={() => setIsHovered(false)} // Reset when hover ends
      onClick={() => handleClick()} // Logout on click
    >
      <div
        className="w-[50px] h-[50px] text-2xl bg-richblack-900 flex items-center justify-center rounded-lg cursor-pointer"
      >
        <RiLogoutCircleRLine fill={"white"} size={30} />
      </div>
      {isHovered && (
        <div className="absolute top-[60px] bg-richblack-800 text-white text-sm rounded-lg px-2 py-1 shadow-md">
          Logout
        </div>
      )}
    </div>
  );
}
