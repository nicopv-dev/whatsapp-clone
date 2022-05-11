import { IChat, IMessage, IUser } from "../types";
import moment from "moment";

export const formatDate: string = (createdAt: string) => {
  return moment(createdAt).format("h:mm a");
};

// find receiver User
export const findUserReceiver: IUser = (chat: IChat, user: IUser) => {
  return chat.members.find((member: IUser) => member._id !== user._id);
};

// find last chat message
export const findLastMessage: IMessage = (chat: IChat) => {
  return chat.messages.slice(-1).pop();
};

export const findMyAvatarUrl: string = (members: IUser[], user: IUser) => {
  return members.find((member) => member._id !== user._id)?.avatarUrl;
};
