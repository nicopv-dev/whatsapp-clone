import { useEffect, useState } from "react";
import { IoSearchSharp, IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
import { IConnectedUser, IMessage, IUser } from "../../../types";
import socket from "../../../config/socket";
import { selectUser } from "../../../features/userSlice";

interface IChatHeaderProps {
  userReceiver: IUser;
  onChangeOpenSearchMessage: () => void;
  connectedUsers: IConnectedUser[];
}

export default function ChatHeader({
  userReceiver,
  onChangeOpenSearchMessage,
  connectedUsers,
}: IChatHeaderProps) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const user = useSelector(selectUser);

  const openSearchMessage = () => {
    onChangeOpenSearchMessage();
  };

  // verify user is connected
  useEffect(() => {
    setIsConnected(
      connectedUsers.some(
        (item: IConnectedUser) => item.userId === userReceiver._id
      )
    );
  }, [userReceiver, connectedUsers]);

  // listening if user is writing a new message
  useEffect(() => {
    socket.on("writing_message", (data: IMessage) => {
      if (data.sender !== user._id) {
        setIsWriting(true);
      }
    });

    socket.on("stop_writing_message", (data: IMessage) => {
      if (data._id !== user._id) {
        setIsWriting(false);
      }
    });

    return () => {
      socket.off("writing_message");
      socket.off("stop_writing_message");
    };
  }, [socket]);

  return (
    <header className="bg-gray flex items-center justify-between py-2 px-6">
      {/* chat info */}
      <div className="flex items-center gap-3">
        <div className="w-10">
          <img
            src={
              userReceiver.avatarUrl ||
              "https://avatars0.githubusercontent.com/u/12097?s=460&v=4"
            }
            alt="Avatar User"
            className="w-full object-cover aspect-1 rounded-full"
          />
        </div>
        <div className="">
          <h3>{userReceiver.name}</h3>
          {isConnected && (
            <p className="text-[10px] text-dark">
              {isWriting ? "Escribiendo..." : "Conectado"}
            </p>
          )}
        </div>
      </div>

      {/* chat icons */}
      <div className="flex gap-4">
        <button onClick={openSearchMessage} type="button">
          <IoSearchSharp className="text-dark w-5 h-5" />
        </button>
        <IoEllipsisVertical className="text-dark w-5 h-5" />
      </div>
    </header>
  );
}
