import mongoose, { Mongoose } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      // type: Mongoose.Schema.Types.ObjectId,
      type: String,
      ref: "User",
      require: true,
    },
    receiverId: {
      // type: Mongoose.Schema.Types.ObjectId,
      type: String,
      ref: "User",
      require: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
