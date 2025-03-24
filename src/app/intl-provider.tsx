"use client";
import { createContext, useContext, useState } from "react";

type IntlProps = {
  lang: string;
  setLang: (lang: string) => void;
};

const initial = {
  lang: "pt",
  setLang: () => {},
};

const IntlContext = createContext<IntlProps>(initial);

export const useIntl = () => useContext(IntlContext);

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<string>("pt");

  return (
    <IntlContext.Provider value={{ lang, setLang }}>
      {children}
    </IntlContext.Provider>
  );
}
