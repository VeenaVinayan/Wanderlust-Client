export interface IUser {
    _id: string;
    callType:string;
    agentId:string;
    roomId:null | string;
    agentName:string;
}
export interface UserState {
  showIncomingVideoCall: IUser | null; 
  videoCall: null | string;
  showVideoCallUser: boolean;
  roomIdUser: null | string;
}
export interface VideoCallPayload {
  userID: string;
  type: string;
  callType: string;
  roomId: string;
  userName: string
  agentName: string;
}
export interface IAgent {
     videoCall : VideoCallPayload | null;
     showVideoCallAgent : boolean;
     roomIdAgent : null | string;
}
export interface IVideoCall {
    to:string;
    from:string;
    agentName:string;
    callType:string;
    roomId:string;
}
export interface IAcceptCall {
    to:string;
    from:string;
    roomId:string;
    createdAt?:Date
}