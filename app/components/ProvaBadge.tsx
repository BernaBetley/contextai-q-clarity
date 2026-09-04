export function ProvaBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`prova-badge ${className}`}>{children}</span>;
}
