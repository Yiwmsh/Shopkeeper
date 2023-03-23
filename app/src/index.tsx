import { ThemeContext } from '@chrisellis/react-carpentry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { Page } from './components/Page';
import { LightTheme } from './consts/themes';
import './index.css';
import { ShopsLoader } from './pages';
import { ItemLoader } from './pages/items/ItemLoader';
import { SetsLoader } from './pages/sets/SetsLoader';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeContext theme={LightTheme}>
        <Page>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/items" element={<ItemLoader />} />
                <Route path="/sets" element={<SetsLoader />} />
                <Route path="/shops" element={<ShopsLoader />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Page>
      </ThemeContext>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
