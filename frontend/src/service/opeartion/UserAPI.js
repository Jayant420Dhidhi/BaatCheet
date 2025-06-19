import { apiConnector } from "../apiconnector";
import { SignupRoute, allUsersRoute, logoutRoute } from "../apis";
import { loginRoute } from "../apis";
import { forgotPasswordRoute } from "../apis";
import toast from "react-hot-toast";
import { setAvatarRoute } from "../apis";

export const signup = async ({ navigate, username, email, password }) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", SignupRoute, {
      username: username,
      email: email,
      password: password,
    });

    console.log("SIGNUP API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Signup Successful");
    navigate("/login");
  } catch (error) {
    console.log("SIGNUP API ERROR............", error);
    toast.error("Signup Failed");
    navigate("/signup");
  }

  toast.dismiss(toastId);
};

export const login = async ({ email, password, navigate }) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", loginRoute, {
      email,
      password,
    });

    console.log("LOGIN API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("Login Successful");
    localStorage.setItem(
      process.env.REACT_APP_LOCAL_KEY,
      JSON.stringify(response?.data?.data)
    );
    navigate("/");
  } catch (error) {
    console.log("LOGIN API ERROR............", error);
    toast.error(error.message);
    navigate("/login");
  }

  toast.dismiss(toastId);
};

export const forgotpassword = async ({ email, newpassword, navigate }) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", forgotPasswordRoute, {
      email,
      newpassword,
    });

    console.log("forgotpassword API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("password change Successfully");
    setTimeout(() => navigate("/login"), 1500);
  } catch (error) {
    console.log("forgot API ERROR............", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
};

export const setAvatar = async ({ navigate, user, image }) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector(
      "POST",
      `${setAvatarRoute}/${user._id}`,
      {
        image,
      }
    );

    console.log("setAvatar API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    const updatedUser = { ...user, isAvatarImageSet: true, avatarImage: response.data.image };
    
    localStorage.setItem(
      process.env.REACT_APP_LOCAL_KEY,
      JSON.stringify(updatedUser)
    );

    toast.success("Avatar added successfully");
    setTimeout(() => navigate("/"), 1500);
  } catch (error) {
    console.error("setAvatar API ERROR", error);
    toast.error("Error setting avatar. Please try again.");
  }

  toast.dismiss(toastId);
};

export const getalluser = async ({ id }) => {
  const toastId = toast.loading("Loading...");
  let response;
  try {
    response = await apiConnector("GET", `${allUsersRoute}/${id}`);

    console.log("alluserget API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("all users fetch Successful");
  } catch (error) {
    console.log("all users fetch API ERROR............", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return response;
};

export const logout = async ({ navigate, id }) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", `${logoutRoute}/${id}`);

    console.log("setAvatar API RESPONSE............", response);
    localStorage.clear();

    toast.success("Logged Out");

    navigate("/login");
  } catch (error) {
    console.log(" logout API ERROR............", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
};
