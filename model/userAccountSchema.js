import mongoose from "mongoose";

const userAccountSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  mobileNumber: {
    type: Number,
    minLength: [10, "Mobile number should have minimum 10 digits"],
    maxLength: [10, "Mobile number should have maximum 10 digits"],
    match: [/\d{10}/, "Mobile number should only have digits"],
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const UserAccount = mongoose.model("useraccount", userAccountSchema);

export default UserAccount;
