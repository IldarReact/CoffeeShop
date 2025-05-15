import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { ChevronLeft, CreditCard, X } from "lucide-react"
import { useDrinks } from "../features/drinks/hooks/useDrinks"
import { Button } from "../shared/components/Button"
import { useEmulator } from "../features/emulator/context/EmulatorContext"

export default function CardPaymentPage() {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const { getDrinkById } = useDrinks()
  const { bankCardPurchase, bankCardCancel } = useEmulator()

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

  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [paymentMessage, setPaymentMessage] = useState("Приложите карту к терминалу")

  useEffect(() => {
    if (!drink) {
      navigate("/")
      return
    }

    const cleanupFn = bankCardPurchase(
      finalPrice,
      (result) => {
        setPaymentStatus(result ? "success" : "error")

        if (result) {
          const timer = setTimeout(() => {
            navigate(
              `/preparation/${drinkId}?size=${size}&bonusMode=${bonusMode}&bonusAmount=${bonusAmount}&syrupPrice=${syrupPrice}${syrupsQueryParam}`,
            )
          }, 2000)
          return () => clearTimeout(timer)
        }
      },
      (message) => {
        setPaymentMessage(message)
      },
    )

    return () => {
      if (typeof cleanupFn === "function") {
        cleanupFn()
      }
      bankCardCancel()
    }
  }, [
    drink,
    navigate,
    finalPrice,
    drinkId,
    size,
    bankCardPurchase,
    bankCardCancel,
    bonusMode,
    bonusAmount,
    syrupPrice,
    syrupsQueryParam,
  ])

  const handleCancel = () => {
    bankCardCancel()
    navigate(-1)
  }

  if (!drink) return null

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold ml-2">Оплата картой</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {paymentStatus === "error" ? (
          <div className="bg-red-500 w-full max-w-md rounded-xl p-8 text-center text-white">
            <X size={80} className="mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Оплата не прошла</h2>
            <Button className="mt-4 bg-white text-red-500 hover:bg-gray-100" onClick={() => handleCancel()}>
              Попробовать ещё раз
            </Button>
          </div>
        ) : (
          <div className="bg-[#FFF8E1] w-full max-w-md rounded-xl p-8 text-center">
            <CreditCard size={80} className="mx-auto mb-6 text-[#FFD600]" />
            <h2 className="text-2xl font-bold mb-4">{paymentMessage}</h2>
            {paymentStatus === "idle" && (
              <Button variant="outline" className="mt-4" onClick={() => handleCancel()}>
                Отмена
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="p-4 text-center text-gray-500">
        <p>Нажмите Ctrl+1 для успешной оплаты, Ctrl+2 для неудачной оплаты</p>
      </div>
    </main>
  )
}
