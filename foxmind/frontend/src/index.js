import App from './components/App';
import ReactDom from "react-dom/client";
import React from "react";
import {Provider} from "react-redux";
import {store, persistor} from "./store";
import {PersistGate} from "redux-persist/integration/react";


const root = ReactDom.createRoot(
        document.getElementById('app')
    )
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);