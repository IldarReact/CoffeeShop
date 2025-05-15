import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../features/auth/context/AuthContext"
import PromoScreens from "../features/promo"

export default function WelcomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const searchParams = new URLSearchParams(location.search)
  const forcePromo = searchParams.get("forcePromo") === "true"

  const handleComplete = () => {
    localStorage.setItem("welcomeSeen", "true")


    navigate("/", { replace: true })

    setTimeout(() => {
      window.location.href = "/"
    }, 500)
  }

  useEffect(() => {
    if (isAuthenticated && !forcePromo) {
      navigate("/", { replace: true })
      return
    }

    const welcomeSeen = localStorage.getItem("welcomeSeen")
    if (welcomeSeen && !forcePromo) {
      navigate("/", { replace: true })
    }
  }, [navigate, isAuthenticated, forcePromo])

  return <PromoScreens onComplete={handleComplete} />
}
