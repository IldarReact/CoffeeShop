import { useEffect, useState } from "react"
import { useAuth } from "../features/auth/context/AuthContext"
import Router from "./Router"

function App() {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const welcomeSeen = localStorage.getItem("welcomeSeen")
    setHasSeenWelcome(!!welcomeSeen)
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[414px] h-[896px] bg-white overflow-y-auto relative mx-auto shadow-xl rounded-3xl">
        <Router isAuthenticated={isAuthenticated} hasSeenWelcome={hasSeenWelcome} />
      </div>
    </div>
  )
}

export default App