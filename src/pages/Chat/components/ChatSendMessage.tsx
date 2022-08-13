import React, { useState } from "react";
import {
  IoUnlinkOutline,
  IoHappyOutline,
  IoMic,
  IoSend,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import { IChat } from "../../../types";
import socket from "../../../config/socket";
import { selectUser } from "../../../features/userSlice";
import axios from "../../../config/axios";

interface IChatSendMessageProps {
  chatSelected: IChat;
  onChangeUpdateChats: () => void;
}

interface IEmoji {
  emoji: string;
}

export default function ChatSendMessage({
  chatSelected,
  onChangeUpdateChats,
}: IChatSendMessageProps) {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState<boolean>(false);
  const user = useSelector(selectUser);

  const sendMessage = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();

    if (inputMessage !== "") {
      const messageData = {
        message: inputMessage,
        chatId: chatSelected._id,
        sender: user._id,
        createdAt: Date.now(),
      };
      await socket.emit("new_message", messageData);
      setInputMessage("");
      // save message to database

      const response = await axios.post("/api/messages/new", {
        text: inputMessage,
        sender: user._id,
        chat: chatSelected._id,
      });
      if (response.status === 201) {
        onChangeUpdateChats();
        await socket.emit("stop_writing_message", messageData);
      }
    }
  };

  const onChangeInputMessage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setInputMessage(e.target.value);
    const messageData = {
      message: inputMessage,
      chatId: chatSelected._id,
      sender: user._id,
      createdAt: Date.now(),
    };

    if (e.target.value === "") {
      await socket.emit("stop_writing_message", messageData);
    } else {
      await socket.emit("writing_message", messageData);
    }
  };

  const openEmojiPicket = () => {
    setIsOpenEmojiPicker(!isOpenEmojiPicker);
  };

  const onEmojiClick = (e: React.MouseEvent, emojiObject: IEmoji) => {
    setInputMessage(inputMessage + emojiObject.emoji);
  };

  return (
    <div className="bg-gray flex items-center justify-between py-2 px-6 gap-3 relative">
      {isOpenEmojiPicker && (
        <div className="absolute bottom-14">
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
      <div className="flex items-center gap-4">
        <button onClick={openEmojiPicket} type="button">
          <IoHappyOutline className="text-dark w-7 h-7 transtion duration-200 scale-100 hover:scale-110" />
        </button>
        <button type="button">
          <IoUnlinkOutline className="text-dark w-7 h-7 transtion duration-200 scale-100 hover:scale-110" />
        </button>
      </div>
      <form className="w-full flex items-center justify-between gap-2">
        <input
          value={inputMessage}
          onChange={onChangeInputMessage}
          type="text"
          placeholder="Escribe un mensaje aqui"
          className="grow py-2 px-4 text-md focus:outline-none rounded-lg"
        />
        {inputMessage.length > 0 ? (
          <button type="button" onClick={sendMessage}>
            <IoSend className="text-dark w-7 h-7" />
          </button>
        ) : (
          <button type="button">
            <IoMic className="text-dark w-7 h-7" />
          </button>
        )}
      </form>
    </div>
  );
}
