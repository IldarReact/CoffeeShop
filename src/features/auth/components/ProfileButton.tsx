import { User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProfileButton() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/profile")
    } else {
      navigate("/auth/register")
    }
  }

  return (
    <button onClick={handleClick} className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFF8E1]">
      <User size={16} className="text-[#FFD600]" />
    </button>
  )
}
