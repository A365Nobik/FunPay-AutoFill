export default function TextArea({ label, name,...props }) {
  const textAreaClass =
    "bg-[var(--bg-secondary)] border-2 rounded-md w-80 resize-none h-25 outline-0 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 plaseholder:text-[var(--text-primary)]";
  return (
    <span className="flex flex-col justify-center items-start">
      <label className="w-80" htmlFor={name}>{label}</label>
      <textarea
      {...props}
        className={textAreaClass}
        type="text"
      />
    </span>
  );
}
