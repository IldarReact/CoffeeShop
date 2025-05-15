interface PhoneInputProps {
  value: string
}

export default function PhoneInput({ value }: PhoneInputProps) {
  return <div className="text-3xl font-medium">{value}</div>
}
