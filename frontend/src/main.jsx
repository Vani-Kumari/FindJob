import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store"; // ✅ Import persistor
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>  {/* ✅ Ensure state is rehydrated before rendering */}
                <App />
            </PersistGate>
        </Provider>
        <Toaster />
    </React.StrictMode>
);
