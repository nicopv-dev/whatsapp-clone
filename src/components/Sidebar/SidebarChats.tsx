import {
  findChatTitle,
  findLastMessage,
  findMyAvatarUrl,
} from "../../utils/methods";
import { IUser, IChat, IMessage, ISidebarProps } from "../../types";
import { useSelector } from "react-redux";
import moment from "moment";
import { socket } from "../../config/socket";
import { useState, useEffect, FunctionComponent } from "react";

interface IChatItemProps {
  chat: IChat;
  user: IUser;
  onChangeSelectedChat(chat: IChat): void;
  onChangeUpdateMessagesSelectedChat(messages: IMessage): void;
}

export default function SidebarChats({
  chats,
  onChangeSelectedChat,
  onChangeUpdateMessagesSelectedChat,
}: ISidebarProps) {
  const user: IUser = useSelector((state) => state.user);

  return (
    <div className="flex-1 flex flex-col w-full h-full overflow-y-auto">
      {chats.length > 0 ? (
        chats.map((chat, index) => (
          <ChatItem
            chat={chat}
            user={user}
            onChangeSelectedChat={onChangeSelectedChat}
            onChangeUpdateMessagesSelectedChat={
              onChangeUpdateMessagesSelectedChat
            }
          />
        ))
      ) : (
        <p className="text-center">Sin chats..</p>
      )}
    </div>
  );
}

const ChatItem: FunctionComponent<IChatItemProps> = ({
  chat,
  user,
  onChangeSelectedChat,
  onChangeUpdateMessagesSelectedChat,
}) => {
  const [chatTitle, seChatTitle] = useState<string>("");
  const [lastMessage, setLastMessage] = useState<IMessage>({});

  const joinChat = (chat: IChat) => {
    onChangeSelectedChat(chat);
    onChangeUpdateMessagesSelectedChat(chat.messages);
    socket.emit("join_chat", chat._id);
  };

  useEffect(() => {
    seChatTitle(findChatTitle(chat, user));
    setLastMessage(findLastMessage(chat));
  }, [chat]);

  return (
    <div
      onClick={() => joinChat(chat)}
      className="flex items-center py-2 px-5 bg-light hover:cursor-pointer transition duration-200 hover:bg-gray"
    >
      {/* chat image */}
      <div className="w-12">
        <img
          alt={chat._id}
          src={findMyAvatarUrl(chat.members, user)}
          className="w-full aspect-1 object-cover rounded-full"
        />
      </div>
      {/* chat info */}
      <div className="w-full flex flex-col justify-between grow ml-4">
        {/* chat title */}
        <div className="flex justify-between">
          <h2>{chatTitle}</h2>
          <p className="text-xs">
            {moment(lastMessage.createdAt).format("h:mm a")}
          </p>
        </div>
        {/* chat last message */}
        <span className="text-sm truncate whitespace-nowrap overflow-hidden w-60">
          {lastMessage.text}
        </span>
      </div>
    </div>
  );
};
