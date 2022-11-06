import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DatasContextProvider } from './contexts';
import store from './redux/store';
import Parcer from 'html-react-parser';

// import Parser from 'html-react-parser/dist/html-react-parser';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <DatasContextProvider>
                <App />
            </DatasContextProvider>
        </BrowserRouter>
    </Provider>,
    // </React.StrictMode>,
);

reportWebVitals();
