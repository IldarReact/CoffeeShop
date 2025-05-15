interface NumericKeypadProps {
  onKeyPress: (key: string) => void
}

export default function NumericKeypad({ onKeyPress }: NumericKeypadProps) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace"]

  return (
    <div className="grid grid-cols-3 gap-4">
      {keys.map((key) => (
        <button
          key={key}
          className={`h-16 rounded-full flex items-center justify-center text-2xl font-medium ${
            key === "backspace" ? "col-span-2" : ""
          }`}
          onClick={() => onKeyPress(key)}
        >
          {key === "backspace" ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L2 12L12 22H22V2H12Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M17 8L11 14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 8L17 14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            key
          )}
        </button>
      ))}
    </div>
  )
}
