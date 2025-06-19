const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message,
      };
    });
    return res.json({
      success: true,
      message: "all message fetch",
      data: projectedMessages,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "error in  message fetch ",
      data: error,
    });
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: message,
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({
        success: true,
        message: "Message added successfully.",
      });
    } else {
      return res.json({
        success: false,
        message: "Failed to add message to the database",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "error in  message adding ",
      data: error,
    });
  }
};
