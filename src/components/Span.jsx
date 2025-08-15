import { spanClass } from "../constants";

export default function Span({ customClass,children, ...props }) {
  return (
    <span {...props} className={spanClass+" "+customClass}>
      {children}
    </span>
  );
}
