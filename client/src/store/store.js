import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import adminReducer from './productsAdminSlice';
import sessionStorage from "redux-persist/es/storage/session";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ['cart'] // only the 'cart' reducer is persisted
};

const appReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    admin: adminReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'cart/removeAllProducts') {
        sessionStorage.removeItem('persist:root');
        state = {};
    }

    return appReducer(state, action);
}

// We want to persist the cart reducer when refreshing the browser
const persistedReducer = persistReducer(persistConfig, rootReducer); 

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
}); 

export const persistor = persistStore(store);