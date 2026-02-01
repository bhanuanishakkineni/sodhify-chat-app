// import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { BorderAnimator } from "../components/BorderAnimator";
import { ProfileHeader } from "../components/ProfileHeader";
import { ActiveTabSwitch } from "../components/ActiveTabSwitch";
import { ChatsList } from "../components/ChatsList";
import { ContactsList } from "../components/ContactsList";
import { ChatContainer } from "../components/ChatContainer";
import { NoConversationPlaceholder } from "../components/NoConversationPlaceholder";

function ChatPage() {
  // const {logout} = useAuthStore();
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimator>
        {/* LEFT SIDE */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactsList />}
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimator>
    </div>
  );
}

export default ChatPage;
