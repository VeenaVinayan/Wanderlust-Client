import React from 'react';
import AppRouter from "./router/index";
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
 return (
    <>
      <main className="py-10 bg-h-screen">
        <ToastContainer />
        <AppRouter />
      </main>
    </>
  )
}

export default App
