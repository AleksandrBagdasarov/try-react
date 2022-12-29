import {configureStore, combineReducers} from "@reduxjs/toolkit";
import dashboardSlice from "./dashboard";
import userSlice from "./user";
import createLinkSlice from "./createLink";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';

// const store = configureStore({
//     reducer: {
//         dashboard: dashboardSlice.reducer,
//         user: userSlice.reducer,
//         createLink: createLinkSlice.reducer,
//     }
// });

const rootReducer = combineReducers({
    dashboard : dashboardSlice.reducer,
    user : userSlice.reducer,
    createLink : createLinkSlice.reducer,
});

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: [thunk]
    }
)



export const persistor = persistStore(store);