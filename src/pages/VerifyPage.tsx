import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { Button } from "../shared/components/Button"
import { useAuth } from "../features/auth/context/AuthContext"
import type React from "react"

export default function VerifyPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const phoneNumber = searchParams.get("phone") || "+7 000 000-00-00"
  const { verify } = useAuth()

  const drinkId = searchParams.get("drinkId")
  const size = searchParams.get("size")
  const price = searchParams.get("price")
  const syrupPrice = searchParams.get("syrupPrice")

  const [verificationCode, setVerificationCode] = useState(["", "", "", ""])

  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      setVerificationCode((prev) => {
        let lastNonEmptyIndex = -1
        for (let i = prev.length - 1; i >= 0; i--) {
          if (prev[i] !== "") {
            lastNonEmptyIndex = i
            break
          }
        }

        if (lastNonEmptyIndex === -1) return prev
        const newCode = [...prev]
        newCode[lastNonEmptyIndex] = ""
        return newCode
      })
      return
    }

    setVerificationCode((prev) => {
      const firstEmptyIndex = prev.findIndex((digit) => digit === "")
      if (firstEmptyIndex === -1) return prev
      const newCode = [...prev]
      newCode[firstEmptyIndex] = key
      return newCode
    })
  }

  const handleVerify = () => {
    const code = verificationCode.join("")
    verify(phoneNumber, code)

    if (drinkId && size && price) {
      navigate(`/auth/bonus-options?drinkId=${drinkId}&size=${size}&price=${price}&syrupPrice=${syrupPrice || 0}`)
    } else {
      navigate("/")
    }
  }

  const isCodeValid = verificationCode.every((digit) => digit !== "")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (/^\d$/.test(e.key) || e.key === "Backspace" || e.key === "Delete" || e.key === "Tab" || e.key === "Enter") {
      if (/^\d$/.test(e.key)) {
        handleKeyPress(e.key)
      } else if (e.key === "Backspace") {
        handleKeyPress("backspace")
      } else if (e.key === "Enter" && isCodeValid) {
        handleVerify()
      }
    } else {
      e.preventDefault()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="p-4 border-b">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-xs">
          <div className="mb-8 text-center text-gray-600">
            Введите код-смс которое пришло вам на телефон для подтверждения оплаты
          </div>

          <div className="flex justify-center gap-4 mb-8" tabIndex={0} onKeyDown={handleKeyDown}>
            {verificationCode.map((digit, index) => (
              <div
                key={index}
                className="w-16 h-16 border-2 rounded-full flex items-center justify-center text-2xl font-medium"
              >
                {digit}
              </div>
            ))}
          </div>

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

          <Button
            className="w-full py-4 mt-8 bg-[#FFD600] text-black hover:bg-[#FFCA00] active:bg-[#FFB800] transition-colors"
            onClick={handleVerify}
            disabled={!isCodeValid}
          >
            Отправить
          </Button>
        </div>
      </div>
    </div>
  )
}
