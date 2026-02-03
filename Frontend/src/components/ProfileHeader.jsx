import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";
import { mouseClickSound } from "../utils/sounds";

export function ProfileHeader() {
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [ selectedImage, setSelectedImage ] = useState(null);
  const { authUser, logout, updateProfile } = useAuthStore();
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        console.log(base64Image);
        await updateProfile({profilePic: base64Image}, authUser);
    };
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={
                  selectedImage ||
                  authUser.profilePic ||
                  "src/assets/avatar.png"
                }
                alt="User image"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* UserName & Online Text */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-4 items-center">
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              if (!isSoundEnabled) {
                mouseClickSound
                  .play()
                  .catch((err) => console.log("Audio play failed:", err));
              }
              toggleSound();
            }}
          >
            {isSoundEnabled ? <Volume2Icon /> : <VolumeOffIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}
