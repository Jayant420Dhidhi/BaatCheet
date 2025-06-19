const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  console.log("MongoDB URI:", process.env.MONGODB_URI);
  
  mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // connectTimeoutMS: 20000,
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => {
      console.log("DB Connection Failed");
      console.error(error);
      process.exit(1);
    });
};
