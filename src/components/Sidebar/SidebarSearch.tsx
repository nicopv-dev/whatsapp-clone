import { useMemo, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import {
  AutocompleteCollection,
  AutocompleteCollectionItemsArray,
  BaseItem,
  createAutocomplete,
} from "@algolia/autocomplete-core";

interface IAutocompleteItem {
  name: string;
  email: string;
  avatarUrl: string;
}

interface IUserSearch {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

function AutocompleteItem({ name, email, avatarUrl }: IAutocompleteItem) {
  return (
    <li className="w-full flex items-center gap-3 py-2 px-1 hover:cursor-pointer bg-light transition duration-200 ease-out hover:bg-gray">
      <img
        alt=""
        src={
          avatarUrl ||
          "https://avatars0.githubusercontent.com/u/12097?s=460&v=4"
        }
        className="w-10 h-10 object-cover aspect-1 rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-base">{email}</p>
        <span className="text-sm">{name}</span>
      </div>
    </li>
  );
}

interface IAutocompleteState {
  collections: Array<AutocompleteCollection<BaseItem>>;
  isOpen: boolean;
}

export default function SidebarSearch() {
  const [autocompleteState, setAutocompleteState] =
    useState<IAutocompleteState>({
      collections: [],
      isOpen: false,
    });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "users-whatsapp-api",
            getItems: ({ query }) => {
              if (!!query) {
                return fetch(
                  `http://localhost:8000/api/search?q=${query}`
                ).then((res) => res.json());
              }
            },
          },
        ],
      }),
    []
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: formRef.current,
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <form className="bg-light p-3" {...formProps}>
      {/* search bar */}
      <div className="relative bg-gray flex items-center py-1 px-4 rounded-md">
        <IoSearchSharp className="text-dark" />
        <input
          type="text"
          placeholder="Buscar un chat o inicia uno nuevo"
          className="bg-gray grow py-1 px-2 text-sm focus:outline-none"
          {...inputProps}
        />

        {autocompleteState.isOpen && (
          <div
            className="absolute top-12 left-0 bg-light rounded-md w-full"
            ref={panelRef}
            {...autocomplete.getPanelProps()}
          >
            {autocompleteState.collections.map(
              (
                collection: AutocompleteCollectionItemsArray<IUserSearch>,
                index: number
              ) => {
                const { items } = collection;

                return (
                  <section key={`section-${index}`}>
                    {items.length > 0 && (
                      <ul {...autocomplete.getListProps()}>
                        {items.map((item) => (
                          <AutocompleteItem key={item._id} {...item} />
                        ))}
                      </ul>
                    )}
                  </section>
                );
              }
            )}
          </div>
        )}
      </div>
    </form>
  );
}
