import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { IMessage, IUser } from "../../../types";
import { selectUser } from "../../../features/userSlice";

interface IChatContentProps {
  messages: IMessage[];
}

interface IMessageProps {
  message: IMessage;
  user: IUser;
}

function Message({ message, user }: IMessageProps) {
  const [isMyMessage, setIsMyMessage] = useState<boolean>(false);

  const foundMyMessage = useCallback(
    () => user._id === message.sender,
    [user, message]
  );

  useEffect(() => {
    setIsMyMessage(foundMyMessage());
  }, [foundMyMessage]);

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
}

export default function ChatContent({ messages }: IChatContentProps) {
  const user = useSelector(selectUser);

  return (
    <div className="flex-1 bg-chat bg-center bg-no-repeat bg-cover overflow-y-auto py-4 px-10 md:px-[80px] flex flex-col gap-2">
      {messages.map((item) => (
        <Message key={item._id} message={item} user={user} />
      ))}
    </div>
  );
}
