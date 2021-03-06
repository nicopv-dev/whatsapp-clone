import { ISidebarProps } from "../../types";
import SidebarChats from "./SidebarChats";
import SidebarHeader from "./SidebarHeader";

export default function Sidebar({
  chatSelected,
  chats,
  onChangeSelectedChat,
  onChangeUpdateMessagesSelectedChat,
}: ISidebarProps) {
  return (
    <>
      <SidebarHeader />
      {/* <SidebarSearch /> */}
      <SidebarChats
        chatSelected={chatSelected}
        chats={chats}
        onChangeSelectedChat={onChangeSelectedChat}
        onChangeUpdateMessagesSelectedChat={onChangeUpdateMessagesSelectedChat}
      />
    </>
  );
}
