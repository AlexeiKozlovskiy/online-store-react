import { createContext, ReactNode, useState, useContext } from 'react';

export const useMyIdContext = () => useContext(IdClickContext);

export interface IIdClick {
  clickId: number;
  setClickId: (value: number) => void;
}

export const IdClickContext = createContext<IIdClick>({
  clickId: 0,
  setClickId: () => null,
});

export const IdClickProvider = ({ children }: { children: ReactNode }) => {
  const [clickId, setClickId] = useState<number>(0);

  return (
    <IdClickContext.Provider value={{ clickId, setClickId }}>{children}</IdClickContext.Provider>
  );
};
