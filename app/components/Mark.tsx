export function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="28.5" cy="28.5" r="16.5" stroke="#15191E" strokeWidth="6.5" />
      <path d="M36.2 36.2 L54 54" stroke="#A36B38" strokeWidth="6.5" strokeLinecap="butt" />
    </svg>
  );
}

export function MarkOnInk({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="28.5" cy="28.5" r="16.5" stroke="#F6F1EA" strokeWidth="6.5" />
      <path d="M36.2 36.2 L54 54" stroke="#C4845A" strokeWidth="6.5" strokeLinecap="butt" />
    </svg>
  );
}
