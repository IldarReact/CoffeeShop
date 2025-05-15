import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  phoneNumber: string | null
  bonusPoints: number
  register: (phone: string, code: string) => void
  login: (phone: string) => void
  verify: (phone: string, code: string) => void
  logout: () => void
  addBonusPoints: (points: number) => void
  useBonusPoints: (points: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null)
  const [bonusPoints, setBonusPoints] = useState(0)

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth")
    if (storedAuth) {
      const { isAuthenticated, phoneNumber, bonusPoints } = JSON.parse(storedAuth)
      setIsAuthenticated(isAuthenticated)
      setPhoneNumber(phoneNumber)
      setBonusPoints(bonusPoints)
    }
  }, [])

  // Save auth state to localStorage when it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticated,
          phoneNumber,
          bonusPoints,
        }),
      )
    } else {
      localStorage.removeItem("auth")
    }
  }, [isAuthenticated, phoneNumber, bonusPoints])

  const register = (phone: string) => {
    setIsAuthenticated(true)
    setPhoneNumber(phone)
    setBonusPoints(120)
  }

  const login = (phone: string) => {
    setPhoneNumber(phone)
  }

  const verify = (phone: string) => {
    setIsAuthenticated(true)
    setPhoneNumber(phone)
    setBonusPoints(120)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setPhoneNumber(null)
    setBonusPoints(0)
  }

  const addBonusPoints = (points: number) => {
    if (points <= 0) return

    setBonusPoints((prev) => {
      const newTotal = prev + points
      return newTotal
    })
  }

  const useBonusPoints = (points: number) => {
    setBonusPoints((prev) => {
      const newTotal = Math.max(0, prev - points)
      return newTotal
    })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        phoneNumber,
        bonusPoints,
        register,
        login,
        verify,
        logout,
        addBonusPoints,
        useBonusPoints,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
