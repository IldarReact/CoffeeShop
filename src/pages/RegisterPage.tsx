import type React from "react"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { Button } from "../shared/components/Button"

export default function RegisterPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const drinkId = searchParams.get("drinkId")
  const size = searchParams.get("size")
  const price = searchParams.get("price")
  const syrupPrice = searchParams.get("syrupPrice")

  const [phoneNumber, setPhoneNumber] = useState("+7")
  const [step, setStep] = useState<"welcome" | "phone" | "verification">("welcome")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (/^\d$/.test(e.key) || e.key === "Backspace" || e.key === "Delete" || e.key === "Tab" || e.key === "Enter") {
      if (/^\d$/.test(e.key)) {
        handleKeyPress(e.key)
      } else if (e.key === "Backspace") {
        handleKeyPress("backspace")
      } else if (e.key === "Enter" && isPhoneValid) {
        handleContinue()
      }
    } else {
      e.preventDefault()
    }
  }

  const formatPhoneNumber = (digits: string): string => {
    if (digits.length === 0) return "+7"

    let formatted = "+7"

    const rest = digits.startsWith("7") ? digits.substring(1) : digits

    if (rest.length > 0) formatted += " " + rest.substring(0, Math.min(3, rest.length))
    if (rest.length > 3) formatted += " " + rest.substring(3, Math.min(6, rest.length))
    if (rest.length > 6) formatted += "-" + rest.substring(6, Math.min(8, rest.length))
    if (rest.length > 8) formatted += "-" + rest.substring(8, Math.min(10, rest.length))

    return formatted
  }

  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      setPhoneNumber((prev) => {
        const digits = prev.replace(/\D/g, "")
        if (digits.length <= 1) return "+7"
        const newDigits = digits.slice(0, -1)
        return formatPhoneNumber(newDigits)
      })
      return
    }

    setPhoneNumber((prev) => {
      const digits = prev.replace(/\D/g, "")
      if (digits.length >= 11) return prev
      const newDigits = digits + key
      return formatPhoneNumber(newDigits)
    })
  }

  const isPhoneValid = phoneNumber.replace(/\D/g, "").length === 11

  const handleContinue = () => {
    if (step === "welcome") {
      setStep("phone")
    } else if (step === "phone") {
      navigate(
        `/auth/verify?phone=${encodeURIComponent(phoneNumber)}${drinkId ? `&drinkId=${drinkId}&size=${size}&price=${price}&syrupPrice=${syrupPrice || 0}` : ""}`,
      )
    }
  }

  const handleLogin = () => {
    navigate("/auth/login")
  }

  if (step === "welcome") {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFD600]">
        <div className="p-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-white w-10 h-10 rounded-lg flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative">
          <img
            src="/images/promo/minCoffee1.svg"
            alt="Кофейное зерно"
            className="absolute w-8 h-8 top-[6%] right-[15%]"
          />
          <img
            src="/images/promo/minCoffee3.svg"
            alt="Кофейное зерно"
            className="absolute w-10 h-10 top-[20%] left-[10%]"
          />
          <img
            src="/images/promo/minCoffee2.svg"
            alt="Кофейное зерно"
            className="absolute w-12 h-12 bottom-[30%] right-[10%]"
          />
          <img
            src="/images/promo/minCoffee4.svg"
            alt="Кофейное зерно"
            className="absolute w-10 h-10 bottom-[15%] left-[15%]"
          />

          <div className="absolute bottom-[20%] left-0 w-full h-1 bg-white opacity-20 transform rotate-6"></div>
          <div className="absolute bottom-[10%] left-0 w-full h-1 bg-white opacity-20 transform -rotate-3"></div>

          <h1 className="text-3xl font-bold mb-4 text-center">Регистрация</h1>
          <p className="text-center mb-8">
            Вы можете зарегистрироваться и получать бонусы за каждый напиток. 1 бонус = 1 рубль.
          </p>

          <div className="w-full space-y-4">
            <Button className="w-full py-4 bg-black text-white hover:bg-gray-800 rounded-full" onClick={handleContinue}>
              Зарегистрироваться
            </Button>

            <Button
              variant="outline"
              className="w-full py-4 bg-white hover:bg-gray-100 rounded-full"
              onClick={handleLogin}
            >
              Уже зарегистрированы
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (step === "phone") {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <div className="p-4 border-b">
          <button onClick={() => setStep("welcome")} className="p-1">
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          <h1 className="text-2xl font-bold mb-8 text-center">Регистрация</h1>

          <div className="mb-4 text-center text-gray-500 text-sm">Введите номер телефона</div>

          <div className="mb-8 text-center text-3xl font-medium" tabIndex={0} onKeyDown={handleKeyDown}>
            {phoneNumber}
          </div>

          <div className="w-full max-w-xs">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <button
                  key={num}
                  className="h-16 rounded-full flex items-center justify-center text-2xl font-medium hover:bg-gray-100 active:bg-gray-200 transition-colors"
                  onClick={() => handleKeyPress(num.toString())}
                >
                  {num}
                </button>
              ))}
              <button
                className="h-16 rounded-full flex items-center justify-center text-2xl font-medium hover:bg-gray-100 active:bg-gray-200 transition-colors"
                onClick={() => handleKeyPress("backspace")}
              >
                ⌫
              </button>
            </div>
          </div>

          <Button
            className="w-full py-4 mt-8 bg-[#FFD600] text-black hover:bg-[#FFCA00] active:bg-[#FFB800] transition-colors"
            onClick={handleContinue}
            disabled={!isPhoneValid}
          >
            Зарегистрироваться
          </Button>
        </div>
      </div>
    )
  }

  return null
}
