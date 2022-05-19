import moment from "moment";
import { IChat, IMessage, IUser } from "../types";

export const formatDate = (createdAt: string): string =>
  moment(createdAt).format("h:mm a");

// find receiver User
export const findUserReceiver = (chat: IChat, user: IUser): IUser => {
  const receiver: IUser | undefined = chat.members.find(
    (u: IUser) => u._id !== user._id
  );
  if (receiver === undefined) {
    return chat.members[1];
  }
  return receiver;
};

// find last chat message
export const findLastMessage = (chat: IChat): IMessage => {
  const lastMessage = chat.messages[chat.messages.length - 1];
  return lastMessage;
};

export const findMyAvatarUrl = (members: IUser[], user: IUser): string => {
  const result: IUser | undefined = members.find(
    (member: IUser) => member._id !== user._id
  );

  if (result === undefined) {
    return "";
  }

  return result.avatarUrl;
};
