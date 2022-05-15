import { useEffect, useState } from "react";
import { IoSearchSharp, IoEllipsisVertical } from "react-icons/io5";
import { IChat, IConnectedUser, IUser } from "../../../types";
import { socket } from "../../../config/socket";

interface IChatHeaderProps {
  chat: IChat;
  user: IUser;
  onChangeOpenSearchMessage: () => void;
  connectedUsers: IConnectedUser[];
}

export default function ChatHeader({
  chat,
  user,
  onChangeOpenSearchMessage,
  connectedUsers,
}: IChatHeaderProps) {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const openSearchMessage = () => {
    onChangeOpenSearchMessage();
  };

  // verify user is connected
  useEffect(() => {
    setIsConnected(
      connectedUsers.some((item: IConnectedUser) => item.userId === user._id)
    );
  }, [user, connectedUsers]);

  return (
    <header className="bg-gray flex items-center justify-between py-2 px-6">
      {/* chat info */}
      <div className="flex items-center gap-3">
        <div className="w-10">
          <img
            src={
              user.avatarUrl ||
              "https://avatars0.githubusercontent.com/u/12097?s=460&v=4"
            }
            alt="Avatar User"
            className="w-full object-cover aspect-1 rounded-full"
          />
        </div>
        <div className="">
          <h3>{user.name}</h3>
          {isConnected && <p className="text-[10px] text-primary">Conectado</p>}
        </div>
      </div>

      {/* chat icons */}
      <div className="flex gap-4">
        <button onClick={openSearchMessage}>
          <IoSearchSharp className="text-dark w-5 h-5" />
        </button>
        <IoEllipsisVertical className="text-dark w-5 h-5" />
      </div>
    </header>
  );
}
