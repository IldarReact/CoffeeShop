import { createContext, useContext, useCallback, type ReactNode } from "react";

interface EmulatorContextType {
  startCashin: (callback: (amount: number) => void) => () => void;
  stopCashin: (callback: () => void) => void;
  bankCardPurchase: (
    amount: number,
    callback: (result: boolean) => void,
    displayCallback: (message: string) => void
  ) => () => void;
  bankCardCancel: () => void;
  vend: (productIdx: number, callback: (result: boolean) => void) => () => void;
}

const EmulatorContext = createContext<EmulatorContextType | undefined>(undefined);

export function EmulatorProvider({ children }: { children: ReactNode }) {
  const startCashin = useCallback((callback: (amount: number) => void) => {

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "3") {
        e.preventDefault();
        callback(50);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const stopCashin = useCallback((callback: () => void) => {
    callback();
  }, []);

  const bankCardPurchase = useCallback(
    (
      callback: (result: boolean) => void,
      displayCallback: (message: string) => void
    ) => {

      displayCallback("Приложите карту к терминалу");

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey) {
          if (e.key === "1") {
            e.preventDefault();
            displayCallback("Обработка карты");
            setTimeout(() => {
              displayCallback("Связь с банком");
              setTimeout(() => {
                displayCallback("Оплата успешна!");
                callback(true);
              }, 1000);
            }, 1000);
          } else if (e.key === "2") {
            e.preventDefault();
            displayCallback("Обработка карты");
            setTimeout(() => {
              displayCallback("Ошибка оплаты");
              callback(false);
            }, 1000);
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    []
  );

  const vend = useCallback((productIdx: number, callback: (result: boolean) => void) => {

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        if (e.key === "1") {
          e.preventDefault();
          callback(true);
        } else if (e.key === "2") {
          e.preventDefault();
          callback(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <EmulatorContext.Provider
      value={{
        startCashin,
        stopCashin,
        bankCardPurchase,
        bankCardCancel,
        vend,
      }}
    >
      {children}
    </EmulatorContext.Provider>
  );
}

export function useEmulator(): EmulatorContextType {
  const context = useContext(EmulatorContext);
  if (context === undefined) {
    throw new Error("useEmulator must be used within an EmulatorProvider");
  }
  return context;
}