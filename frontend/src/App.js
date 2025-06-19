import React from "react";
import { Route, Routes } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SetAvatar from "./pages/SetAvatar";
import Chat from "./pages/Chat";
const App = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-richblack-800 overflow-y-scroll overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/setavatar" element={<SetAvatar />}></Route>
      </Routes>
    </div>
  );
};

export default App;
