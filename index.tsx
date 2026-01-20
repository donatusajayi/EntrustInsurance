import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("React application failed to mount:", error);
    rootElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; background: #f9fafb;">
        <div style="text-align: center; max-width: 400px; padding: 40px; background: white; border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);">
          <h1 style="color: #ef4444; margin-bottom: 16px; font-size: 24px; font-weight: 700;">System Error</h1>
          <p style="color: #6b7280; line-height: 1.6;">The application encountered an initialization error. This is usually caused by package version conflicts in the browser environment.</p>
          <button onclick="window.location.reload()" style="margin-top: 24px; padding: 12px 24px; background: #111827; color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: background 0.2s;">Reload Application</button>
        </div>
      </div>
    `;
  }
} else {
  console.error("Failed to find the root element in index.html");
}