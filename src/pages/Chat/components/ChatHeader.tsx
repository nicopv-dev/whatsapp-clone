import { IoSearchSharp, IoEllipsisVertical } from "react-icons/io5";
import { IUser } from "../../../types";

interface IChatHeaderProps {
  user: IUser;
  onChangeOpenSearchMessage: () => void;
}

export default function ChatHeader({
  user,
  onChangeOpenSearchMessage,
}: IChatHeaderProps) {
  const openSearchMessage = () => {
    onChangeOpenSearchMessage();
  };

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
        <h3>{user.name}</h3>
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
