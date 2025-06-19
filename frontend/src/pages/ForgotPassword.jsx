import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { toast } from "react-hot-toast";

import { forgotpassword } from "../service/opeartion/UserAPI";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", newpassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCAL_KEY)) {
      navigate("/");
    }
  }, [navigate]);
  const { email, newpassword } = values;
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { email, newpassword } = values;
    if (email === "") {
      toast.error("Email and Password is required.");
      return false;
    } else if (newpassword === "") {
      toast.error("Email and Password is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, newpassword } = values;
      await forgotpassword({ email, newpassword, navigate });
    }
  };

  return (
    <>
      <div className="bg-richblack-800 flex items-center justify-center  h-screen w-screen overflow-hidden ">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="h-[400px] w-[80vw] min-[670px]:w-[55vw] min-[830px]:w-[45vw] min-[1050px]:w-[35vw] bg-richblack-400 rounded-lg px-5 flex gap-5 flex-col items-center justify-center">
            <div className="flex gap-3 items-center">
              <img src={Logo} alt="logo" className="w-[60px] " />
              <h1 className="text-4xl font-bold text-pink-400 ">BaatCheet</h1>
            </div>

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <div className=" w-full relative  flex flex-col  gap-2 ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                name="newpassword"
                value={newpassword}
                onChange={(e) => handleChange(e)}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-3 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-brown-200 py-4 px-10 text-white rounded-lg"
            >
              Change Password
            </button>
            <button className="bg-richblack-600 py-4 px-10 text-white rounded-lg">
              <Link to="/login">Back to login</Link>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
