import { memo,useCallback } from "react";

const Select = memo(({ options, setIsItems ,name}) => {
  const optClass = "bg-[var(--bg-secondary)] rounded-md";

  const handelSelctChange =useCallback((event) => {
    const value = event.target.value;
    if (value === "Предметы") {
      setIsItems(true);
    } else {
      setIsItems(false);
    }
  },[setIsItems]);

  return (
    <select
      className="bg-[var(--bg-secondary)] w-25 rounded-md"
      onChange={handelSelctChange}
      name={name}
      id={name}
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
export default Select