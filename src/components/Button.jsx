export default function Button({
  bgColor,
  children,
  variant = "default",
  size = "md",
  ...props
}) {
  const baseClasses =
    "font-medium rounded-xl transition-all duration-200 ease-out hover-lift focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]";

  const variants = {
    default:
      "bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] focus:ring-[var(--border-accent)]",
    primary:
      "bg-gradient-to-r from-[var(--bg-accent)] to-[#1d4ed8] text-white hover:from-[#1d4ed8] hover:to-[#1e40af] focus:ring-[var(--bg-accent)]",
    success:
      "bg-gradient-to-r from-[var(--bg-success)] to-[#047857] text-white hover:from-[#047857] hover:to-[#065f46] focus:ring-[var(--bg-success)]",
    danger:
      "bg-gradient-to-r from-[var(--bg-danger)] to-[#b91c1c] text-white hover:from-[#b91c1c] hover:to-[#991b1b] focus:ring-[var(--bg-danger)]",
    warning:
      "bg-gradient-to-r from-[var(--bg-warning)] to-[#b45309] text-white hover:from-[#b45309] hover:to-[#92400e] focus:ring-[var(--bg-warning)]",
    ghost:
      "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] focus:ring-[var(--border-accent)] border border-[var(--border-color)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClass = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      {...props}
      type="submit"
      className={`${baseClasses} ${variantClass} ${sizeClass} shadow-lg hover:shadow-xl`}
    >
      {children}
    </button>
  );
}
