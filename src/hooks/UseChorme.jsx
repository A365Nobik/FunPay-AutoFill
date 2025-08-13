import { useContext } from "react";
import { ChromeContext } from "../context/ChromeContext";

export const UseChrome = () => {
  const chrome = useContext(ChromeContext);
  if (!chrome) {
    return null;
  }
  return chrome;
};