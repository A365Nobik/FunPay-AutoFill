export default function Button({  bgColor, children, id ,...props }) {
  return (
    <div>
      <button
        {...props}
        id={id}
        type="submit"
        className={`${bgColor} p-2 rounded-md w-30 cursor-pointer text-lg`}
      >
        {children}
      </button>
    </div>
  );
}
