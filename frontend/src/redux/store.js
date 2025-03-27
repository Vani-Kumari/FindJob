import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationsSlice from "./applicationsSlice";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// ✅ Only persist necessary reducers (Avoid persisting UI-related state)
const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["auth", "job", "company", "application"] // 🔹 Only persist important reducers
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application: applicationsSlice
});

// Persist the combined reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// ✅ Export persistor for `PersistGate`
export const persistor = persistStore(store);
export default store;
