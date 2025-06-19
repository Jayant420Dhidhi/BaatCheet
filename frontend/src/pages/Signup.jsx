import React, { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { signup } from "../service/opeartion/UserAPI";

export default function Signup() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCAL_KEY)) {
      navigate("/");
    }
  }, [navigate]);
  const { username, email, password, confirmPassword } = values;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.");
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      toast.error("Email is required.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;

      await signup({ navigate, username, email, password });
    }
  };

  return (
    <>
      <div className="bg-richblack-800 flex items-center justify-center  h-screen w-screen overflow-hidden ">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="h-[470px] w-[80vw] min-[670px]:w-[55vw] min-[830px]:w-[45vw] min-[1050px]:w-[35vw] bg-richblack-400 rounded-lg px-5 flex  gap-3  min-[452px]:gap-5 flex-col items-center justify-center">
            <div className="flex gap-3 items-center">
              <img src={Logo} alt="logo" className="w-[60px] " />
              <h1 className="text-4xl font-bold text-blue-600 ">BaatCheet</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => handleChange(e)}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
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
                placeholder="Password"
                name="password"
                value={password}
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

            <div className=" w-full relative  flex flex-col  gap-2 ">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleChange(e)}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-3 right-3 cursor-pointer"
              >
                {showConfirmPassword ? (
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
              Create User
            </button>
            <span className="  text-lg min-[400px]:text-xl font-semibold text-white flex gap-1 flex-col min-[450px]:flex-row items-center justify-center">
              Already have an account ?
              <Link to="/login">
                <span className="text-blue-600 text-xl font-bold"> Login</span>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
