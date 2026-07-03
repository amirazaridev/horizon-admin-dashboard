import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// i18n: imported for its side effect (initialises i18next before <App/> renders).
import "./i18n";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
