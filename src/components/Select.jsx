import { memo, useCallback } from "react";
import { optClass } from "../constants/classes";

const Select = memo(({ options, setIsItems, ...props }) => {
  const handelSelctChange = useCallback(
    (event) => {
      const value = event.target.value;
      if (value === "Предметы") {
        setIsItems(true);
      } else {
        setIsItems(false);
      }
    },
    [setIsItems]
  );

  return (
    <select
      className="bg-[var(--bg-secondary)] w-25 rounded-md border-1 transition-colors focus:border-blue-500 outline-0"
      onChange={setIsItems ? handelSelctChange : null}
      {...props}
    >
      <option className="bg-[var(--bg-primary)]" value=""></option>
      {options.map((opt, idx) => (
        <option key={idx} className={optClass} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
});
export default Select;
