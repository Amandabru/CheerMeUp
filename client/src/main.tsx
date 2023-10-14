import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CheerModel } from './models/model.ts';
//import './index.css';

const model = new CheerModel();
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App model={model} />
        </BrowserRouter>
    </React.StrictMode>
);
