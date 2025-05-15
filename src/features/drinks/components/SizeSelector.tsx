interface SizeSelectorProps {
  selectedSize: string
  onSelectSize: (size: string) => void
}

export default function SizeSelector({ selectedSize, onSelectSize }: SizeSelectorProps) {
  return (
    <div className="flex justify-between gap-2">
      <button
        className={`flex-1 p-3 flex flex-col items-center ${
          selectedSize === "200" ? "bg-[#FFD600]" : "bg-[#F8F8F8]"
        } rounded-lg`}
        onClick={() => onSelectSize("200")}
      >
        <div className="w-10 h-10 mb-1 flex items-center justify-center">
          <img src="/images/other/glasses.png" alt="200 мл" className="h-8 w-auto object-contain" />
        </div>
        <span className="font-medium text-sm">200 мл.</span>
      </button>

      <button
        className={`flex-1 p-3 flex flex-col items-center ${
          selectedSize === "300" ? "bg-[#FFD600]" : "bg-[#F8F8F8]"
        } rounded-lg`}
        onClick={() => onSelectSize("300")}
      >
        <div className="w-10 h-10 mb-1 flex items-center justify-center">
          <img src="/images/other/glasses.png" alt="300 мл" className="h-10 w-auto object-contain" />
        </div>
        <span className="font-medium text-sm">300 мл.</span>
      </button>

      <button
        className={`flex-1 p-3 flex flex-col items-center ${
          selectedSize === "400" ? "bg-[#FFD600]" : "bg-[#F8F8F8]"
        } rounded-lg`}
        onClick={() => onSelectSize("400")}
      >
        <div className="w-10 h-10 mb-1 flex items-center justify-center">
          <img src="/images/other/glasses.png" alt="400 мл" className="h-12 w-auto object-contain" />
        </div>
        <span className="font-medium text-sm">400 мл.</span>
      </button>
    </div>
  )
}
