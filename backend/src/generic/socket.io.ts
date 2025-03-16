// import io from 'socket.io'
let io = require("socket.io");

export enum SocketEventType {
  WORKSPACE_RENAMED = 'WORKSPACE_RENAMED',
}

export const setSocketIO = (server: any) => {
  io = io(server, {
    // path: '/socket.io',
    path: '/socket-connection',
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT"],
    },
  });

  listenToEvent(io);
  return io;
};

const listenToEvent = async (cIO)=>{

  // console.log(Object.keys(cIO));
  
  cIO.on("connect", (socket)=>{
    console.log(Object.keys(cIO.on));
    cIO.on("socket_end_call", payload =>{
      console.log(payload, "from socket")
      cIO.emit("end-call", payload);
    });

    socket.emit("socket_end_call", "helloworl");


  });
  

  // cIO.on('connection', socket =>{
  //   io.on("socket_end_call", ()=>console.log('rrrr'));
  //   // socket.broadcast.emit("socket_end_call", "helloworld");
  // });
}

export const getSocketIO = () => {
  return io;
};

// ${activeWorkspaceId}/all-event
export const dispatchToAppSocket = async (workspace: string, eventName: SocketEventType, payload: any)=>{
  await io.emit(`${workspace}/all-event`, {
    type: eventName,
    data: payload
  });
}