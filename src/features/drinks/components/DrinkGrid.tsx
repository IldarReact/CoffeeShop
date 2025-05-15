import { useDrinks } from "../hooks/useDrinks"
import DrinkCard from "./DrinkCard"

interface DrinkGridProps {
  categoryId: string
}

export default function DrinkGrid({ categoryId }: DrinkGridProps) {
  const { getDrinksByCategory } = useDrinks()
  const drinks = getDrinksByCategory(categoryId)

  return (
    <div className="grid grid-cols-3 gap-4">
      {drinks.map((drink) => (
        <DrinkCard key={drink.id} drink={drink} />
      ))}
    </div>
  )
}
