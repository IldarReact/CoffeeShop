import { formatPrice } from "../../../shared/lib/utils"
import type { Drink } from "../data/DrinksData"
import { useDrinkModal } from "../context/DrinkModalContext"

interface DrinkCardProps {
  drink: Drink
}

export default function DrinkCard({ drink }: DrinkCardProps) {
  const { openModal } = useDrinkModal()

  const handleSelect = () => {
    openModal(drink.id)
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md p-2 flex flex-col items-center text-center cursor-pointer transition-shadow duration-300 hover:shadow-lg"
      onClick={handleSelect}
    >
      <img src={drink.image || "/placeholder.svg"} alt={drink.name} className="w-24 h-24 object-contain mb-2" />
      <h3 className="text-sm font-medium text-black">{drink.name}</h3>
      {drink.isSpecial && <span className="bg-[#FFD600] text-black text-xs px-2 py-1 rounded-full mt-1">2x</span>}
      <p className="text-sm font-normal text-black mt-1">от {formatPrice(drink.price)}</p>
    </div>
  )
}
