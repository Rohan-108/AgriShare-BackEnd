import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email) {
          return String(email)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        message: (props) => `Email${props.value} is invalid!`,
      },
    },
    password: { type: String, required: true },
    pic: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/64/64572.png",
    },
    location: { type: String, required: true },
    company: { type: String, required: true },
    designation: { type: String, required: true },
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", userSchema);
export default userModel;
