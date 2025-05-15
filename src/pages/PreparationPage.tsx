import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { Coffee, XCircle } from "lucide-react"
import { useDrinks } from "../features/drinks/hooks/useDrinks"
import { Button } from "../shared/components/Button"
import PreparationProgress from "../features/preparation/components/PreparationProgress"
import { useEmulator } from "../features/emulator/context/EmulatorContext"
import { useAuth } from "../features/auth/context/AuthContext"
import { useOrders } from "../features/orders/context/OrdersContext"

export default function PreparationPage() {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const { getDrinkById, getDrinkIndex } = useDrinks()
  const { vend } = useEmulator()
  const { addBonusPoints } = useAuth()
  const { useBonusPoints } = useAuth()
  const { addOrder } = useOrders()

  const drinkId = params.drinkId as string
  const size = searchParams.get("size") || "400"
  const bonusMode = searchParams.get("bonusMode") || ""
  const bonusAmount = Number.parseInt(searchParams.get("bonusAmount") || "0", 10)
  const syrupPrice = Number.parseInt(searchParams.get("syrupPrice") || "0", 10)
  const syrupParamString = searchParams.get("syrups") || ""
  const drink = getDrinkById(drinkId)
  const drinkIndex = drink ? getDrinkIndex(drinkId) : -1

  const syrups = syrupParamString
    ? JSON.parse(decodeURIComponent(syrupParamString))
    : { vanilla: 0, mint: 0, caramel: 0, chocolate: 0 }

  const [preparationStatus, setPreparationStatus] = useState<"preparing" | "success" | "error">("preparing")
  const [preparationProgress, setPreparationProgress] = useState(0)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const vendingCompleteRef = useRef(false)
  const [bonusPointsProcessed, setBonusPointsProcessed] = useState(false)
  const [bonusPointsDeducted, setBonusPointsDeducted] = useState(false)
  const [bonusPointsAdded, setBonusPointsAdded] = useState(false)
  const [orderAdded, setOrderAdded] = useState(false)
  const [deductBonusPoints, setDeductBonusPoints] = useState(false)
  const [deductedBonusPointsAmount, setDeductedBonusPointsAmount] = useState(0)

  useEffect(() => {
    if (bonusMode === "pay" && bonusAmount > 0) {
      setDeductBonusPoints(true)
    } else {
      setDeductBonusPoints(false)
    }
  }, [bonusMode, bonusAmount])

  useEffect(() => {
    if (deductBonusPoints && !bonusPointsDeducted) {
      useBonusPoints(bonusAmount)
      setBonusPointsDeducted(true)
      setDeductedBonusPointsAmount(bonusAmount)
    }
  }, [deductBonusPoints, bonusAmount, bonusPointsDeducted, useBonusPoints])

  useEffect(() => {
    if (!drink || drinkIndex === -1) {
      navigate("/")
      return
    }

    progressIntervalRef.current = setInterval(() => {
      setPreparationProgress((prev) => {
        if (prev >= 100) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
          }
          return 100
        }
        return prev + 1
      })
    }, 100)

    const cleanup = vend(drinkIndex, (result) => {
      vendingCompleteRef.current = true

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        setPreparationProgress(100)
      }

      setPreparationStatus(result ? "success" : "error")

      if (result && !bonusPointsProcessed) {
        setBonusPointsProcessed(true)
      }
    })

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      if (typeof cleanup === "function") {
        cleanup()
      }
    }
  }, [drink, drinkIndex, navigate, vend, bonusPointsProcessed])

  useEffect(() => {
    if (preparationStatus === "success" && !orderAdded && drink) {
      let basePrice = drink.price
      if (size === "300") basePrice -= 30
      if (size === "200") basePrice -= 50

      addOrder({
        drinkId: drink.id,
        drinkName: drink.name,
        price: basePrice + syrupPrice,
        size: `${size} мл.`,
        image: drink.image,
        syrup: syrups,
        syrupPrice: syrupPrice,
        bonusEarned: bonusMode === "earn" ? bonusAmount : undefined,
        bonusUsed: bonusMode === "pay" ? bonusAmount : undefined,
      })

      setOrderAdded(true)
    }
  }, [preparationStatus, orderAdded, drink, size, syrupPrice, syrups, bonusMode, bonusAmount, addOrder])

  const handleReturnToMenu = () => {
    if (preparationStatus === "success" && bonusMode === "earn" && bonusAmount > 0 && !bonusPointsAdded) {
      addBonusPoints(bonusAmount)
      setBonusPointsAdded(true)
    }
    navigate("/")
  }

  if (!drink) return null

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      {preparationStatus === "preparing" && (
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <img
              src={drink.image || "/placeholder.svg?height=200&width=200"}
              alt={drink.name}
              className="object-contain w-full h-full"
            />
          </div>

          <div className="text-6xl font-bold mb-4">
            00:
            {preparationProgress < 10
              ? `0${Math.floor(preparationProgress / 10)}`
              : Math.floor(preparationProgress / 10)}
          </div>

          <div className="w-64 mb-8">
            <PreparationProgress progress={preparationProgress} />
          </div>

          <p className="text-gray-500">Приготовление напитка</p>
        </div>
      )}

      {preparationStatus === "success" && (
        <div className="bg-[#FFD600] w-full h-full flex flex-col items-center justify-center text-center p-6">
          <div className="mb-8">
            <Coffee size={80} className="mx-auto mb-4" />
            <h2 className="text-3xl font-bold">Напиток готов!</h2>
            <p className="mt-2">Не забудьте забрать его</p>

            {bonusMode === "pay" && bonusAmount > 0 && (
              <p className="mt-4">Использовано бонусов: -{deductedBonusPointsAmount}</p>
            )}

            {bonusMode === "earn" && bonusAmount > 0 && <p className="mt-4">Вы получите: +{bonusAmount} бонусов</p>}
          </div>

          <Button className="mt-8 bg-white text-black hover:bg-gray-100" onClick={handleReturnToMenu}>
            Вернуться в меню
          </Button>
        </div>
      )}

      {preparationStatus === "error" && (
        <div className="bg-orange-500 w-full h-full flex flex-col items-center justify-center text-white text-center p-6">
          <div className="mb-8">
            <XCircle size={80} className="mx-auto mb-4" />
            <h2 className="text-3xl font-bold">Данного напитка нет в наличии</h2>
          </div>

          <Button className="mt-8 bg-white text-orange-500 hover:bg-gray-100" onClick={() => navigate("/")}>
            Вернуться на главную
          </Button>
        </div>
      )}

      <div className="mt-auto p-4 text-center text-gray-500">
        <p>Нажмите Ctrl+1 для успешного приготовления, Ctrl+2 для неудачи</p>
      </div>
    </main>
  )
}
