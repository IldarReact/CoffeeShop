import { Button } from "../../../shared/components/Button"
import { useNavigate } from "react-router-dom"

export default function PromoTester() {
  const navigate = useNavigate()

  const resetWelcomeSeen = () => {
    localStorage.removeItem("welcomeSeen")
    navigate("/welcome", { replace: true })
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={resetWelcomeSeen} className="bg-[#FFD600] text-black hover:bg-[#FFCA00] text-sm py-1 px-2">
        Показать промо
      </Button>
    </div>
  )
}
