import './SearchPanel.scss';

export function SearchPanel() {
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
          <input className="find-input" type="search" placeholder="Search..." id="find-input" />
          <div className="find-input-img_search"></div>
        </div>
      </div>
    </label>
  );
}