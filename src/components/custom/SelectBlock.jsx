import { useState, useEffect } from "react";
import { typeOpts, getting } from "../../constants";
import { Span, Select } from "../";

export default function SelectBlock({ isItems, setIsItems }) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isItems) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      return () => clearTimeout(timer);
    }, 150);
  }, [isItems]);
  return (
    <div className="w-full flex justify-between items-center gap-2">
      <Span>
        <label htmlFor="fields[type]">ТИП ПРЕДЛОЖЕНИЯ:</label>
        <Select
          id="fields[type]"
          name="fields[type]"
          setIsItems={setIsItems}
          options={typeOpts}
        />
      </Span>
      <Span
        customClass={!isItems ? `animate-fade-out` : "animate-fade-in"}
        hidden={isHidden}
      >
        <label htmlFor="fields[method]">СПОСОБ ПОЛУЧЕНИЯ:</label>
        <Select name="fields[method]" id="fields[method]" options={getting} />
      </Span>
    </div>
  );
}
