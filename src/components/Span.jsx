import { spanClass } from "../constants";

export default function Span({ children, ...props }) {
  return (
    <span {...props} className={spanClass}>
      {children}
    </span>
  );
}
