import { IChat, ISidebarProps } from "../../types";
import { findChatTitle, findDateLastMessage } from "../../utils/methods";
import { IUser } from "../../types";
import { useSelector } from "react-redux";
import moment from "moment";
import { socket } from "../../config/socket";
import { findMyAvatarUrl } from "../../utils/methods";

export default function SidebarChats({
  chats,
  onChangeSelectedChat,
  onChangeUpdateMessagesSelectedChat,
}: ISidebarProps) {
  const user: IUser = useSelector((state) => state.user);

  const joinChat = (chat: IChat) => {
    onChangeSelectedChat(chat);
    onChangeUpdateMessagesSelectedChat(chat.messages);
    socket.emit("join_chat", chat._id);
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full overflow-y-auto">
      {chats.length > 0 ? (
        chats.map((chat, index) => (
          <div
            key={index}
            onClick={() => joinChat(chat)}
            className="flex items-center py-2 px-5 bg-light hover:cursor-pointer transition duration-200 hover:bg-gray"
          >
            {/* chat image */}
            <div className="w-12">
              <img
                alt={`chat ${index}`}
                src={findMyAvatarUrl(chat.members, user)}
                className="w-full aspect-1 object-cover rounded-full"
              />
            </div>
            {/* chat info */}
            <div className="w-full flex flex-col justify-between grow ml-4">
              {/* chat title */}
              <div className="flex justify-between">
                <h2>{findChatTitle(chat, user)}</h2>
                <p className="text-xs">
                  {moment(findDateLastMessage(chat)).format("h:mm a")}
                </p>
              </div>
              {/* chat last message */}
              <span className="text-sm truncate whitespace-nowrap overflow-hidden w-60">
                hola este es mi ultimo mensaje
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">Sin chats..</p>
      )}
    </div>
  );
}
