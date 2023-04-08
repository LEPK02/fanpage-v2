/* 
configureStore()
- Enables the Redux DevTools Extension
- Sets up the thunk middleware by default */

import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import themeReducer from './slices/theme';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistThemeReducer = persistReducer(persistConfig, themeReducer);

const reducer = {
  auth: authReducer,
  message: messageReducer,
  theme: persistThemeReducer,
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
  // middleware: [(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(thunk)],
  middleware: [thunk],
});

export const persistor = persistStore(store);