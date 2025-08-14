export default function TextArea({ label, name }) {
  const textAreaClass =
    "bg-[var(--bg-secondary)] border-2 rounded-md w-80 resize-none h-25 outline-0 transition-colors focus:border-blue-500";
  return (
    <span className="flex flex-col justify-center items-start">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        className={textAreaClass}
        id={name}
        type="text"
      />
    </span>
  );
}
