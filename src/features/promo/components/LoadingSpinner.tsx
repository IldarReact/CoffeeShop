export function LoadingSpinner() {
  return (
    <div className="h-full flex flex-col items-center justify-center" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg">Загрузка...</p>
      </div>
    </div>
  )
}
