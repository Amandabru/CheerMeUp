import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CheerModel } from './models/model.ts';
import { updateServerWithModel } from './persistModel.ts';

const model = new CheerModel();
updateServerWithModel(model);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App model={model} />
        </BrowserRouter>
    </React.StrictMode>
);
