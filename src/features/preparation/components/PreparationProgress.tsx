import { useEffect, useState } from "react"

interface PreparationProgressProps {
  progress: number
}

export default function PreparationProgress({ progress }: PreparationProgressProps) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    setDisplayProgress(progress)
  }, [progress])

  return (
    <div className="w-full">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#FFD600] transition-all duration-100 ease-linear"
          style={{ width: `${displayProgress}%` }}
        ></div>
      </div>
    </div>
  )
}
