import { useLayoutEffect, useState, useRef } from "react"
import { AnimationStyles } from "./AnimationStyles"
import { LoadingSpinner } from "./LoadingSpinner"

interface PromoScreen1Props {
  onNext: () => void
}

export default function PromoScreen1({ onNext }: PromoScreen1Props) {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const imagesRef = useRef<HTMLImageElement[]>([])

  const imagePaths = [
    "/images/promo/minCoffee1.svg",
    "/images/promo/minCoffee2.svg",
    "/images/promo/minCoffee3.svg",
    "/images/promo/minCoffee4.svg",
    "/images/promo/sun.svg",
    "/images/promo/Boomerang.svg",
    "/images/promo/HandWithCoffee.svg",
  ]

  useLayoutEffect(() => {
    let loadedCount = 0
    const totalImages = imagePaths.length

    imagesRef.current = imagePaths.map(() => new Image())

    imagesRef.current.forEach((img, index) => {
      img.onload = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
      img.onerror = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
      img.src = imagePaths[index]
      img.crossOrigin = "anonymous"
    })

    return () => {
      imagesRef.current.forEach((img) => {
        img.onload = null
        img.onerror = null
      })
    }
  }, [])

  if (!imagesLoaded) {
    return <LoadingSpinner />
  }

  return (
    <div className="h-full flex flex-col items-center justify-center" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="relative w-full h-full overflow-hidden">
        <img
          src="/images/promo/minCoffee1.svg"
          alt="Кофейное зерно"
          className="absolute w-8 h-8"
          style={{
            top: "6%",
            right: "45%",
            zIndex: 2,
          }}
        />
        <img
          src="/images/promo/minCoffee3.svg"
          alt="Кофейное зерно"
          className="absolute w-14 h-14"
          style={{
            top: "19%",
            right: "13%",
            zIndex: 2,
          }}
        />
        <img
          src="/images/promo/minCoffee4.svg"
          alt="Кофейное зерно"
          className="absolute w-18 h-18"
          style={{
            bottom: "29%",
            left: "12%",
            zIndex: 2,
          }}
        />
        <img
          src="/images/promo/minCoffee2.svg"
          alt="Кофейное зерно"
          className="absolute w-30 h-30"
          style={{
            bottom: "14%",
            right: "10%",
            zIndex: 2,
          }}
        />

        <img
          src="/images/promo/sun.svg"
          alt="Солнце"
          className="absolute w-30 h-30"
          style={{
            top: "35%",
            right: "25%",
            zIndex: 1,
          }}
        />

        <img
          src="/images/promo/Boomerang.svg"
          alt="Декоративный элемент"
          className="absolute h-[450px] w-auto"
          style={{
            top: "20%",
            left: "4%",
            zIndex: 0,
          }}
        />

        <img
          src="/images/promo/HandWithCoffee.svg"
          alt="Рука с кофе"
          className="absolute h-[400px] w-auto"
          style={{
            top: "27%",
            left: "0%",
            zIndex: 1,
          }}
        />
      </div>

      <div className="w-full flex justify-center mb-10">
        <button
          onClick={onNext}
          className="bg-[#FFD600] text-black font-semibold w-40 h-40 p-1 rounded-[60px] text-xl shadow-md hover:bg-[#FFCA00] transition-colors flex items-center justify-center overflow-hidden animate-textFadeIn"
          style={{
            backgroundColor: "#FFD600",
            color: "#000000",
          }}
        >
          <span className="block text-center">Нажмите, чтобы начать</span>
        </button>
      </div>

      <AnimationStyles />
    </div>
  )
}
