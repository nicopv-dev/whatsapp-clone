import { useEffect, useState } from "react";
import {
  IoUnlinkOutline,
  IoHappyOutline,
  IoMic,
  IoSend,
} from "react-icons/io5";
import { IChat, IMessage, IUser } from "../../../types";
import { useSelector } from "react-redux";
import { socket } from "../../../config/socket";

interface IChatSendMessageProps {
  chat: IChat;
}

export default function ChatSendMessage({ chat }: IChatSendMessageProps) {
  const [inputMessage, setInputMessage] = useState<string>("");
  const user: IUser = useSelector((state) => state.user);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (inputMessage !== "") {
      const messageData = {
        message: inputMessage,
        chatId: chat._id,
        sender: user._id,
        createdAt: Date.now(),
      };
      await socket.emit("new_message", messageData);
      setInputMessage("");
    }
  };

  return (
    <form className="bg-gray flex items-center justify-between py-2 px-6 gap-3">
      <div className="flex items-center gap-4">
        <button>
          <IoHappyOutline className="text-dark w-7 h-7" />
        </button>
        <button>
          <IoUnlinkOutline className="text-dark w-7 h-7" />
        </button>
      </div>
      <input
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        type="text"
        placeholder="Escribe un mensaje aqui"
        className="grow py-2 px-4 text-md focus:outline-none rounded-lg"
      />
      {inputMessage.length > 0 ? (
        <button onClick={sendMessage}>
          <IoSend className="text-dark w-7 h-7" />
        </button>
      ) : (
        <button>
          <IoMic className="text-dark w-7 h-7" />
        </button>
      )}
    </form>
  );
}
