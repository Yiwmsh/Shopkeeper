import { ThemeContext } from '@chrisellis/react-carpentry';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { Page } from './components/Page';
import { LightTheme } from './consts/themes';
import './index.css';
import { ItemsPage } from './pages/items/ItemsPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContext theme={LightTheme}>
      <Page>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/items" element={<ItemsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Page>
    </ThemeContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
