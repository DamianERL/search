import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "react-query";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new QueryClient();

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);

