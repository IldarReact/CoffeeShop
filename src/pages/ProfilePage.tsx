import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { useAuth } from "../features/auth/context/AuthContext"
import { useEffect } from "react"
import { useOrders } from "../features/orders/context/OrdersContext"
import { useDrinkModal } from "../features/drinks/context/DrinkModalContext"

export default function ProfilePage() {
  const navigate = useNavigate()
  const { isAuthenticated, phoneNumber, bonusPoints } = useAuth()
  const { orders } = useOrders()
  const { openModal } = useDrinkModal()

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate("/auth/register")
      return
    }
  }, [isAuthenticated, navigate])

  const handleRepeatOrder = (order: any) => {
    const drinkId = order.drinkId
    const size = order.size.replace(" мл.", "")

    let syrupsParam = ""
    if (order.syrup && Object.values(order.syrup).some((val: any) => val > 0)) {
      syrupsParam = `&syrups=${encodeURIComponent(JSON.stringify(order.syrup))}`
    }

    // Перенаправляем на страницу выбора бонусных опций вместо страницы оплаты
    // Это позволит пользователю решить, хочет ли он потратить или получить бонусы
    navigate(
      `/auth/bonus-options?drinkId=${drinkId}&size=${size}&price=${order.price - (order.syrupPrice || 0)}&syrupPrice=${order.syrupPrice || 0}${syrupsParam}`,
    )
  }

  const handleEditOrder = (order: any) => {
    // Open the drink modal with the same drink for editing
    openModal(order.drinkId)

    // Pass the syrup data to the modal for editing
    if (order.syrup) {
      const syrupsParam = encodeURIComponent(JSON.stringify(order.syrup))
      navigate(`/?edit=true&size=${order.size}&syrups=${syrupsParam}`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="p-4 bg-white flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-gray-100">
          <ChevronLeft size={24} />
        </button>

        <div className="flex items-center gap-2">
          <div className="bg-[#FFD600] w-10 h-10 rounded-full flex items-center justify-center">
            <img src="/images/other/ruble.svg" alt="валюта" className="h-4 w-auto" />
          </div>
          <span className="font-medium">{bonusPoints} бонусов</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="bg-[#FFD600] rounded-full p-2 flex items-center gap-1">
           <img src="/images/other/phone.svg" alt="телефон" className="h-4 w-auto" />
            <span className="text-sm hidden sm:inline">{phoneNumber}</span>
          </button>
        </div>
      </div>

      {/* Order History */}
      <div className="flex-1 p-4 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">История заказов</h2>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>У вас пока нет заказов</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg p-4 flex">
                <div className="w-16 h-16 mr-3 flex-shrink-0">
                  <img
                    src={order.image}
                    alt={order.drinkName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{order.drinkName}</h3>
                      <p className="text-xl font-bold">{order.price}₽</p>
                      <p className="text-gray-500 text-sm">{order.size}</p>

                      {order.syrup && Object.entries(order.syrup).some(([_, value]) => value > 0) && (
                        <p className="text-gray-500 text-sm">
                          {Object.entries(order.syrup)
                            .filter(([_, value]) => value > 0)
                            .map(([key, value]) => {
                              const syrupNames: Record<string, string> = {
                                vanilla: "Ванильный сироп",
                                mint: "Мятный сироп",
                                caramel: "Карамельный сироп",
                                chocolate: "Шоколадный сироп",
                              }
                              return `${syrupNames[key]} ${value} гр.`
                            })
                            .join(", ")}
                        </p>
                      )}

                      {(order.bonusEarned || order.bonusUsed) && (
                        <div className="flex items-center mt-1">
                          <div className="w-5 h-5 bg-[#FFD600] rounded-full flex items-center justify-center mr-1">
                            <img src="/images/other/ruble.svg" alt="валюта" className="h-4 w-auto" />
                          </div>
                          <span className="text-sm">
                            {order.bonusEarned ? `+${order.bonusEarned} бонусов` : `−${order.bonusUsed} бонусов`}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        className="bg-[#FFD600] text-black font-medium py-2 px-4 rounded-lg"
                        onClick={() => handleRepeatOrder(order)}
                      >
                        Повторить
                      </button>
                      <button className="text-black font-medium py-2 px-4" onClick={() => handleEditOrder(order)}>
                        Редактировать
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
