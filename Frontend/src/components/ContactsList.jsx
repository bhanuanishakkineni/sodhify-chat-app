import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

export function ContactsList() {
  const { getAllContacts, allContacts, isContactsLoading, setSelectedUser, setActiveTab } =
    useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isContactsLoading) return <UsersLoadingSkeleton />;
  if (allContacts.length === 0) return <NoChatsFound />;
  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => {
            setSelectedUser(contact)
            setActiveTab("chats");
          }}
        >
          <div className="flex items-center gap-3">
            {/* If neeed to display status in contacts list as well use onlineUser similar to chat list component */}
            <div className={`avatar`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "src/assets/avatar.png"} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}
