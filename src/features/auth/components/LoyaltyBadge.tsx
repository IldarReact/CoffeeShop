import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function LoyaltyBadge() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-[#FFF8E1] rounded-full px-4 py-2 text-sm hover:bg-[#FFE9B1] transition-colors"
    >
      <div className="w-8 h-8 bg-[#FFD600] rounded-full flex items-center justify-center text-black font-bold">
        <span>P</span>
      </div>
      <span className="font-medium">Выход</span>
    </button>
  )
}
