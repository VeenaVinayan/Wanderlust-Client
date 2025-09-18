import React from 'react';
import AppRouter from "./router/index";
import { ToastContainer } from 'react-toastify';
import { ChatProvider } from './context/chatContext';
import NotificationProvider from './context/notificationProvider';
import { NotificationProviderContext } from './context/NotificationContext';
import OutgoingVideoCall from './components/Agent/OutgoingVideoCall';
import IncomingVideoCall from './components/VideoCall/CallModal';
import VideoCallUser  from './components/VideoCall/VideoCall';
import VideoCallAgent from './components/Agent/VideoCall';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';

const App: React.FC = () => {
 const userId = localStorage.getItem('userId') || ''; 
 const { showVideoCallUser }  = useSelector((state:RootState)=> state.videoCall);
 const { showVideoCallAgent } = useSelector((state:RootState) => state.agentVideoCall);

 return (
    <>
      <main className="py-10 bg-h-screen">
        <ChatProvider userId={userId}>
          <ToastContainer />
           <NotificationProviderContext>
            <NotificationProvider />
             <AppRouter />
              <OutgoingVideoCall /> 
             <IncomingVideoCall />
          { showVideoCallAgent && <VideoCallAgent /> }
          { showVideoCallUser && <VideoCallUser /> }
             </NotificationProviderContext>
       </ChatProvider> 
      </main>
    </>
  )

}
export default App
