import React, { createContext, ReactNode, useEffect } from "react";

interface AbortControllerContextProps {
  signal: AbortSignal;
}

export const AbortControllerContext = createContext<AbortControllerContextProps>({} as AbortControllerContextProps);

const AbortControllerContextProvider = ({ children }: { children: ReactNode }) => {
  const abortController = new AbortController();

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <AbortControllerContext.Provider value={{ signal: abortController.signal }}>
      {children}
    </AbortControllerContext.Provider>
  );
};
export default AbortControllerContextProvider;
