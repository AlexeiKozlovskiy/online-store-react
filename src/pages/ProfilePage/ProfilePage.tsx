import './ProfilePage.scss';
import { useState } from 'react';
import { Profile } from './Profile';
import { Favorites } from './Favorites';
import { MyShopping } from './MyShopping';

export function ProfilePage() {
  const [currentSection, setCurrentSection] = useState('profile');

  function handelClickList(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;
    const { id } = dataset;

    if (id) {
      setCurrentSection(id);
    }
  }

  return (
    <main className="profile">
      <h2 className="profile__titel">MY PROFILE</h2>
      <div className="profile__container">
        <aside className="profile__panel">
          <ul className="profile__list">
            <li
              data-id="profile"
              className={`${currentSection === 'profile' && 'active-section'}`}
              onClick={handelClickList}
            >
              Profile
            </li>
            <li
              data-id="favorites"
              className={`${currentSection === 'favorites' && 'active-section'}`}
              onClick={handelClickList}
            >
              Favorites
            </li>
            <li
              data-id="shopping"
              className={`${currentSection === 'shopping' && 'active-section'}`}
              onClick={handelClickList}
            >
              My shopping
            </li>
          </ul>
        </aside>
        {currentSection === 'profile' && <Profile />}
        {currentSection === 'favorites' && <Favorites />}
        {currentSection === 'shopping' && <MyShopping />}
      </div>
    </main>
  );
}
