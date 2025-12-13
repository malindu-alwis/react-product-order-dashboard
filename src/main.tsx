import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ColorModeProvider } from "./theme/ColorModeContext";

async function enableMocking() {
  if (!import.meta.env.DEV) return;

  const { worker } = await import("./mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <ColorModeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ColorModeProvider>
      </Provider>
    </StrictMode>
  );
});