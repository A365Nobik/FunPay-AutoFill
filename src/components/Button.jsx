export default function Button({  bgColor, children, ...props }) {
  return (
      <button
        {...props}
        type="submit"
        className={`${bgColor} p-2 rounded-md w-45 cursor-pointer text-lg transition-transform duration-200 hover-lift`}
      >
        {children}
      </button>
  );
}
