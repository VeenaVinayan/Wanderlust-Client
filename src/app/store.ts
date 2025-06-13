import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';
import registerReducer from '../features/authentication/registerSlice';
import userReducer from '../features/authentication/userSlice';
import agentRegisterReducer from '../features/authentication/AgentSlice';
import agentDataSlice from '../features/authentication/AgentDataSlice';
import packageReducer from '../features/authentication/packageSlice';
import bookingReducer from '../features/authentication/BookingSlice';

const persistConfig = {
  key: 'root', 
  storage, 
};

const rootReducer = combineReducers({
  register: registerReducer,
  userData: userReducer,
  agentData: agentRegisterReducer,
  agentSliceData : agentDataSlice,
  packages : packageReducer,
  booking: bookingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
