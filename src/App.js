import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import io from "socket.io-client"
import './App.css';

const socket=io.connect("http://localhost:4000")

function App() {
  const message=useRef();

  const room=useRef();

  const name=useRef();

  const [messageReceived,setMessageReceived]=useState();

  function JoinRoom(){
    const roomInput=room.current.value;

    if(roomInput!=""){
      socket.emit("join_room",{room:roomInput})
    }
    
  }

  function SendMessage(){
    const messageInput=message.current.value;

    const roomInput=room.current.value;

    socket.emit("send_message",{message:messageInput , room:roomInput}) 
  };

  function EnterName(){
    const nameInput=name.current.value;

    const roomInput=room.current.value

    socket.emit("user_connected",{name:nameInput , room:roomInput})
  }


  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      console.log(data)
      setMessageReceived(data)
    })

  },[socket])

  console.log(messageReceived)

  return (
    <div>
      <div>
        <input placeholder='Room...' ref={room}/>
        <button onClick={JoinRoom}>Join Room</button>
      </div>

      <div>
        <input placeholder='Message...' ref={message}/>
        <button onClick={SendMessage}>Send message</button>
      </div>

      <div>{messageReceived}</div>
    </div>
  );
}

export default App;