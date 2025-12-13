import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import { ColorModeProvider } from "../theme/ColorModeContext";

export function renderWithProviders(ui: React.ReactNode) {
  return render(
    <Provider store={store}>
      <ColorModeProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </ColorModeProvider>
    </Provider>
  );
}
