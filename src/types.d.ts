export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  isLoggedIn: boolean;
}

export interface IChat {
  _id: string;
  members: IUser[];
  typeChat: string;
  createdAt: string;
  messages: IMessage[];
}

export interface IMessage {
  _id: number;
  text: string;
  sender: string;
  chat: string;
  createdAt: string;
}

// Interface Components Props
export interface ISidebarProps {
  chatSelected?: IChat;
  chats: IChat[];
  onChangeSelectedChat(chat: IChat): void;
  onChangeUpdateMessagesSelectedChat(messages: IMessage): void;
}
