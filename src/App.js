import { useRef } from 'react';
import io from "socket.io-client"
import './App.css';

const socket=io.connect("http://localhost:40000")

function App() {
  const message=useRef();

  function SendMessage(){
    const messageInput=message.current.value;

    socket.emit("")
  }

  return (
    <div>
      <input placeholder='Message...' ref={message}/>
      <button onClick={SendMessage}>Click</button>
    </div>
  );
}

export default App;
