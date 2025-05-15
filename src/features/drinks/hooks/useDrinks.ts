import { drinksData, type Drink } from "../data/DrinksData"

export function useDrinks() {
  const drinks = drinksData

  const getDrinkById = (id: string): Drink | undefined => {
    return drinks.find((drink) => drink.id === id)
  }

  const getDrinksByCategory = (categoryId: string): Drink[] => {
    return drinks.filter((drink) => drink.categoryId === categoryId)
  }

  const getDrinkIndex = (id: string): number => {
    return drinks.findIndex((drink) => drink.id === id)
  }

  return {
    drinks,
    getDrinkById,
    getDrinksByCategory,
    getDrinkIndex,
  }
}
