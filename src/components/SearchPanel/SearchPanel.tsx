import './SearchPanel.scss';
import { memo, useEffect, useState } from 'react';
import { useMyURLContext } from '@/context/URLContext';

export const SearchPanel = memo(function SearchPanel() {
  const [inputValue, setInputValue] = useState<string | null>('');
  const { inputSearchValue, setInputSearchValue } = useMyURLContext();

  useEffect(() => {
    function setFromURL() {
      setInputValue(inputSearchValue);
    }
    setFromURL();
  }, [inputSearchValue]);

  useEffect(() => {
    const id = setInterval(() => {
      setInputSearchValue(inputValue);
    }, 500);
    return () => {
      clearInterval(id);
    };
  }, [inputValue]);

  return (
    <label htmlFor="find-input">
      <div className="find-container">
        <div className="snow-blocks">
          <div className="snow-blocks__snow1"></div>
          <div className="snow-blocks__snow2"></div>
        </div>
        <h2 className="find-title">
          Find Christmas decorations to create a festive atmosphere at your home
        </h2>
        <div className="find-input-wrapper">
          <input
            className="find-input"
            type="search"
            placeholder="Search..."
            id="find-input"
            value={inputValue || ''}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="find-input-img_search"></div>
        </div>
      </div>
    </label>
  );
});
