import { CheckCircle, XCircle, Coffee } from "lucide-react"

interface PreparationStatusProps {
  drinkName: string
  status: "preparing" | "success" | "error"
}

export default function PreparationStatus({ drinkName, status }: PreparationStatusProps) {
  return (
    <div className="text-center">
      {status === "preparing" && (
        <>
          <Coffee size={80} className="mx-auto mb-6 text-amber-700 animate-pulse" />
          <h2 className="text-3xl font-bold mb-4">Готовим ваш {drinkName}...</h2>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle size={80} className="mx-auto mb-6 text-green-600" />
          <h2 className="text-3xl font-bold mb-4">Ваш напиток готов!</h2>
          <p className="text-xl">Приятного аппетита!</p>
        </>
      )}

      {status === "error" && (
        <>
          <XCircle size={80} className="mx-auto mb-6 text-red-600" />
          <h2 className="text-3xl font-bold mb-4">Ошибка приготовления напитка</h2>
          <p className="text-xl">Пожалуйста, попробуйте снова</p>
        </>
      )}
    </div>
  )
}
