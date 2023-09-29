import { useRef } from 'react';
import './SearchPanel.scss';

interface ISearchPanel {
  setInputSearchValue: (value: string) => void;
}

export function SearchPanel({ setInputSearchValue }: ISearchPanel) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handelInputSearch() {
    if (inputRef.current) {
      const { value } = inputRef.current;
      setInputSearchValue(value);
    }
  }

  return (
    <label htmlFor="find-input">
      <div className="find-container">
        <div className="snow-blocks">
          <div className="snow-blocks__snow1"></div>
          <div className="snow-blocks__snow2"></div>
        </div>
        <div className="find-title">
          Find Christmas decorations to create a festive atmosphere at your home
        </div>
        <div className="find-input-wrapper">
          <input
            className="find-input"
            type="search"
            placeholder="Search..."
            id="find-input"
            ref={inputRef}
            onChange={handelInputSearch}
          />
          <div className="find-input-img_search"></div>
        </div>
      </div>
    </label>
  );
}
