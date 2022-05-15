import {
  findUserReceiver,
  findLastMessage,
  findMyAvatarUrl,
} from "../../utils/methods";
import { IUser, IChat, IMessage, ISidebarProps } from "../../types";
import { useSelector } from "react-redux";
import moment from "moment";
import { socket } from "../../config/socket";
import { useState, useEffect, FunctionComponent } from "react";
import Spin from "../Spin";

interface IChatItemProps {
  chatSelected: IChat;
  chat: IChat;
  user: IUser;
  onChangeSelectedChat(chat: IChat): void;
  onChangeUpdateMessagesSelectedChat(messages: IMessage): void;
}

export default function SidebarChats({
  chatSelected,
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
            key={index}
            chatSelected={chatSelected}
            chat={chat}
            user={user}
            onChangeSelectedChat={onChangeSelectedChat}
            onChangeUpdateMessagesSelectedChat={
              onChangeUpdateMessagesSelectedChat
            }
          />
        ))
      ) : (
        <p type="button" className="flex items-center justify-center">
          <Spin />
        </p>
      )}
    </div>
  );
}

const ChatItem: FunctionComponent<IChatItemProps> = ({
  chatSelected,
  chat,
  user,
  onChangeSelectedChat,
  onChangeUpdateMessagesSelectedChat,
}) => {
  const [userReceiver, setUserReceiver] = useState<IUser>({});
  const [lastMessage, setLastMessage] = useState<IMessage>({});
  const [chatActive, setChatActive] = useState<boolean>(false);

  const joinChat = (chat: IChat) => {
    onChangeSelectedChat(chat);
    onChangeUpdateMessagesSelectedChat(chat.messages);
    socket.emit("join_chat", chat._id);
  };

  // set UserReceiver / lastMessage every chat
  useEffect(() => {
    setUserReceiver(findUserReceiver(chat, user));
    setLastMessage(findLastMessage(chat));
  }, [chat]);

  useEffect(() => {
    setChatActive(() => (chat._id === chatSelected?._id ? true : false));
  }, [chat, chatSelected]);

  return (
    <div
      onClick={() => joinChat(chat)}
      className={`flex items-center py-2 px-5 ${
        chatActive ? "bg-gray" : "bg-light"
      } hover:cursor-pointer transition duration-200 hover:bg-gray`}
    >
      {/* chat image */}
      <div className="w-12">
        <img
          alt={""}
          src={userReceiver.avatarUrl}
          className="w-full aspect-1 object-cover rounded-full"
        />
      </div>
      {/* chat info */}
      <div className="w-full flex flex-col justify-between grow ml-4">
        {/* chat title */}
        <div className="flex justify-between">
          <h2>{userReceiver.name}</h2>
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
