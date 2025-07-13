// import { useAuthStore } from "../store/useAuthStore";
// import { useChatStore } from "../store/useChatStore";
// import { useCallback, useEffect, useRef } from "react";
// import MessageSkeleton from "./skeletons/MessageSkeleton";
// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import ChatBubble from "./ChatBubble";
// import { formatMessageTime } from "../lib/utils";

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//     currentPage,
//     totalPages,
//   } = useChatStore();
//   const { authUser } = useAuthStore();
//   const messageEndRef = useRef(null);

//   const containerRef = useRef<HTMLDivElement>(null);

//   // load first page
//   useEffect(() => {
//     if (selectedUser) getMessages(selectedUser._id, 1);
//     subscribeToMessages();
//     return () => unsubscribeFromMessages();
//   }, [selectedUser?._id]);

//   // infinite scroll: on scroll to top, load more if available
//   const handleScroll = useCallback(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     if (el.scrollTop < 50 && !isMessagesLoading && currentPage < totalPages) {
//       // fetch next page
//       getMessages(selectedUser._id, currentPage + 1);
//     }
//   }, [currentPage, totalPages, isMessagesLoading, selectedUser]);

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   useEffect(() => {
//     getMessages(selectedUser._id);

//     subscribeToMessages();

//     return () => unsubscribeFromMessages();
//   }, [
//     selectedUser._id,
//     getMessages,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   ]);

//   useEffect(() => {
//     if (messageEndRef.current && messages) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col overflow-auto">
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col overflow-auto" ref={containerRef}>
//       <ChatHeader />

//       <div className="flex-1 p-4 space-y-4">
//         <div className="overflow-y-auto">
//           {messages.map((message) => (
//             <>
//               <ChatBubble
//                 key={message._id}
//                 message={message}
//                 currentLang={authUser.preferredLanguage}
//                 isOwn={message.senderId === authUser?._id}
//               />
//               <div
//                 key={message._id}
//                 className={`chat ${
//                   message.senderId === authUser._id ? "chat-end" : "chat-start"
//                 }`}
//                 ref={messageEndRef}
//               >
//                 <div className=" chat-image avatar">
//                   <div className="size-10 rounded-full border">
//                     <img
//                       src={
//                         message.senderId === authUser._id
//                           ? authUser.profilePic || "/avatar.png"
//                           : selectedUser.profilePic || "/avatar.png"
//                       }
//                       alt="profile pic"
//                     />
//                   </div>
//                 </div>
//                 <div className="chat-header mb-1">
//                   <time className="text-xs opacity-50 ml-1">
//                     {formatMessageTime(message.createdAt)}
//                   </time>
//                 </div>
//                 <div className="chat-bubble flex flex-col">
//                   {message.image && (
//                     <img
//                       src={message.image}
//                       alt="Attachment"
//                       className="sm:max-w-[200px] rounded-md mb-2"
//                     />
//                   )}
//                   {message.text && <p>{message.text}</p>}
//                 </div>
//               </div>
//             </>
//           ))}
//         </div>
//         <MessageInput />
//       </div>
//     </div>
//   );
// };

// export default ChatContainer;

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
