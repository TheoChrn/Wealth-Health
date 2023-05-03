import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import employeesReducer from "../features/employees.slice"
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: "root",
  storage 
}

const rootReducer = combineReducers({
  employees: employeesReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

export const persistor = persistStore(store)