import { User } from "../models/user.js";
import { Message } from "../models/message.js";
import cloudinary from "../utils/cloudinary.js";

const msgController = () => {
  const getAllContacts = async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      if (!loggedInUserId) {
        throw new Error(
          "Something went wrong while fetching contacts. Try logging-in again",
        );
      }
      const contacts = await User.find({ _id: { $ne: loggedInUserId } }).select(
        "-password",
      );
      if (!contacts) {
        throw new Error("Something went wrong while fetching contacts");
      }
      res
        .status(200)
        .json({ msg: "All contacts fetched successfully", data: contacts });
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  };
  const getChatPartners = async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const messages = await Message.find({
        $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
      });
      const chatPartnersIds = [
        ...new Set(
          messages.map((msg) => {
            return msg.senderId.toString() === loggedInUserId.toString()
              ? msg.receiverId
              : msg.senderId;
          }),
        ),
      ];
      const chatPartners = await User.find({_id: {$in: chatPartnersIds}}).select("-password");
      res.status(200).json({
        msg: "Chat partners fetched successfully",
        data: chatPartners,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
  const getMessagesByUserId = async (req, res) => {
    try {
      const presentUserId = req.user._id;
      const { id: contactUserId } = req.params;
      const messages = await Message.find({
        $or: [
          { senderId: presentUserId, receiverId: contactUserId },
          { senderId: contactUserId, receiverId: presentUserId },
        ],
      });
      res.status(200).json({ msg: "All messages retrieved", data: messages });
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  };
  const sendMessage = async (req, res) => {
    try {
      const { text, image } = req.body;
      const receiverId = req.query.receiverId;
      const senderId = req.user._id;
      let imageUrl = "";
      if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });
      await newMessage.save();
      res.status(201).json({ msg: "Message created and sent successfully" });
    } catch (err) {
      console.log("Error in sendMessage controller", err);
      res.status(500).json({ msg: "Error sending message" });
    }
  };
  return { sendMessage, getAllContacts, getChatPartners, getMessagesByUserId };
};
export default msgController;
