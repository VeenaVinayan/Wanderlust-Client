import React from 'react';
import AppRouter from "./router/index";
import { ToastContainer } from 'react-toastify';
import { ChatProvider } from './context/chatContext';

const App: React.FC = () => {
 const userId = localStorage.getItem('userId') || ''; 
 return (
    <>
      {/* <main className="py-10 bg-h-screen"> */}
        <ChatProvider userId={userId}>
            <ToastContainer />
             <AppRouter />
        </ChatProvider> 
      {/* </main> */}
    </>
  )
}

export default App
