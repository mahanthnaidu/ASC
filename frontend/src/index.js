import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';

// ReactDOM.render(<App/>, document.getElementById("root")) ;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <AuthProvider>
        
  <React.StrictMode>
    <App />
  </React.StrictMode>
</AuthProvider>
);

reportWebVitals();
