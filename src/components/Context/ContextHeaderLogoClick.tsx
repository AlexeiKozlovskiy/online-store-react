import { createContext, ReactNode, useState, useContext } from 'react';

export const useMyHeaderClick = () => useContext(HeaderClickContext);

export interface IHeaderLogoClick {
  clickHeaderLogo: boolean;
  setClickHeaderLogo: (id: boolean) => void;
}

export const HeaderClickContext = createContext<IHeaderLogoClick>({
  clickHeaderLogo: false,
  setClickHeaderLogo: () => null,
});

export const HeaderClickProvider = ({ children }: { children: ReactNode }) => {
  const [clickHeaderLogo, setClickHeaderLogo] = useState<boolean>(false);

  return (
    <HeaderClickContext.Provider value={{ clickHeaderLogo, setClickHeaderLogo }}>
      {children}
    </HeaderClickContext.Provider>
  );
};
