interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="w-full text-center">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
    </header>
  )
}
