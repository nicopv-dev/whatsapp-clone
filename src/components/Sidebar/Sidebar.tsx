import { ISidebarProps, IChat, IMessage } from "../../types";
import SidebarChats from "./SidebarChats";
import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";

export default function Sidebar({
  chats,
  onChangeSelectedChat,
  onChangeUpdateMessagesSelectedChat,
}: ISidebarProps) {
  return (
    <>
      <SidebarHeader />
      <SidebarSearch />
      <SidebarChats
        chats={chats}
        onChangeSelectedChat={onChangeSelectedChat}
        onChangeUpdateMessagesSelectedChat={onChangeUpdateMessagesSelectedChat}
      />
    </>
  );
}
