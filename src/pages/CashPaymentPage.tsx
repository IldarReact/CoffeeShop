import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { ChevronLeft, Banknote } from "lucide-react"
import { useDrinks } from "../features/drinks/hooks/useDrinks"
import { Button } from "../shared/components/Button"
import { formatPrice } from "../shared/lib/utils"
import { useEmulator } from "../features/emulator/context/EmulatorContext"

export default function CashPaymentPage() {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const { getDrinkById } = useDrinks()
  const { startCashin, stopCashin } = useEmulator()

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

  const [insertedAmount, setInsertedAmount] = useState(0)
  const [cashInActive, setCashInActive] = useState(false)

  useEffect(() => {
    if (!drink) {
      navigate("/")
      return
    }

    const cleanupFn = startCashin((amount) => {
      setInsertedAmount((prev) => prev + amount)
    })

    setCashInActive(true)

    return () => {
      if (typeof cleanupFn === "function") {
        cleanupFn()
      }
      stopCashin(() => {
        setCashInActive(false)
      })
    }
  }, [drink, navigate, startCashin, stopCashin])

  const handleConfirm = () => {
    if (insertedAmount >= finalPrice) {
      stopCashin(() => {
        setCashInActive(false)
        navigate(
          `/preparation/${drinkId}?size=${size}&bonusMode=${bonusMode}&bonusAmount=${bonusAmount}&syrupPrice=${syrupPrice}${syrupsQueryParam}`,
        )
      })
    }
  }

  if (!drink) return null

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold ml-2">Оплата наличными</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-[#FFF8E1] w-full max-w-md rounded-xl p-8 text-center">
          <Banknote size={80} className="mx-auto mb-6 text-[#FFD600]" />

          <div className="mb-6">
            <h2 className="text-2xl font-bold">{drink.name}</h2>
            <p className="text-xl mt-2">Цена: {formatPrice(finalPrice)}</p>
          </div>

          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-lg">Внесено:</span>
              <span className="text-lg font-bold">{formatPrice(insertedAmount)}</span>
            </div>

            {insertedAmount >= finalPrice && (
              <div className="flex justify-between">
                <span className="text-lg">Сдача:</span>
                <span className="text-lg font-bold">{formatPrice(insertedAmount - finalPrice)}</span>
              </div>
            )}
          </div>

          <Button
            className="w-full py-4 text-lg bg-[#FFD600] hover:bg-[#FFCA00] text-black"
            disabled={insertedAmount < finalPrice}
            onClick={handleConfirm}
          >
            Подтвердить
          </Button>
        </div>
      </div>

      <div className="p-4 text-center text-gray-500">
        <p>Нажмите Ctrl+3 для имитации внесения наличных (50₽)</p>
        <p className="mt-2">{cashInActive ? "Купюроприемник активен" : "Купюроприемник неактивен"}</p>
      </div>
    </main>
  )
}
