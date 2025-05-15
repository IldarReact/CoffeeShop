interface PaymentButtonProps {
  type: "cash" | "card"
  onClick: () => void
}

export default function PaymentButton({ type, onClick }: PaymentButtonProps) {
  const isCard = type === "card"

  return (
    <button
      className={`w-48 h-48 flex flex-col items-center justify-center gap-4 rounded-xl ${
        isCard ? "bg-[#FFD600]" : "bg-[#FFD600]"
      }`}
      onClick={onClick}
    >
      {isCard ? (
        <div className="w-16 h-16 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="black" strokeWidth="2" />
            <path d="M3 10H21" stroke="black" strokeWidth="2" />
            <path d="M7 15H13" stroke="black" strokeWidth="2" />
          </svg>
        </div>
      ) : (
        <div className="w-16 h-16 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="6" width="20" height="12" rx="1" stroke="black" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" stroke="black" strokeWidth="2" />
          </svg>
        </div>
      )}
      <span className="text-xl font-medium">{isCard ? "Карта" : "Наличные"}</span>
    </button>
  )
}
