import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useDrinks } from "../../drinks/hooks/useDrinks"

export interface OrderItem {
  id: string
  drinkId: string
  drinkName: string
  price: number
  size: string
  image: string
  syrup?: {
    vanilla: number
    mint: number
    caramel: number
    chocolate: number
  }
  syrupPrice: number
  bonusEarned?: number
  bonusUsed?: number
  date: Date
}

interface OrdersContextType {
  orders: OrderItem[]
  addOrder: (order: Omit<OrderItem, "id" | "date">) => void
  getOrderHistory: () => OrderItem[]
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderItem[]>([])
  const { getDrinkById } = useDrinks()

  useEffect(() => {
    const storedOrders = localStorage.getItem("orderHistory")
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders)
        const ordersWithDates = parsedOrders.map((order: any) => ({
          ...order,
          date: new Date(order.date),
        }))
        setOrders(ordersWithDates)
      } catch (error) {
        // 
      }
    }
  }, [])

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orderHistory", JSON.stringify(orders))
    }
  }, [orders])

  const addOrder = (order: Omit<OrderItem, "id" | "date">) => {
    const drink = getDrinkById(order.drinkId)

    const newOrder: OrderItem = {
      ...order,
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date(),
      image: drink?.image || `/placeholder.svg?height=96&width=96&text=${encodeURIComponent(order.drinkName)}`,
    }

    setOrders((prevOrders) => [newOrder, ...prevOrders])
  }

  const getOrderHistory = () => {
    return orders
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        getOrderHistory,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}
