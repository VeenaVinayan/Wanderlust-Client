import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  endCallUser,
  setRoomIdUser,
  setShowIncomingVideoCall,
  setShowVideoCallUser,
  setVideoCallUser,
} from "../features/authentication/Video";
import {
  endCallAgent,
  setRoomId,
  setShowVideoCall,
  setVideoCall,
} from "../features/authentication/VideoCallAgent";
import { toast } from "react-toastify";
import { IAcceptCall, IVideoCall } from "../types/videoCall";

const BASE_URL = import.meta.env.VITE_APP_BASEURL;

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });
export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  userId: string;
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  userId,
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userData);
  const agentInfo = useSelector((state: RootState) => state.agentSliceData);

  useEffect(() => {
    if (!userId) return;
    const newSocket: Socket = io(BASE_URL, {
      query: { userId },
      transports: ["websocket"],
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected with id:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("incoming-video-call", (data: IVideoCall) => {
      if (userInfo?.id === data.to) {
        dispatch(
          setShowIncomingVideoCall({
            _id: data.to,
            agentId: data.from,
            callType: data.callType,
            agentName: data.agentName,
            roomId: data.roomId,
          })
        );
      } else if (agentInfo && agentInfo.id == data.to) {
        console.log("Agent received a call but ignoring it.");
      } else {
        console.log("Unrelated socket event received; ignoring.");
      }
    });

    socket.on("accepted-call", (data: IAcceptCall) => {
      dispatch(setRoomIdUser(data.roomId));
      dispatch(setShowVideoCallUser(true));
      socket.emit("agent-call-accept", {
        roomId: data.roomId,
        agentId: data.from,
        to: data.to,
      });
    });

    socket.on("agent-accept", (data: IAcceptCall) => {
      dispatch(setRoomId(data.roomId));
      dispatch(setShowVideoCall(true));
    });

    socket.on("call-rejected", () => {
      toast.error("Call ended/rejected");
      dispatch(setVideoCall(null));
      dispatch(endCallAgent());
      dispatch(endCallUser());
    });

    // User Left
    socket.on("user-left", (data: string | undefined) => {
      if (data === userInfo?.id) {
        dispatch(setShowVideoCallUser(false));
        dispatch(setRoomIdUser(null));
        dispatch(setVideoCallUser(null));
        dispatch(setShowIncomingVideoCall(null));
      } else if (data === agentInfo?.id) {
        dispatch(setShowVideoCall(false));
        dispatch(setRoomId(null));
        dispatch(setVideoCall(null));
      }
    });
    return () => {
      socket.off("incoming-video-call");
      socket.off("accepted-call");
      socket.off("agent-accept");
      socket.off("call-rejected");
      socket.off("user-left");
    };
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
