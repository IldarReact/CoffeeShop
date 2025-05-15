export function AnimationStyles() {
  return (
    <style>
      {`
        @keyframes textFadeIn {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-textFadeIn {
          animation: textFadeIn 0.5s ease-out forwards;
        }
      `}
    </style>
  )
}
