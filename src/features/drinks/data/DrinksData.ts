export interface Category {
  id: string
  name: string
  icon: string
}

export interface Drink {
  id: string
  categoryId: string
  name: string
  description: string
  price: number
  image: string
  isSpecial?: boolean
}

export const categories: Category[] = [
  {
    id: "coffee",
    name: "Кофе",
    icon: "/images/glasses/15.svg",
  },
  {
    id: "tea",
    name: "Чай",
    icon: "/images/glasses/2.svg",
  },
  {
    id: "milkshake",
    name: "Молочный коктейль",
    icon: "/images/glasses/3.svg",
  },
  {
    id: "soda",
    name: "Морсы и газ. напитки",
    icon: "/images/glasses/4.svg",
  },
]

export const drinksData: Drink[] = [
  // Coffee
  {
    id: "espresso",
    categoryId: "coffee",
    name: "Эспрессо",
    description: "Классический крепкий кофе",
    price: 79,
    image: "/images/glasses/11.svg",
  },
  {
    id: "espresso-double",
    categoryId: "coffee",
    name: "Эспрессо 2x",
    description: "Двойная порция эспрессо",
    price: 109,
    image: "/images/glasses/11.svg",
  },
  {
    id: "americano",
    categoryId: "coffee",
    name: "Американо",
    description: "Эспрессо с добавлением горячей воды",
    price: 119,
    image: "/images/glasses/13.svg",
  },
  {
    id: "latte",
    categoryId: "coffee",
    name: "Латте",
    description: "Эспрессо с молоком и небольшим количеством молочной пены",
    price: 129,
    image: "/images/glasses/14.svg",
  },
  {
    id: "cappuccino",
    categoryId: "coffee",
    name: "Капучино",
    description: "Эспрессо с добавлением взбитого молока",
    price: 129,
    image: "/images/glasses/15.svg",
  },
  {
    id: "macchiato",
    categoryId: "coffee",
    name: "Макиато",
    description: "Эспрессо с небольшим количеством молочной пены",
    price: 129,
    image: "/images/glasses/16.svg",
  },

  // Tea
  {
    id: "black-tea",
    categoryId: "tea",
    name: "Черный чай",
    description: "Классический черный чай",
    price: 79,
    image: "/images/glasses/11.svg",
  },
  {
    id: "green-tea",
    categoryId: "tea",
    name: "Зеленый чай",
    description: "Классический зеленый чай",
    price: 79,
    image: "/images/glasses/11.svg",
  },
  {
    id: "fruit-tea",
    categoryId: "tea",
    name: "Фруктовый чай",
    description: "Чай с добавлением фруктов",
    price: 109,
    image: "/images/glasses/13.svg",
  },

  // Milkshakes
  {
    id: "vanilla-milkshake",
    categoryId: "milkshake",
    name: "Ванильный коктейль",
    description: "Молочный коктейль с ванильным сиропом",
    price: 129,
    image: "/images/glasses/11.svg",
  },
  {
    id: "chocolate-milkshake",
    categoryId: "milkshake",
    name: "Шоколадный коктейль",
    description: "Молочный коктейль с шоколадным сиропом",
    price: 129,
    image: "/images/glasses/11.svg",
  },
  {
    id: "strawberry-milkshake",
    categoryId: "milkshake",
    name: "Клубничный коктейль",
    description: "Молочный коктейль с клубничным сиропом",
    price: 129,
    image: "/images/glasses/13.svg",
  },

  // Sodas
  {
    id: "cranberry-juice",
    categoryId: "soda",
    name: "Клюквенный морс",
    description: "Освежающий клюквенный морс",
    price: 89,
    image: "/images/glasses/11.svg",
  },
  {
    id: "cola",
    categoryId: "soda",
    name: "Кола",
    description: "Классическая газированная кола",
    price: 99,
    image: "/images/glasses/11.svg",
  },
  {
    id: "lemonade",
    categoryId: "soda",
    name: "Лимонад",
    description: "Освежающий лимонад",
    price: 99,
    image: "/images/glasses/13.svg",
  },
]
