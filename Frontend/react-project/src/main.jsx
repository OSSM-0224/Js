import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./app/routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./app/store/store.jsx";
import GlobalError from "./shared/components/GlobalError.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalError />
    <AppRoutes />
  </Provider>
);