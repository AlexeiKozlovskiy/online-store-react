import './SearchPanel.scss';

import { memo, useEffect, useState } from 'react';
import { useMyURLContext } from '@/context/URLContext';
import { useDebounce } from '@/hooks/DebounceHook';

export const SearchPanel = memo(function SearchPanel() {
  const [inputValue, setInputValue] = useState<string>('');
  const { inputSearchURL, setInputSearchURL } = useMyURLContext();
  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    function setFromURL() {
      setInputValue(inputSearchURL ?? '');
    }
    setFromURL();
  }, [inputSearchURL]);

  useEffect(() => {
    setInputSearchURL(debouncedValue);
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

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
            value={inputValue}
            onChange={handleChange}
          />
          <div className="find-input-img_search"></div>
        </div>
      </div>
    </label>
  );
});
