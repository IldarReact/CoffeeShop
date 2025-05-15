import { useState, useEffect } from "react"
import { X, Plus, Minus } from "lucide-react"
import { formatPrice } from "../../../shared/lib/utils"
import { useDrinkModal } from "../context/DrinkModalContext"

interface SyrupModalProps {
  onClose: () => void
}

interface SyrupOption {
  id: string
  name: string
}

const syrupOptions: SyrupOption[] = [
  { id: "vanilla", name: "Ванильный сироп" },
  { id: "mint", name: "Мятный сироп" },
  { id: "caramel", name: "Карамельный сироп" },
  { id: "chocolate", name: "Шоколадный сироп" },
]

export default function SyrupModal({ onClose }: SyrupModalProps) {
  const { updateSyrups, selectedSyrups } = useDrinkModal()
  const [syrupCounts, setSyrupCounts] = useState<Record<string, number>>(
    selectedSyrups || {
      vanilla: 0,
      mint: 0,
      caramel: 0,
      chocolate: 0,
    },
  )
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (selectedSyrups) {
      setSyrupCounts(selectedSyrups)
    }
  }, [selectedSyrups])

  const handleBackdropClick = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleIncrease = (id: string) => {
    setSyrupCounts((prev) => ({
      ...prev,
      [id]: Math.min(prev[id] + 1, 3),
    }))
  }

  const handleDecrease = (id: string) => {
    setSyrupCounts((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 0),
    }))
  }

  const totalSyrupPrice = Object.values(syrupCounts).reduce((sum, count) => sum + count * 30, 0)

  const handleAddSyrups = () => {
    updateSyrups(syrupCounts, totalSyrupPrice)
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[1001] modal-backdrop ${
        isClosing ? "animate-fade-out" : ""
      }`}
      style={{ backgroundColor: "rgba(31, 41, 68, 0.5)" }}
      onClick={handleBackdropClick}
    >
      <div
        className={`absolute bottom-0 bg-white rounded-t-lg w-[414px] h-[600px] ${
          isClosing ? "animate-slide-down" : "animate-slide-up"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white pt-4 pb-2 flex justify-center items-center">
          <button
            onClick={handleBackdropClick}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        <h2 className="text-xl font-bold text-center mb-6">Выбор сиропа</h2>

        <div className="px-6 pb-6">
          <div className="space-y-6">
            {syrupOptions.map((option) => (
              <div key={option.id} className="flex items-center justify-between h-12">
                <span className="text-base">{option.name}</span>
                <div className="flex items-center gap-4">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F8F8F8]"
                    onClick={() => handleDecrease(option.id)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{syrupCounts[option.id]} гр.</span>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFD600]"
                    onClick={() => handleIncrease(option.id)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white px-4 py-4">
          <button
            className="w-full py-4 text-lg font-bold bg-[#FFD600] hover:bg-[#FFCA00] text-black rounded-lg flex items-center justify-between px-6"
            onClick={handleAddSyrups}
          >
            <span>Добавить</span>
            {totalSyrupPrice > 0 && <span>{formatPrice(totalSyrupPrice)}</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
