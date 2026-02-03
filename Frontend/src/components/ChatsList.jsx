import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

export function ChatsList() {
  const { getChatPartners, chats, isContactsLoading, setSelectedUser } =
    useChatStore();
  const {onlineUsers} = useAuthStore();

  useEffect(() => {
    getChatPartners();
  }, [getChatPartners]);

  if (isContactsLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;
  return (
    <>
      {chats.map((chatPartner) => (
        <div
          key={chatPartner._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chatPartner)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chatPartner._id)? "online":"offline"}`}>
              <div className="size-12 rounded-full">
                <img
                  src={chatPartner.profilePic || "src/assets/avatar.png"}
                  alt={chatPartner.fullName}
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {chatPartner.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}
