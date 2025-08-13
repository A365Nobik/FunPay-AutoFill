import { useEffect, useState } from "react";
import { ChromeContext } from "../context/ChromeContext";

export default function ChromeProvider({ children }) {
  const [chrome, setChrome] = useState(null);
  useEffect(() => {
    const chrome = window.chrome;
    if (chrome) {
      setChrome(chrome);
    }
  }, []);
  return (
    <ChromeContext.Provider value={chrome}>{children}</ChromeContext.Provider>
  );
}
