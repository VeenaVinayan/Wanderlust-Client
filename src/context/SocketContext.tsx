import React , { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

const BASE_URL = import.meta.env.BASE_URL;

interface SocketContextType{
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({socket : null});
export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
    userId : string;
    children: React.ReactNode;
}

export const SocketProvider : React.FC<SocketProviderProps> = ({ userId, children}) =>{
    const [ socket, setSocket ] = useState< Socket | null>(null);
    useEffect(() =>{
         if(!userId) return;

         const newSocket = io(BASE_URL,{
             query: {userId},
             transports:["websocket"],
         });
         setSocket(newSocket);
         return()=>{
             newSocket.disconnect();
         };
    },[userId]);
    return(
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}