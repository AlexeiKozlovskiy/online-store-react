import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { IdClickProvider } from './components/Context/ContextClickID.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <IdClickProvider>
        <App />
      </IdClickProvider>
    </BrowserRouter>
  </React.StrictMode>
);
