import React, { useState } from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { IChat, IMessage } from "../../../types";

interface IChatSearchMessageProps {
  onChangeOpenSearchMessage: () => void;
  chat: IChat;
  messages: IMessage[];
}

export default function ChatSearchMessage({
  onChangeOpenSearchMessage,
  chat,
  messages,
}: IChatSearchMessageProps) {
  const [inputSearch, setInputSearch] = useState<string>("");
  const [results, setResults] = useState<IMessage[]>([]);

  const closeSearchMessage = (): void => {
    onChangeOpenSearchMessage();
    setInputSearch("");
    setResults([]);
  };

  const searchMessages = (e: React.FormEvent<HTMLInputElement>): void => {
    setInputSearch(e.target.value);
    const newResults = messages.filter(
      (message) => message.text === e.target.value
    );
    setResults(newResults);
  };

  return (
    <div className="grow bg-light">
      <header className="bg-gray py-4 px-6 flex items-center gap-5">
        <button onClick={closeSearchMessage}>
          <IoClose className="w-6 h-6 text-dark" />
        </button>
        <h4 className="ml-2">Buscar mensaje</h4>
      </header>
      <div className="bg-light py-2 px-4">
        <form className="flex items-center gap-4 py-1 px-4 bg-gray rounded-md">
          <IoSearchSharp className="w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-gray grow py-1 px-4 text-sm focus:outline-none"
            value={inputSearch}
            onChange={searchMessages}
          />
        </form>
      </div>

      {inputSearch ? (
        <div className="h-full flex flex-col py-2 px-4">
          {results.map((item, index) => (
            <section key={index}>{item.text}</section>
          ))}
        </div>
      ) : (
        <p>Buscar mensaje en el Chat</p>
      )}
    </div>
  );
}
