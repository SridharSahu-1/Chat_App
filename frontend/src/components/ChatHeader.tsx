// import { X } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";
// import { useChatStore } from "../store/useChatStore";

// const ChatHeader = () => {
//   const { selectedUser, setSelectedUser } = useChatStore();
//   const { onlineUsers } = useAuthStore();

//   return (
//     <div className="p-2.5 border-b border-base-300">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {/* Avatar */}
//           <div className="avatar">
//             <div className="size-10 rounded-full relative">
//               <img src={selectedUser?.profilePic || "/avatar.png"} alt={selectedUser?.fullName} />
//             </div>
//           </div>

//           {/* User info */}
//           <div>
//             <h3 className="font-medium">{selectedUser.fullName}</h3>
//             <p className="text-sm text-base-content/70">
//               {onlineUsers?.includes(selectedUser._id) ? "Online" : "Offline"}
//             </p>
//           </div>
//         </div>

//         {/* Close button */}
//         <button onClick={() => setSelectedUser(null)}>
//           <X />
//         </button>
//       </div>
//     </div>
//   );
// };
// export default ChatHeader;

import { X, Phone, Video, MoreHorizontal, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers?.includes(selectedUser._id);

  return (
    <div className="p-4 border-b border-border-subtle bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with Status */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-muted overflow-hidden border border-border-subtle">
              {selectedUser.profilePic ? (
                <img
                  src={selectedUser.profilePic}
                  alt={selectedUser.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              )}
            </div>
            {isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 ring-2 ring-zinc-900 rounded-full border-2 border-card text-green-500"></div>
            )}
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-semibold text-text-primary">
              {selectedUser.fullName}
            </h3>
            <p className="text-sm text-text-muted">
              {isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex items-center gap-1">
          <button className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
            <Phone className="w-4 h-4 text-text-secondary" />
          </button>

          <button className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
            <Video className="w-4 h-4 text-text-secondary" />
          </button>

          <button className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
            <MoreHorizontal className="w-4 h-4 text-text-secondary" />
          </button>

          <div className="w-px h-6 bg-border-subtle mx-2"></div>

          <button
            onClick={() => setSelectedUser(null)}
            className="w-9 h-9 rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ChatHeader;
