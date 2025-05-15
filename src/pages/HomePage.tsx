import { useState } from "react"
import { Link } from "react-router-dom"
import { Phone } from "lucide-react"
import CategoryTabs from "../features/drinks/components/CategoryTabs"
import DrinkGrid from "../features/drinks/components/DrinkGrid"
import { categories } from "../features/drinks/data/DrinksData"
import { useAuth } from "../features/auth/context/AuthContext"
import LoyaltyBadge from "../features/auth/components/LoyaltyBadge"
import DrinkModal from "../features/drinks/components/DrinkModal"
import { useDrinkModal } from "../features/drinks/context/DrinkModalContext"
import ProfileButton from "../features/auth/components/ProfileButton"
import PromoTester from "../features/promo/components/PromoTester"

const categoryColors: Record<string, string> = {
  coffee: "#EFCCB9",
  tea: "#C9EA94",
  milkshake: "#F9ECD2",
  soda: "#FFE665",
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const { isAuthenticated } = useAuth()
  const { isOpen } = useDrinkModal()

  const activeCategoryColor = categoryColors[activeCategory] || "#FFFFFF"
  const activeCategoryName = categories.find((c) => c.id === activeCategory)?.name || ""

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div
        className="flex justify-between items-center p-4"
        style={{ backgroundColor: activeCategoryColor, transition: "background-color 0.3s" }}
      >
        <h1 className="text-xl font-bold text-black">Выбор напитка</h1>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <LoyaltyBadge />
          ) : (
            <Link
              to="/auth/register"
              className="flex items-center gap-1 bg-[#FFD600] rounded-full px-3 py-1 text-sm text-black"
            >
              <Phone size={14} />
              <span>Вход / регистрация</span>
            </Link>
          )}
          <ProfileButton />
        </div>
      </div>

      <div style={{ backgroundColor: activeCategoryColor, transition: "background-color 0.3s" }}>
        <div className="w-full rounded-t-lg bg-gray-200">
          <CategoryTabs categories={categories} activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        </div>
      </div>

      <div className="px-3 py-4 relative flex items-center rounded-t-lg">
        <div
          style={{ backgroundColor: activeCategoryColor }}
          className="absolute top-1 left-[-5px] w-14 h-14 rounded-full mr-3 mt-4 flex items-center justify-center"
        ></div>
        <h2 className="text-2xl font-semibold text-black mt-4 relative z-10">{activeCategoryName}</h2>
      </div>

      <div className="flex-1 bg-white w-full rounded-t-[20px]">
        <div className="px-6 py-6">
          <DrinkGrid categoryId={activeCategory} />
        </div>
      </div>

      {isOpen && <DrinkModal />}

      <PromoTester />
    </main>
  )
}
