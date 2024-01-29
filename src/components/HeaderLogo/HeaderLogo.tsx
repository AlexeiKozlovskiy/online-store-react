import { memo } from 'react';
import './HeaderLogo.scss';

export const HeaderLogo = memo(function HeaderLogo() {
  return (
    <>
      <span data-testid="header-logo" className="header-logo">
        <span className="header-logo__title">Christmas</span>
        <span className="header-logo__img"></span>
        <span className="header-logo__subtitle">Decorations</span>
      </span>
    </>
  );
});
