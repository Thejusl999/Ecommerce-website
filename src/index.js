import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min.js';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import ContextProvider from './store/ContextProvider.js';
import CartProvider from './store/CartProvider';
import './index.css';
import App from './App';
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ContextProvider><CartProvider><BrowserRouter><App/></BrowserRouter></CartProvider></ContextProvider>);
