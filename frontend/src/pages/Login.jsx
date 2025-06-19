import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { toast } from "react-hot-toast";

import { login } from "../service/opeartion/UserAPI";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_KEY))) {
      navigate("/");
    }
  }, [navigate]);
  const { email, password } = values;
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { email, password } = values;
    if (email === "") {
      toast.error("Email and Password is required.");
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = values;
      await login({ email, password, navigate });
    }
  };

  return (
    <>
      <div className="bg-richblack-800 flex items-center justify-center  h-screen w-screen overflow-hidden ">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="h-[400px] w-[80vw] min-[670px]:w-[55vw] min-[830px]:w-[45vw] min-[1050px]:w-[35vw] bg-richblack-400 rounded-lg px-5 flex gap-5 flex-col items-center justify-center">
            <div className="flex gap-3 items-center">
              <img src={Logo} alt="logo" className="w-[60px] " />
              <h1 className="text-4xl font-bold text-white-400 ">BaatCheet</h1>
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
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className=" w-full  rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
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
              <div
                className="text-sm w-full text-white cursor-pointer flex justify-end"
                onClick={() => navigate("/forgotpassword")}
              >
                <p>Forgot Password ?</p>
              </div>
            </div>

            <button
              type="submit"
              className="bg-brown-200 py-4 px-10 text-white rounded-lg"
            >
              <b>Log In</b>
            </button>
            <span className="text-xl font-semibold text-white flex gap-1 flex-col min-[450px]:flex-row items-center justify-center">
              Don't have an account ?
              <Link to="/signup">
                <span className="text-richblue-600 text-xl font-bold">
                  {" "}
                  Create New 
                </span>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
