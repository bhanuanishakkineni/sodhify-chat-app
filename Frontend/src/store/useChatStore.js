import { LucideChartNoAxesColumnIncreasing } from "lucide-react";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null, // selected chat
  isContactsLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  getAllContacts: async () => {
    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data.data });
    } catch (err) {
      toast.error("Unable to fetch contacts. Try again by refreshing the page");
      console.error("'Error fetching users", err);
    } finally {
      set({ isContactsLoading: false });
    }
  },
  getChatPartners: async () => {
    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data.data });
    } catch (err) {
      console.error("Error fetching chats", err);
      toast.error("Something went wrong. Try refreshing the page.");
    } finally {
      set({ isContactsLoading: false });
    }
  },
  getMessagesById: async (userId) => {
    set({isMessagesLoading: true});
    try {
        const res = await axiosInstance.get(`/messages/chat/${userId}`);
        set({messages: res.data.data});
    } catch (err) {
        console.log("Error fetching conversation", err);
        toast.error("Try again or refresh the page");
    } finally {
        set({isMessagesLoading: false});
    }
  },
  sendMessage: async(messageData) => {
    const {selectedUser, messages} = get() // creates a snapshot of messages. Here messages is variable
    const {authUser} = useAuthStore.getState();
    const tempId = `temp-${Date.now()}`;
 // Optimistic add
    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };
    // immidietaly update the ui by adding the message
    set({ messages: [...messages, optimisticMessage] }); // This will update the messages state, not the messages variable here.
    try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
        set({messages: messages.concat(res.data.data.message)});
    } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong. Try again");
        set({messages});
    }
  }
}));
