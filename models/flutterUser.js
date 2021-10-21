const mongoose = require("mongoose");
const { Schema } = mongoose;

const FlutterUserSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  pinCode: {
    type: String,
  },
});

module.exports = mongoose.model("FlutterUsers", FlutterUserSchema);
