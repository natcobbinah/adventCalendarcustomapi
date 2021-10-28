const { Double } = require("bson");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const signupPaypalSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  amountPerDoor: {
    type: Number,
  },
  transactionId: {
    type: String,
  },
  consent: {
    type: Boolean,
  },
  subscription: {
    type: Boolean,
  },
});

module.exports = mongoose.model("UserRegPaypal", signupPaypalSchema);
