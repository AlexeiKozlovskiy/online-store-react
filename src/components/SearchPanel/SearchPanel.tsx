import { useEffect, useState } from 'react';
import './SearchPanel.scss';

interface ISearchPanel {
  setInputSearchValue: (value: string) => void;
}

export function SearchPanel({ setInputSearchValue }: ISearchPanel) {
  const queryParams = new URLSearchParams(location.search);
  const [search] = queryParams.getAll('q');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (search) {
      setInputSearchValue(search);
      setSearchValue(search);
    }
  }, [location.search]);

  useEffect(() => {
    updateURLWithFilters();
  }, [searchValue]);

  const updateURLWithFilters = () => {
    const params = new URLSearchParams();
    params.set('q', searchValue);
    const newURL = `${location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newURL);
  };

  function handelInputSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target as HTMLInputElement;
    setSearchValue(value);
    setInputSearchValue(value);
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
            value={searchValue}
            onChange={handelInputSearch}
          />
          <div className="find-input-img_search"></div>
        </div>
      </div>
    </label>
  );
}
