import type { Category } from "../data/DrinksData"

const categoryColors: Record<string, string> = {
  coffee: "#EFCCB9",
  tea: "#C9EA94",
  milkshake: "#F9ECD2",
  soda: "#FFE665",
}

interface CategoryTabsProps {
  categories: Category[]
  activeCategory: string
  onSelectCategory: (categoryId: string) => void
}

export default function CategoryTabs({ categories, activeCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="grid grid-cols-4">
      {categories.map((category) => {
        const isActive = activeCategory === category.id

        return (
          <button
            key={category.id}
            className={`flex h-auto flex-col items-center justify-center py-2 px-1 relative transition-colors duration-200 rounded-t-lg ${isActive ? "bg-[#F3F3F3]" : ""}`}
            onClick={() => onSelectCategory(category.id)}
          >
            <div className="relative mb-1">
              <div
                className="absolute top-[27%] left-[17%] w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: isActive ? categoryColors[category.id] : "", zIndex: 0 }}
              ></div>
              <img
                src={category.icon}
                alt={category.name}
                className={`object-contain w-auto h-20 ${isActive ? "" : "filter grayscale"}`}
                style={{ position: "relative", zIndex: 200 }}
              />
            </div>
            <span className={`text-xs text-center text-black z-10 ${isActive ? "font-bold" : "font-normal"}`}>
              {category.name}
            </span>
            {isActive && (
              <>
                <div
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: "16px solid transparent",
                    borderRight: "16px solid transparent",
                    borderTop: `16px solid #F3F3F3`,
                    zIndex: 300,
                  }}
                />
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}