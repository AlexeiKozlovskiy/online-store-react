import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export const useMyHeaderClickContext = () => useContext(HeaderClickContext);

interface IHeaderLogoClick {
  handleHeaderLogoClick: () => void;
  clickHeaderLogo: boolean;
}

export const HeaderClickContext = createContext<IHeaderLogoClick>({
  handleHeaderLogoClick: () => null,
  clickHeaderLogo: false,
});

export const HeaderClickProvider = ({ children }: { children: ReactNode }) => {
  const [clickHeaderLogo, setClickHeaderLogo] = useState<boolean>(false);

  const handleHeaderLogoClick = () => {
    if (!clickHeaderLogo) {
      setClickHeaderLogo(true);
    }
  };

  useEffect(() => {
    setClickHeaderLogo(false);
  }, [clickHeaderLogo]);

  return (
    <HeaderClickContext.Provider value={{ handleHeaderLogoClick, clickHeaderLogo }}>
      {children}
    </HeaderClickContext.Provider>
  );
};
