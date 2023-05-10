import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';

type SearchProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
}

const Search: FC<SearchProps> = ({ placeholder, onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');

  // Обработчик изменений в поле
  const inputHandler: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    setInputValue(event.target.value);
  }, []);

  // Обработчик нажатия Enter
  const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(event => {
    if (event.key === 'Enter') {
      onSearch(inputValue);
    }
  }, [onSearch]);

  // Обработчик нажатия кнопки поиска
  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    onSearch(inputValue);
  }, [onSearch]);

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder={placeholder || ''}
          onKeyDown={keyDownHandler}
          onChange={inputHandler}
          className="search__input"
        />
        <button
          type="button"
          onClick={clickHandler}
          className="search__button"
          id="al"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
            className="search__icon"
          >
            <path
              d="M801 948 537 684q-31 26-72.959 40t-86.603 14q-114.6 0-192.519-78Q107 582 107 470t78-190q78-78
            190-78t190 78q78 78 78 190.15 0 43.85-13.5 84.35Q616 595 588 631l266 264-53 53ZM375.5 665q81.75 0
            138.125-56.792Q570 551.417 570 470t-56.287-138.208Q457.426 275 375.588 275q-82.671 0-139.13 56.792Q180
            388.583 180 470t56.458 138.208Q292.917 665 375.5 665Z"
            />
          </svg>
        </button>
      </div>

      <style jsx>
        {`
          .search {
            display: flex;
            flex-wrap: nowrap;

            .search__input {
              width: 18vw;
              max-width: 200px;
              padding: 0.5rem;
              border: 2px solid #d1d5db;
              border-radius: 0.25rem;
              border-right-color: transparent;
              font-size: inherit;
              color: inherit;
              outline: none;
              transition: border-color .2s, border-right-color .2s;

              &:hover {
                border-color: #9ca3af;
                border-right-color: transparent;
              }

              &:focus {
                border-color: #6b7280;
              }
            }

            .search__button {
              padding: 0.5rem;
              border: 2px solid #d1d5db;
              border-radius: 0.25rem;
              color: #9ca3af;
              outline: none;
              user-select: none;
              touch-action: manipulation;
              cursor: pointer;
              transition: border-color .2s, outline-color .2s;

              &:hover {
                border-color: #9ca3af;
              }

              &:focus {
                border-color: #6b7280;
              }

              &:active {
                border-color: #6b7280;

                .search__icon {
                  fill: #6b7280;
                }
              }

              .search__icon {
                width: 1.5rem;
                height: 1.5rem;
                fill: #9ca3af;
                transition: fill .2s;
              }
            }

            @media (min-width: 375px) {
              .search__input {
                width: 30vw;
              }
            }
          }
        `}
      </style>
    </>
  );
};

export default Search;
