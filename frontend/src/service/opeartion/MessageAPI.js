import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { recieveMessageRoute, sendMessageRoute } from "../apis";

export const recievemessage = async ({ from, to }) => {
  const toastId = toast.loading("Loading...");
  let response;
  try {
    response = await apiConnector("POST", recieveMessageRoute, {
      from,
      to,
    });

    console.log("recieve message  API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("message recieve Successful");
  } catch (error) {
    console.log("recieve message  ERROR............", error);
    toast.error("recieve message  Failed");
  }

  toast.dismiss(toastId);
  return response;
};

export const sendmessage = async ({ from, to, message }) => {
  const toastId = toast.loading("Loading...");
  let response;
  try {
    response = await apiConnector("POST", sendMessageRoute, {
      from,
      to,
      message,
    });

    console.log("send message  API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("message send Successful");
  } catch (error) {
    console.log("send message API ERROR............", error);
    toast.error("send message  Failed");
  }

  toast.dismiss(toastId);
  return response;
};
