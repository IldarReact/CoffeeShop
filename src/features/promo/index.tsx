import { useState, useEffect, useRef } from "react"
import PromoScreen1 from "./components/PromoScreen1"
import PromoScreen2 from "./components/PromoScreen2"
import PromoScreen3 from "./components/PromoScreen3"

interface PromoScreensProps {
  onComplete: () => void
}

export default function PromoScreens({ onComplete }: PromoScreensProps) {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    if (currentScreen >= 3 && !isCompleting && !hasCompletedRef.current) {
      setIsCompleting(true)
      hasCompletedRef.current = true

      localStorage.setItem("welcomeSeen", "true")

      setTimeout(() => {
        onComplete()
      }, 300)
    }
  }, [currentScreen, isCompleting, onComplete])

  const handleNext = () => {
    if (currentScreen < 2) {
      setCurrentScreen((prevScreen) => prevScreen + 1)
    } else if (currentScreen === 2) {
      localStorage.setItem("welcomeSeen", "true")
      setCurrentScreen(3)
    }
  }

  if (isCompleting || currentScreen >= 3) {
    return null
  }

  switch (currentScreen) {
    case 0:
      return <PromoScreen1 onNext={handleNext} />
    case 1:
      return <PromoScreen2 onNext={handleNext} />
    case 2:
      return <PromoScreen3 onNext={handleNext} />
    default:
      return null
  }
}
