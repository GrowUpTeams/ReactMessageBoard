import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducer';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // 支持异步操作
      immutableCheck: true, // 检查数据是否可变
      serializableCheck: false // 不序列化状态对象，有些情况下非常有用
    })
});

const persistor = persistStore(store);

export { store, persistor };
