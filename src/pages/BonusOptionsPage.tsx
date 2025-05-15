import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "../shared/components/Button"
import { ChevronLeft } from "lucide-react"
import { useAuth } from "../features/auth/context/AuthContext"
import { formatPrice } from "../shared/lib/utils"

export default function BonusOptionsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const { bonusPoints } = useAuth()

  const drinkId = searchParams.get("drinkId") || ""
  const size = searchParams.get("size") || "400"
  const price = Number(searchParams.get("price") || "0")
  const syrupPrice = Number(searchParams.get("syrupPrice") || "0")
  const syrupsParam = searchParams.get("syrups") || ""

  const totalPrice = price + syrupPrice

  const bonusesToEarn = Math.floor(totalPrice * 0.1)

  const maxBonusesToUse = Math.min(bonusPoints, totalPrice)

  const syrupsQueryParam = syrupsParam ? `&syrups=${syrupsParam}` : ""

  const handleUseBonus = () => {
    if (maxBonusesToUse >= totalPrice) {
      navigate(
        `/preparation/${drinkId}?size=${size}&bonusMode=pay&bonusAmount=${totalPrice}&syrupPrice=${syrupPrice}${syrupsQueryParam}`,
      )
    } else {
      navigate(
        `/payment/${drinkId}?size=${size}&bonusMode=pay&bonusAmount=${maxBonusesToUse}&syrupPrice=${syrupPrice}${syrupsQueryParam}`,
      )
    }
  }

  const handleEarnBonus = () => {
    navigate(
      `/payment/${drinkId}?size=${size}&bonusMode=earn&bonusAmount=${bonusesToEarn}&syrupPrice=${syrupPrice}${syrupsQueryParam}`,
    )
  }

  const handlePayWithoutBonus = () => {
    navigate(`/payment/${drinkId}?size=${size}&syrupPrice=${syrupPrice}${syrupsQueryParam}`)
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="bg-[#FFD600] w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold">₽</span>
          </div>

          <h1 className="text-2xl font-bold mb-4">У вас имеется {bonusPoints} бонусов</h1>

          <div className="flex gap-4 mt-8">
            <Button
              className="flex-1 py-4 bg-[#FFD600] text-black hover:bg-[#FFCA00]"
              onClick={handleUseBonus}
              disabled={bonusPoints === 0}
            >
              Списать {maxBonusesToUse}
            </Button>

            <Button variant="outline" className="flex-1 py-4 bg-white hover:bg-gray-100" onClick={handleEarnBonus}>
              Накопить {bonusesToEarn}
            </Button>
          </div>

          <div className="mt-8">
            <Button className="w-full py-4 bg-[#FFD600] text-black hover:bg-[#FFCA00]" onClick={handlePayWithoutBonus}>
              Оплатить
              <span className="ml-2">{formatPrice(totalPrice)}</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
