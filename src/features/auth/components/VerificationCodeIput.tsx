interface VerificationCodeInputProps {
  code: string[]
}

export default function VerificationCodeInput({ code }: VerificationCodeInputProps) {
  return (
    <div className="flex justify-center gap-4">
      {code.map((digit, index) => (
        <div
          key={index}
          className="w-16 h-16 border-2 rounded-full flex items-center justify-center text-2xl font-medium"
        >
          {digit}
        </div>
      ))}
    </div>
  )
}
