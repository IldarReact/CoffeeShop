import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface DrinkModalContextType {
  isOpen: boolean;
  drinkId: string | null;
  syrupPrice: number;
  selectedSyrups: Record<string, number> | null;
  openModal: (drinkId: string) => void;
  closeModal: () => void;
  updateSyrups: (syrups: Record<string, number>, price: number) => void;
}

const DrinkModalContext = createContext<DrinkModalContextType | undefined>(undefined);

export function DrinkModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [drinkId, setDrinkId] = useState<string | null>(null);
  const [syrupPrice, setSyrupPrice] = useState(0);
  const [selectedSyrups, setSelectedSyrups] = useState<Record<string, number> | null>(null);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const isEditing = searchParams.get("edit") === "true";
  const editSyrups = searchParams.get("syrups");

  useEffect(() => {
    if (isEditing && editSyrups && drinkId) {
      try {
        const parsedSyrups = JSON.parse(decodeURIComponent(editSyrups)) as Record<string, number>;
        
        if (parsedSyrups && typeof parsedSyrups === "object") {
          setSelectedSyrups(parsedSyrups);

          const totalSyrupPrice = Object.values(parsedSyrups).reduce(
            (sum: number, count: number) => sum + count * 30,
            0
          );
          setSyrupPrice(totalSyrupPrice);
        } else {
          setSelectedSyrups(null);
          setSyrupPrice(0);
        }
      } catch (error) {
        setSelectedSyrups(null);
        setSyrupPrice(0);
      }
    }
  }, [isEditing, editSyrups, drinkId]);

  const openModal = (drinkId: string) => {
    setDrinkId(drinkId);

    if (!isEditing) {
      setSyrupPrice(0);
      setSelectedSyrups(null);
    }

    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDrinkId(null);
    setSyrupPrice(0);
    setSelectedSyrups(null);
  };

  const updateSyrups = (syrups: Record<string, number>, price: number) => {
    setSelectedSyrups(syrups);
    setSyrupPrice(price);
  };

  return (
    <DrinkModalContext.Provider
      value={{
        isOpen,
        drinkId,
        syrupPrice,
        selectedSyrups,
        openModal,
        closeModal,
        updateSyrups,
      }}
    >
      {children}
    </DrinkModalContext.Provider>
  );
}

export function useDrinkModal() {
  const context = useContext(DrinkModalContext);
  if (context === undefined) {
    throw new Error("useDrinkModal must be used within a DrinkModalProvider");
  }
  return context;
}