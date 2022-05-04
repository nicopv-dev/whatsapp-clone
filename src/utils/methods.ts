import { IChat, IMessage, IUser } from "../types";
import moment from "moment";

export const formatDate: string = (createdAt: string) => {
  return moment(createdAt).format("h:mm a");
};

export const findChatTitle: string = (chat: IChat, user: IUser) =>
  chat.members.find((member) => member._id !== user._id)?.name;

export const findLastMessage: IMessage = (chat: IChat) => {
  return chat.messages.slice(-1).pop();
};

export const findDateLastMessage: string = (chat: IChat) => {
  return chat.messages.slice(-1).pop()?.createdAt;
};

export const findMyAvatarUrl: string = (members: IUser[], user: IUser) => {
  return members.find((member) => member._id !== user._id)?.avatarUrl;
};
