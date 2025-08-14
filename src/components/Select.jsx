import { memo, useCallback } from "react";
import { optClass } from "../constants/classes";

const Select = memo(({ options, setIsItems, label, ...props }) => {
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
    <div className="flex flex-col space-y-2 animate-fade-in">
      {label && (
        <label className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wide">
          {label}
        </label>
      )}
      <select
        className="
          bg-[var(--bg-secondary)] 
          w-25 
          rounded-xl 
          border-2 
          border-[var(--border-color)]
          transition-all 
          duration-200 
          ease-out
          focus:border-[var(--border-accent)]
          focus:ring-2
          focus:ring-[var(--border-accent)]
          focus:ring-opacity-20
          hover:border-[var(--bg-tertiary)]
          outline-none
          px-3
          py-2
          text-[var(--text-primary)]
          shadow-md
          hover:shadow-lg
          cursor-pointer
        "
        onChange={setIsItems ? handelSelctChange : null}
        {...props}
      >
        <option
          className="bg-[var(--bg-primary)] text-[var(--text-primary)]"
          value=""
        ></option>
        {options.map((opt, idx) => (
          <option key={idx} className={optClass} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
