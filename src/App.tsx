import GlobalStyle from "./styles/reset";
import ProductPage from "./pages/ProductPage";

import "./App.css";
import ToastsProvider from "./providers/ToastsProvider";
import Toasts from "./components/_common/Toasts/Toasts";

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastsProvider>
        <Toasts />
        <ProductPage />
      </ToastsProvider>
    </>
  );
}

export default App;
