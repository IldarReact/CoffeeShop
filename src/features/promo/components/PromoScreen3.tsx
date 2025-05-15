import { useLayoutEffect, useState, useRef } from "react"
import { LoadingSpinner } from "./LoadingSpinner"
import { AnimationStyles } from "./AnimationStyles"

interface PromoScreen3Props {
  onNext: () => void
}

export default function PromoScreen3({ onNext }: PromoScreen3Props) {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const imagesRef = useRef<HTMLImageElement[]>([])

  const imagePaths = [
    "/images/promo/minCoffee1.svg",
    "/images/promo/minCoffee2.svg",
    "/images/promo/minCoffee3.svg",
    "/images/promo/minCoffee4.svg",
    "/images/promo/minCoffee5.svg",
    "/images/promo/Cup1.svg",
    "/images/promo/Cup2.svg",
    "/images/promo/backWhiteDesign.svg",
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
    <div className="h-full flex flex-col items-center justify-center" style={{ backgroundColor: "#E8C40F" }}>
      <div
        className="relative w-full h-full overflow-hidden"
        onClick={() => {
          localStorage.setItem("welcomeSeen", "true")
          onNext()
        }}
      >
        <img
          src="/images/promo/minCoffee1.svg"
          alt="Кофейное зерно"
          className="absolute w-10 h-auto top-[6%] left-[15%] z-[2]"
        />
        <img
          src="/images/promo/minCoffee3.svg"
          alt="Кофейное зерно"
          className="absolute w-14 h-auto top-[20%] right-[15%] z-[2]"
        />
        <img
          src="/images/promo/minCoffee5.svg"
          alt="Кофейное зерно"
          className="absolute w-12 h-auto top-[2%] right-[10%] z-[2]"
        />
        <img
          src="/images/promo/minCoffee4.svg"
          alt="Кофейное зерно"
          className="absolute w-16 h-auto top-[9%] left-[40%] z-[2]"
        />
        <img
          src="/images/promo/minCoffee2.svg"
          alt="Кофейное зерно"
          className="absolute w-30 h-auto bottom-[24%] left-[15%] z-[2]"
        />
        <img
          src="/images/promo/minCoffee3.svg"
          alt="Кофейное зерно"
          className="absolute w-14 h-auto bottom-[30%] right-[15%] z-[2]"
        />

        <img
          src="/images/promo/Cup1.svg"
          alt="Чашка кофе"
          className="absolute h-[250px] w-auto bottom-[0%] left-[0%] z-[1]"
        />

        <img
          src="/images/promo/Cup2.svg"
          alt="Чашка кофе"
          className="absolute h-[400px] w-auto top-[20%] right-[0%] z-[1]"
        />

        <h2 className="absolute top-[28%] left-5 text-[77px] font-bold text-black z-10 leading-[1.2] m-0">
          ЭТО
          <br />
          ТВОЙ
          <br />
          КОФЕ
        </h2>

        <img
          src="/images/promo/backWhiteDesign.svg"
          alt="Фоновый элемент"
          className="absolute w-110 h-110 bottom-[0%] right-[0%] z-[0]"
        />

        <span className="absolute bottom-[5%] right-20 text-black font-semibold text-xl text-center z-[1] animate-textFadeIn">
          Коснитесь
          <br />
          экрана
        </span>
      </div>

      <AnimationStyles />
    </div>
  )
}
