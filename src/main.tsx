import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './app/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
const CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID ||"294203277658-mi5cva41hb9g9gmqmo3b3tti2dcrt51c.apps.googleusercontent.com";
import { SocketProvider } from './context/SocketContext.tsx';
const UserId = localStorage.getItem("userId") || "";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId= {CLIENT_ID}>
     <SocketProvider userId={UserId}>
      <Provider store={store}>
        <App />
     </Provider> 
     </SocketProvider> 
    </GoogleOAuthProvider>
  </StrictMode>,
)
