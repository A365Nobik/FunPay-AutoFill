export default function TextArea({ label, name, placeholder = "" }) {
  return (
    <div className="flex flex-col justify-center items-start space-y-2 animate-fade-in">
      <label
        className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wide"
        htmlFor={name}
      >
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        className="
          bg-[var(--bg-secondary)] 
          border-2 
          border-[var(--border-color)] 
          rounded-xl 
          w-80 
          h-25 
          resize-none 
          outline-none 
          transition-all 
          duration-200 
          ease-out
          px-4 
          py-3
          text-[var(--text-primary)]
          placeholder-[var(--text-muted)]
          focus:border-[var(--border-accent)]
          focus:ring-2
          focus:ring-[var(--border-accent)]
          focus:ring-opacity-20
          hover:border-[var(--bg-tertiary)]
          shadow-md
          hover:shadow-lg
        "
      />
    </div>
  );
}
