import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ChromeProvider from "./provider/ChromeProvider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChromeProvider>
      <App />
    </ChromeProvider>
  </StrictMode>
);
