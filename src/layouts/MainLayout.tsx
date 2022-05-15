import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Chat from "../pages/Chat";
import Home from "../pages/Home";
import { IChat, IMessage, IConnectedUser } from "../types";
import axios from "../config/axios";
import { selectUser } from "../features/userSlice";
import { socket } from "../config/socket";

export default function MainLayout() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState<IChat[]>([]);
  const [chatSelected, setChatSelected] = useState<IChat | null>(null);
  const [updateChats, setUpdateChats] = useState(false);
  const [messagesSelectedChat, setMessagesSelectedChat] = useState<IMessage[]>(
    []
  );
  const [connectedUsers, setConnectedUsers] = useState<IConnectedUser[]>([]);

  // set chat from SideBarChats
  const onChangeSelectedChat = (chat: IChat): void => {
    setChatSelected(chat);
  };
  // update chat database
  const onChangeUpdateChats = (): void => {
    setUpdateChats(true);
  };
  // set messages from ChatContent
  const onChangeUpdateMessagesSelectedChat = (messages: IMessage[]): void => {
    setMessagesSelectedChat(messages);
  };
  // update local messages
  const onChangeUpdateMessages = (newMessage: IMessage): void => {
    setMessagesSelectedChat((messages) => [...messages, newMessage]);
  };
  // get user chat from database
  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`/users/${user._id}/chats`);
      setChats(data as IChat[]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChats();
    setUpdateChats(false);
  }, [updateChats]);

  // listening for new connections...
  useEffect(() => {
    socket.on("users", async (data) => {
      setConnectedUsers(data);
    });
  }, [socket]);

  return (
    <div className="grid place-items-center h-screen">
      <div className="min-h-screen sm:min-h-[95vh] bg-light w-full md:w-[90%] flex shadow-2xl">
        {/* Sidebar */}
        <div className="max-h-[95vh] flex-[0.3_1_0%] hidden md:flex flex-col">
          <Sidebar
            chatSelected={chatSelected}
            chats={chats}
            onChangeSelectedChat={onChangeSelectedChat}
            onChangeUpdateMessagesSelectedChat={
              onChangeUpdateMessagesSelectedChat
            }
          />
        </div>
        {/* Chats / Home */}
        <div className="max-h-screen sm:max-h-[95vh] flex-1 md:flex-[0.7_1_0%] bg-grayLight">
          {!chatSelected ? (
            <Home />
          ) : (
            <Chat
              chat={chatSelected}
              onChangeUpdateChats={onChangeUpdateChats}
              messages={messagesSelectedChat}
              onChangeUpdateMessages={onChangeUpdateMessages}
              connectedUsers={connectedUsers}
            />
          )}
        </div>
      </div>
    </div>
  );
}
