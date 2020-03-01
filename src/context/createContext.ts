import * as React from 'react';

export interface IContextProps {
  lang: string;
  changeLang: (lang: string) => void;
}

const ctx = React.createContext<IContextProps>({ lang: 'ru', changeLang: () => {} });

export default ctx;
