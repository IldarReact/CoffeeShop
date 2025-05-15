import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { useDrinks } from "../features/drinks/hooks/useDrinks"
import SizeSelector from "../features/drinks/components/SizeSelector"
import { Button } from "../shared/components/Button"
import { Phone } from "lucide-react"
import { useAuth } from "../features/auth/context/AuthContext"
import LoyaltyBadge from "../features/auth/components/LoyaltyBadge"

export default function DrinkPage() {
  const params = useParams()
  const navigate = useNavigate()
  const { getDrinkById } = useDrinks()
  const { isAuthenticated } = useAuth()
  const drinkId = params.drinkId as string
  const drink = getDrinkById(drinkId)

  const [selectedSize, setSelectedSize] = useState("400")
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (!drink) {
      navigate("/")
      return
    }

    let price = drink.price
    if (selectedSize === "300") price -= 30
    if (selectedSize === "200") price -= 50

    setTotalPrice(price)
  }, [drink, navigate, selectedSize])

  if (!drink) return null

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Выбор напитка</h1>
        </div>
        {isAuthenticated ? (
          <LoyaltyBadge />
        ) : (
          <button
            onClick={() => navigate("/auth/register")}
            className="flex items-center gap-2 bg-[#FFF8E1] rounded-full px-4 py-2 text-sm"
          >
            <Phone size={16} className="text-[#FFD600]" />
            <span>Вход / регистрация</span>
          </button>
        )}
      </div>

      <div className="flex justify-center py-8">
        <div className="relative w-64 h-64">
          <img
            src={drink.image || "/placeholder.svg?height=300&width=300"}
            alt={drink.name}
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">{drink.name}</h2>
      </div>

      <div className="px-6 mb-8">
        <SizeSelector selectedSize={selectedSize} onSelectSize={setSelectedSize} />
      </div>

      <div className="mt-auto px-6 pb-6">
        <Button
          className="w-full py-6 text-xl font-bold bg-[#FFD600] hover:bg-[#FFCA00] text-black"
          onClick={() => navigate(`/payment/${drinkId}?size=${selectedSize}`)}
        >
          Оплатить
          <span className="ml-2">{totalPrice}₽</span>
        </Button>
      </div>
    </main>
  )
}
