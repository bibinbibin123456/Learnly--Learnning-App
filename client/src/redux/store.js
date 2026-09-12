import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import { persistStore, persistReducer } from 'redux-persist';

const storage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) => {
    window.localStorage.setItem(key, value)
    return Promise.resolve()
  },
  removeItem: (key) => {
    window.localStorage.removeItem(key)
    return Promise.resolve()
  }
}


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Only auth state will be saved to storage
  // blacklist: ['settings'] // Alternative: save everything EXCEPT settings
};

const persistedReducer = persistReducer(persistConfig, userReducer);


export const store = configureStore({
  reducer: {
    user: persistedReducer
    
  },
  middleware:(getDefaultMiddleware) =>
     getDefaultMiddleware({
      serializableCheck: false
    })
   } 
)


export const persistor= persistStore(store)