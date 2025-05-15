import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import { useDrinks } from "../features/drinks/hooks/useDrinks"
import PaymentButton from "../features/payment/components/PaymentButton"
import { Phone } from "lucide-react"
import { useAuth } from "../features/auth/context/AuthContext"
import LoyaltyBadge from "../features/auth/components/LoyaltyBadge"
import { formatPrice } from "../shared/lib/utils"

export default function PaymentPage() {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const { getDrinkById } = useDrinks()
  const { isAuthenticated } = useAuth()

  const drinkId = params.drinkId as string
  const size = searchParams.get("size") || "400"
  const bonusMode = searchParams.get("bonusMode") || ""
  const bonusAmount = Number.parseInt(searchParams.get("bonusAmount") || "0", 10)
  const syrupPrice = Number.parseInt(searchParams.get("syrupPrice") || "0", 10)
  const syrupsParam = searchParams.get("syrups") || ""
  const drink = getDrinkById(drinkId)

  let basePrice = drink?.price || 0
  if (size === "300") basePrice -= 30
  if (size === "200") basePrice -= 50

  const totalPrice = basePrice + syrupPrice

  const finalPrice = bonusMode === "pay" ? Math.max(0, totalPrice - bonusAmount) : totalPrice

  const syrupsQueryParam = syrupsParam ? `&syrups=${syrupsParam}` : ""

  useEffect(() => {
    if (!drink) {
      navigate("/")
    }
  }, [drink, navigate])

  if (!drink) return null

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Выбор способа оплаты</h1>
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
        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto">
            <img
              src={drink.image || "/placeholder.svg?height=200&width=200"}
              alt={drink.name}
              className="object-contain w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold mt-4">{drink.name}</h2>
          <p className="text-xl mt-2">{formatPrice(finalPrice)}</p>

          {bonusMode === "pay" && bonusAmount > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              <p>Оплачено бонусами: -{bonusAmount}</p>
              <p>Исходная цена: {formatPrice(totalPrice)}</p>
            </div>
          )}

          {bonusMode === "earn" && bonusAmount > 0 && (
            <div className="mt-2 text-sm text-green-600">
              <p>Вы получите: +{bonusAmount} бонусов</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-6 px-6">
        <PaymentButton
          type="card"
          onClick={() =>
            navigate(
              `/card-payment/${drinkId}?size=${size}&bonusMode=${bonusMode}&bonusAmount=${bonusAmount}&syrupPrice=${syrupPrice}${syrupsQueryParam}`,
            )
          }
        />
        <PaymentButton
          type="cash"
          onClick={() =>
            navigate(
              `/cash-payment/${drinkId}?size=${size}&bonusMode=${bonusMode}&bonusAmount=${bonusAmount}&syrupPrice=${syrupPrice}${syrupsQueryParam}`,
            )
          }
        />
      </div>
    </main>
  )
}
