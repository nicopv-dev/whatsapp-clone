import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IChat, IConnectedUser, IMessage, IUser } from "../../types";
import ChatContent from "./components/ChatContent";
import ChatHeader from "./components/ChatHeader";
import ChatSendMessage from "./components/ChatSendMessage";
import socket from "../../config/socket";
import ChatSearchMessage from "./components/ChatSearchMessage";
import { findUserReceiver } from "../../utils/methods";
import { selectUser } from "../../features/userSlice";

interface IChatProps {
  chat: IChat;
  onChangeUpdateChats: () => void;
  messages: IMessage[];
  onChangeUpdateMessages: (newMessage: IMessage) => void;
  connectedUsers: IConnectedUser[];
}

export default function Chat({
  chat,
  onChangeUpdateChats,
  messages,
  onChangeUpdateMessages,
  connectedUsers,
}: IChatProps) {
  const [userReceiver, setUserReceiver] = useState<IUser>({
    _id: "",
    avatarUrl: "",
    email: "",
    name: "",
    isLoggedIn: false,
  });
  const user = useSelector(selectUser);
  const [openSearchMessage, setOpenSearchMessage] = useState<boolean>(false);

  const onChangeOpenSearchMessage = (): void => {
    setOpenSearchMessage(!openSearchMessage);
  };

  // find info receiver user
  useEffect(() => {
    setUserReceiver(findUserReceiver(chat, user));
  }, [chat, user]);

  // listening for new message
  useEffect(() => {
    socket.on("receive_message", async (data) => {
      if (data.chatId === chat._id) {
        const newMessage: IMessage = {
          _id: "",
          text: data.message,
          createdAt: data.createdAt,
          sender: data.sender,
          chat: data.chatId,
        };

        onChangeUpdateMessages(newMessage);
      }
    });
  }, [socket, chat]);

  return (
    <div className="h-full flex">
      <div
        className={`${
          openSearchMessage ? "w-3/5" : "w-full"
        } flex flex-col justify-between transition-all duration-300`}
      >
        <ChatHeader
          userReceiver={userReceiver}
          onChangeOpenSearchMessage={onChangeOpenSearchMessage}
          connectedUsers={connectedUsers}
        />
        <ChatContent messages={messages} />
        <ChatSendMessage
          chatSelected={chat}
          onChangeUpdateChats={onChangeUpdateChats}
        />
      </div>

      {openSearchMessage && (
        <ChatSearchMessage
          onChangeOpenSearchMessage={onChangeOpenSearchMessage}
          messages={messages}
        />
      )}
    </div>
  );
}
