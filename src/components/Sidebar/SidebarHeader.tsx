import { IoSync, IoChatboxEllipses, IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { IUser } from "../../types";

export default function SidebarHeader() {
  const user: IUser = useSelector(selectUser);

  const logOut = (): void => {
    window.open(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, "_self");
  };

  return (
    <div className="bg-gray flex justify-between items-center py-2 px-4">
      {/* avatar */}
      <div className="w-10">
        <img
          src={
            user.avatarUrl ||
            "https://avatars0.githubusercontent.com/u/12097?s=460&v=4"
          }
          alt="avatar"
          className="w-full object-cover aspect-1 rounded-full"
        />
      </div>
      {/* icons */}
      <div className="flex items-center gap-8">
        <button onClick={logOut} type="button">
          <IoSync className="text-dark h-6 w-6" />
        </button>
        <IoChatboxEllipses className="text-dark h-6 w-6" />
        <IoEllipsisVertical className="text-dark h-6 w-6" />
      </div>
    </div>
  );
}
