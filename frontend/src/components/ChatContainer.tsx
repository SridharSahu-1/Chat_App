import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useCallback, useEffect, useRef } from "react";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import ChatBubble from "./ChatBubble";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    currentPage,
    totalPages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Load initial messages and subscribe
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id, 1);
      subscribeToMessages();
    }
    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // Infinite scroll: load more on scroll to top
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    if (el.scrollTop < 50 && !isMessagesLoading && currentPage < totalPages) {
      getMessages(selectedUser._id, currentPage + 1);
    }
  }, [currentPage, totalPages, isMessagesLoading, selectedUser, getMessages]);

  // Attach scroll listener
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col h-full">
        <ChatHeader />
        <div className="flex-1 overflow-auto p-4">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <ChatHeader />

      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        ref={scrollContainerRef}
      >
        {messages.map((message) => (
          <div key={message._id} className="flex items-end space-x-2">
            {/* Avatar and timestamp */}
            <div
              className={`chat-image avatar ${
                message.senderId === authUser._id ? "order-2" : "order-1"
              }`}
            >
              <div className="w-10 h-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <time className="text-xs opacity-50">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <ChatBubble
                message={message}
                currentLang={authUser.preferredLanguage}
                isOwn={message.senderId === authUser?._id}
              />
              {message.image && (
                <div
                  className={`mt-2 ${
                    message.senderId === authUser._id
                      ? "flex justify-end mr-2"
                      : "flex justify-start ml-2"
                  }`}
                >
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-xs rounded-md"
                    onLoad={() =>
                      messageEndRef.current?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  />
                </div>
              )}
              {/* {message.text && <p className="mt-1">{message.text}</p>} */}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="border-t p-4">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
