import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../pages/Chat";
import Home from "../pages/Home";
import { chat, IChat, IMessage, IUser } from "../types";
import axios from "../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function MainLayout() {
  const user: IUser = useSelector(selectUser);
  const [chats, setChats] = useState<IChat[]>([]);
  const [chatSelected, setChatSelected] = useState<IChat | null>(null);
  const [updateChats, setUpdateChats] = useState(false);
  const [messagesSelectedChat, setMessagesSelectedChat] = useState<IMessage[]>(
    []
  );

  // set chat from SideBarChats
  const onChangeSelectedChat = (chat: chat): void => {
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

  return (
    <div className="grid place-items-center h-screen">
      <div className="min-h-[95vh] bg-light w-full md:w-[90%] flex shadow-2xl">
        {/* Sidebar */}
        <div className="max-h-[95vh] flex-[0.3_1_0%] hidden md:flex flex-col">
          <Sidebar
            chats={chats}
            onChangeSelectedChat={onChangeSelectedChat}
            onChangeUpdateMessagesSelectedChat={
              onChangeUpdateMessagesSelectedChat
            }
          />
        </div>
        {/* Chats / Home */}
        <div className="max-h-[95vh] flex-1 md:flex-[0.7_1_0%] bg-grayLight">
          {!chatSelected ? (
            <Home />
          ) : (
            <Chat
              chat={chatSelected}
              onChangeUpdateChats={onChangeUpdateChats}
              messages={messagesSelectedChat}
              onChangeUpdateMessages={onChangeUpdateMessages}
            />
          )}
        </div>
      </div>
    </div>
  );
}
