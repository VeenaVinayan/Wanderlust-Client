import React from 'react';
import AppRouter from "./router/index";
import { ToastContainer } from 'react-toastify';
import { ChatProvider } from './context/chatContext';
import NotificationProvider from './context/notificationProvider';
import { NotificationProviderContext } from './context/NotificationContext';
import IncomingCallModal from './components/VideoCall/IncomingCallModal';
import VideoCallModal from './components/VideoCall/VideoCallModal';

const App: React.FC = () => {
 const userId = localStorage.getItem('userId') || ''; 
 console.log('UserId ::',userId);
 return (
    <>
      <main className="py-10 bg-h-screen">
        <ChatProvider userId={userId}>
          <ToastContainer />
           <NotificationProviderContext>
            <NotificationProvider />
             <AppRouter />
             <IncomingCallModal />
             <VideoCallModal />
          </NotificationProviderContext>
       </ChatProvider> 
      </main>
    </>
  )
}
export default App
