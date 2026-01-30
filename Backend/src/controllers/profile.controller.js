import { User } from "../models/user.js";
import cloudinary from "../utils/cloudinary.js";

const profileController = () => {
  const updateProfile = async (req, res) => {
    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({ msg: "Bad request: Image missing" });
    }
    try {
      const userId = req.user._id;
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true, runValidators: true },
      ).select("-password");
      res.status(200).json({
        msg: "Profile picture saved successfully",
        data: {
          _id: updatedUser._id,
          profilePic: updatedUser.profilePic,
        },
      });
    } catch (err) {
      res.status(500).json({ msg: "Internal Server error", err });
    }
  };
  return { updateProfile };
};

export default profileController;
