import { Button } from "./Button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  onClick: () => void
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <Button variant="outline" className="flex items-center gap-2 px-6 py-5 text-lg" onClick={onClick}>
      <ArrowLeft size={20} />
      Назад
    </Button>
  )
}
