import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IChat, IMessage, IUser } from "../../../types";
import moment from "moment";

interface IChatContentProps {
  chat: IChat;
  messages: IMessage[];
}

interface IMessageProps {
  chat: IMessage;
  user: IUser;
}

const ChatContent: FunctionComponent<IChatContentProps> = ({
  chat,
  messages,
}) => {
  const user: IUser = useSelector((state) => state.user);

  return (
    <div className="flex-1 bg-chat bg-center bg-no-repeat bg-cover overflow-y-auto py-4 px-[80px] flex flex-col gap-2">
      {messages.map((item, index) => (
        <Message key={index} message={item} user={user} />
      ))}
    </div>
  );
};

const Message: FunctionComponent<IMessageProps> = ({ message, user }) => {
  const [isMyMessage, setIsMyMessage] = useState<boolean>(false);

  const foundMyMessage = useCallback(() => {
    return user._id === message.sender ? true : false;
  }, []);

  useEffect(() => {
    setIsMyMessage(foundMyMessage());
  }, [message]);

  return (
    <p
      className={`relative flex gap-4 text-sm py-2 px-4 w-fit rounded-lg  shadow-sm ${
        isMyMessage ? "ml-auto bg-message" : "bg-light"
      }`}
    >
      {message.text}
      <span className="text-[10px] relative -bottom-2">
        {/* moment(message.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a") */}
        {moment(message.createdAt).format("h:mm a")}
      </span>
    </p>
  );
};

export default ChatContent;
