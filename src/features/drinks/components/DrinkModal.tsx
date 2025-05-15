import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useDrinkModal } from "../context/DrinkModalContext"
import { useDrinks } from "../hooks/useDrinks"
import SizeSelector from "./SizeSelector"
import SyrupModal from "./SyrupModal"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../auth/context/AuthContext"
import { formatPrice } from "../../../shared/lib/utils"

export default function DrinkModal() {
  const { drinkId, closeModal, syrupPrice, selectedSyrups } = useDrinkModal()
  const { getDrinkById } = useDrinks()
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const drink = getDrinkById(drinkId || "")
  const [selectedSize, setSelectedSize] = useState("400")
  const [showSyrupModal, setShowSyrupModal] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const searchParams = new URLSearchParams(location.search)
  const isEditing = searchParams.get("edit") === "true"
  const editSize = searchParams.get("size")

  useEffect(() => {
    if (isEditing && editSize) {
      setSelectedSize(editSize.replace(" мл.", ""))
    }
  }, [isEditing, editSize])

  const handleBackdropClick = () => {
    setIsClosing(true)
    setTimeout(() => {
      closeModal()
    }, 300)
  }

  if (!drink) return null

  let price = drink.price
  if (selectedSize === "300") price -= 30
  if (selectedSize === "200") price -= 50

  const totalPrice = price + (syrupPrice || 0)

  const handlePayment = () => {
    closeModal()
    const syrupsParam = selectedSyrups ? `&syrups=${encodeURIComponent(JSON.stringify(selectedSyrups))}` : ""
    if (!isAuthenticated) {
      navigate(
        `/auth/loyalty-prompt?drinkId=${drink.id}&size=${selectedSize}&price=${price}&syrupPrice=${syrupPrice}${syrupsParam}`,
      )
    } else {
      navigate(
        `/auth/bonus-options?drinkId=${drink.id}&size=${selectedSize}&price=${price}&syrupPrice=${syrupPrice}${syrupsParam}`,
      )
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[1000] modal-backdrop ${
        isClosing ? "animate-fade-out" : ""
      }`}
      style={{ backgroundColor: "rgba(31, 41, 68, 0.5)" }}
      onClick={handleBackdropClick}
    >
      <div
        className={`absolute bottom-0 bg-white rounded-t-lg w-[414px] ${
          isClosing ? "animate-slide-down" : "animate-slide-up"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white pt-4 pb-2 flex justify-center items-center">
          <button
            onClick={closeModal}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex justify-center py-4">
          <img
            src={drink.image || "/placeholder.svg?height=300&width=300"}
            alt={drink.name}
            className="h-64 w-auto object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">{drink.name}</h2>

        <div className="px-4 mb-6">
          <SizeSelector selectedSize={selectedSize} onSelectSize={setSelectedSize} />
        </div>

        <div className="px-4 mb-6">
          <button
            className="w-full py-4 text-center text-base font-medium bg-[#F8F8F8] rounded-lg"
            onClick={() => setShowSyrupModal(true)}
          >
            {selectedSyrups && Object.values(selectedSyrups).some((val) => val > 0)
              ? "Изменить сиропы"
              : "Хотите добавить сироп?"}
          </button>
        </div>

        <div className="sticky bottom-0 bg-white px-4 py-4">
          <button
            className="w-full py-4 text-lg font-bold bg-[#FFD600] hover:bg-[#FFCA00] text-black rounded-lg flex items-center justify-between px-6"
            onClick={handlePayment}
          >
            <span>Оплатить</span>
            <span>{formatPrice(totalPrice)}</span>
          </button>
        </div>

        {showSyrupModal && <SyrupModal onClose={() => setShowSyrupModal(false)} />}
      </div>
    </div>
  )
}
