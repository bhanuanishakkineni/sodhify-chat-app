// import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { BorderAnimator } from "../components/BorderAnimator";

function ChatPage() {
  // const {logout} = useAuthStore();
  const {activeTab} = useChatStore();
  return (
  <div className="relative w-full max-w-6xl h-[800px]">
    <BorderAnimator>
      {/* LEFT SIDE */}
      <ProfileHeader />
      <ActiveTabSwitch />
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {activeTab === "chats"? <ChatsList />: <ContactsList />}
      </div>
    </BorderAnimator>
    
  </div>
  );
}

export default ChatPage;
