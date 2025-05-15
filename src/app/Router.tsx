import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "../pages/HomePage"
import DrinkPage from "../pages/DrinkPage"
import PaymentPage from "../pages/PaymentPage"
import CardPaymentPage from "../pages/CardPaymentPage"
import CashPaymentPage from "../pages/CashPaymentPage"
import PreparationPage from "../pages/PreparationPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import VerifyPage from "../pages/VerifyPage"
import LoyaltyPromptPage from "../pages/LoyaltyPromptPage"
import BonusOptionsPage from "../pages/BonusOptionsPage"
import ProfilePage from "../pages/ProfilePage"
import WelcomePage from "../pages/WelcomePage"

interface AppRouterProps {
  isAuthenticated: boolean
  hasSeenWelcome: boolean
}

export default function Router({ isAuthenticated, hasSeenWelcome }: AppRouterProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated || hasSeenWelcome ? <HomePage /> : <Navigate to="/welcome" replace />}
      />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/drink/:drinkId" element={<DrinkPage />} />
      <Route path="/payment/:drinkId" element={<PaymentPage />} />
      <Route path="/card-payment/:drinkId" element={<CardPaymentPage />} />
      <Route path="/cash-payment/:drinkId" element={<CashPaymentPage />} />
      <Route path="/preparation/:drinkId" element={<PreparationPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/verify" element={<VerifyPage />} />
      <Route path="/auth/loyalty-prompt" element={<LoyaltyPromptPage />} />
      <Route path="/auth/bonus-options" element={<BonusOptionsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}