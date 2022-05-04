import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { IChat, IMessage, IUser } from "../../types";
import ChatContent from "./components/ChatContent";
import ChatHeader from "./components/ChatHeader";
import ChatSendMessage from "./components/ChatSendMessage";
import { socket } from "../../config/socket";
import axios from "../../config/axios";
import ChatSearchMessage from "./components/ChatSearchMessage";

interface IChatProps {
  chat: IChat;
  onChangeUpdateChats: () => void;
  messages: IMessage[];
  onChangeUpdateMessages: (newMessage: IMessage) => void;
}

export default function Chat({
  chat,
  onChangeUpdateChats,
  messages,
  onChangeUpdateMessages,
}: IChatProps) {
  const [chatTitle, setChatTitle] = useState<string>("");
  const user = useSelector((state) => state.user as IUser);
  const [openSearchMessage, setOpenSearchMessage] = useState<boolean>(true);

  const findChatTitle = (): void => {
    setChatTitle(chat.members.find((member) => member._id !== user._id)?.name);
  };

  const onChangeOpenSearchMessage = (): void => {
    setOpenSearchMessage(!openSearchMessage);
  };

  useEffect(() => {
    findChatTitle();
  }, [chat]);

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

        // save message to database
        const response = await axios.post("/messages/new", newMessage);
        if (response.status === 201) {
          onChangeUpdateChats();
        }
      }
    });
  }, [socket]);

  return (
    <div className="h-full flex">
      <div
        className={`${
          openSearchMessage ? "w-3/5" : "w-full"
        } flex flex-col justify-between transition-all duration-300`}
      >
        <ChatHeader
          avatarUrl="https://avatars0.githubusercontent.com/u/12097?s=460&v=4"
          name={chatTitle}
          onChangeOpenSearchMessage={onChangeOpenSearchMessage}
        />
        <ChatContent chat={chat} messages={messages} />
        <ChatSendMessage chat={chat} />
      </div>

      {openSearchMessage && (
        <ChatSearchMessage
          onChangeOpenSearchMessage={onChangeOpenSearchMessage}
          chat={chat}
          messages={messages}
        />
      )}
    </div>
  );
}
