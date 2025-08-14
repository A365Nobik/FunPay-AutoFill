import { spanClass } from "../constants";

export default function Span({ children, variant = "default", ...props }) {
  const variants = {
    default:
      "flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-md hover:shadow-lg transition-all duration-200 ease-out hover-lift",
    primary:
      "flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[var(--bg-accent)] to-[#1d4ed8] border border-[var(--border-accent)] shadow-lg hover:shadow-xl transition-all duration-200 ease-out hover-lift",
    glass:
      "flex items-center gap-3 p-3 rounded-xl glass border border-[var(--border-color)] shadow-lg hover:shadow-xl transition-all duration-200 ease-out hover-lift",
  };

  const variantClass = variants[variant] || variants.default;

  return (
    <span {...props} className={`${spanClass} ${variantClass} animate-fade-in`}>
      {children}
    </span>
  );
}
