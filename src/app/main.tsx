import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App"
import { ThemeProvider } from "../shared/components/ThemeProvider"
import { AuthProvider } from "../features/auth/context/AuthContext"
import { EmulatorProvider } from "../features/emulator/context/EmulatorContext"
import { DrinkModalProvider } from "../features/drinks/context/DrinkModalContext"
import { OrdersProvider } from "../features/orders/context/OrdersContext"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="coffee-shop-theme">
        <EmulatorProvider>
          <AuthProvider>
            <OrdersProvider>
              <DrinkModalProvider>
                <App />
              </DrinkModalProvider>
            </OrdersProvider>
          </AuthProvider>
        </EmulatorProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
