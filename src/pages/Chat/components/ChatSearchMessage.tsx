import moment from "moment";
import React, { useState } from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { IMessage } from "../../../types";

interface IChatSearchMessageProps {
  onChangeOpenSearchMessage: () => void;
  messages: IMessage[];
}

interface ISearchItemProps {
  message: IMessage;
}

function SearchItem({ message }: ISearchItemProps) {
  return (
    <section className="bg-light border-b border-b-gray py-2 px-4 hover:cursor-pointer transition duration-200 hover:bg-gray">
      <span className="text-dark text-[10px]">
        {moment(message.createdAt).format("DD/MM/YYYY")}
      </span>
      <p className="text-dark m-0">{message.text}</p>
    </section>
  );
}

export default function ChatSearchMessage({
  onChangeOpenSearchMessage,
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
    const newResults = messages.filter((message) =>
      message.text.toLocaleLowerCase().includes(e.target.value)
    );
    setResults(newResults);
  };

  return (
    <div className="grow bg-light">
      <header className="bg-gray py-4 px-6 flex items-center gap-5">
        <button onClick={closeSearchMessage} type="button">
          <IoClose className="w-6 h-6 text-dark" />
        </button>
        <h4 className="ml-2">Buscar mensaje</h4>
      </header>
      <div
        className={`bg-light py-2 px-4 border-b border-b-gray transition-all duration-300 ${
          inputSearch ? "shadow-sm" : "shadow-none"
        }`}
      >
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
        <div className="h-full flex flex-col pb-2">
          {results.map((item) => (
            <SearchItem key={item._id} message={item} />
          ))}
        </div>
      ) : (
        <p className="text-center font-light my-2">Buscar mensaje en el Chat</p>
      )}
    </div>
  );
}
