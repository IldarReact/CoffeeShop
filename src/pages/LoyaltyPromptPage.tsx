import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "../shared/components/Button"
import { ChevronLeft } from "lucide-react"

export default function LoyaltyPromptPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const drinkId = searchParams.get("drinkId") || ""
  const size = searchParams.get("size") || "400"
  const price = Number(searchParams.get("price") || "0")
  const syrupPrice = Number(searchParams.get("syrupPrice") || "0")

  const handleRegister = () => {
    navigate(`/auth/register?drinkId=${drinkId}&size=${size}&price=${price}&syrupPrice=${syrupPrice}`)
  }

  const handleContinue = () => {
    navigate(`/payment/${drinkId}?size=${size}&syrupPrice=${syrupPrice}`)
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
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

          <h1 className="text-2xl font-bold mb-4">Система лояльности</h1>

          <p className="mb-8">Вы можете зарегистрироваться и получать бонусы за каждый напиток. 1 бонус = 1 рубль</p>

          <div className="space-y-4">
            <Button className="w-full py-4 bg-[#FFD600] text-black hover:bg-[#FFCA00]" onClick={handleRegister}>
              Зарегистрироваться
            </Button>

            <Button variant="outline" className="w-full py-4" onClick={handleContinue}>
              Продолжить без регистрации
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
