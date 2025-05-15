import { useLayoutEffect, useState, useRef } from "react"
import { AnimationStyles } from "./AnimationStyles"
import { LoadingSpinner } from "./LoadingSpinner"

interface PromoScreen2Props {
  onNext: () => void
}

export default function PromoScreen2({ onNext }: PromoScreen2Props) {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const imagesRef = useRef<HTMLImageElement[]>([])

  const imagePaths = [
    "/images/promo/minCoffee1.svg",
    "/images/promo/minCoffee2.svg",
    "/images/promo/minCoffee3.svg",
    "/images/promo/minCoffee4.svg",
    "/images/promo/minCoffee5.svg",
    "/images/promo/sun.svg",
    "/images/promo/BoomerangYellow.svg",
    "/images/promo/glassesYellow.svg",
    "/images/promo/minYellowDesign.svg",
    "/images/promo/BackDesign.svg",
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
      <div className="relative w-full h-full overflow-hidden" onClick={onNext}>
        <img
          src="/images/promo/minCoffee1.svg"
          alt="Кофейное зерно"
          className="absolute w-8 h-8 top-[6%] right-[45%] z-[2]"
        />
        <img
          src="/images/promo/minCoffee3.svg"
          alt="Кофейное зерно"
          className="absolute w-14 h-14 top-[20%] right-[15%] z-[2]"
        />
        <img
          src="/images/promo/minCoffee5.svg"
          alt="Кофейное зерно"
          className="absolute w-8 h-8 top-[26%] left-[11%] z-[2]"
        />
        <img
          src="/images/promo/minCoffee4.svg"
          alt="Кофейное зерно"
          className="absolute w-18 h-18 bottom-[39%] left-[12%] z-[2]"
        />
        <img
          src="/images/promo/minCoffee2.svg"
          alt="Кофейное зерно"
          className="absolute w-30 h-30 bottom-[24%] right-[15%] z-[2]"
        />

        <img
          src="/images/promo/minYellowDesign.svg"
          alt="Декоративный элемент"
          className="absolute w-10 h-10 bottom-[37%] left-[3%] z-[1]"
        />

        <img src="/images/promo/sun.svg" alt="Солнце" className="absolute w-30 h-30 top-[27%] right-[20%] z-[1]" />

        <img
          src="/images/promo/BoomerangYellow.svg"
          alt="Декоративный элемент"
          className="absolute h-[350px] w-auto top-0 left-[4%] z-0"
        />

        <img
          src="/images/promo/glassesYellow.svg"
          alt="Стаканы с кофе"
          className="absolute h-[400px] w-auto top-[35%] left-[2%] z-[1]"
        />

        <img
          src="/images/promo/minYellowDesign.svg"
          alt="Декоративный элемент"
          className="absolute w-4 h-4 bottom-[35%] right-[6%] z-[1]"
        />

        <img
          src="/images/promo/BackDesign.svg"
          alt="Фоновый элемент"
          className="absolute w-full h-auto bottom-0 right-0 z-0"
        />

        <h2 className="absolute top-[20%] left-1/2 transform -translate-x-1/2 text-5xl font-bold text-black text-center z-10 leading-[1.2] m-0">
          ЭТО
          <br />
          <span className="bg-[#FFD600] rounded">ТВОЙ</span>
          <br />
          КОФЕ
        </h2>

        <span className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 text-black font-semibold text-xl text-center z-[1] animate-textFadeIn">
          Коснитесь экрана, чтобы начать
        </span>
      </div>

      <AnimationStyles />
    </div>
  )
}
