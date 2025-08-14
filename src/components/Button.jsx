export default function Button({  bgColor, children, ...props }) {
  return (
    <div>
      <button
        {...props}
        type="submit"
        className={`${bgColor} p-2 rounded-md w-30 cursor-pointer text-lg`}
      >
        {children}
      </button>
    </div>
  );
}
