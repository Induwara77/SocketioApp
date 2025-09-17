import io from 'socket.io-client'
import './App.css';
import { useEffect } from 'react';

const socket = io.connect("http://localhost:3001");
function App() {

  const sendmessage = ()=>{
    socket.emit("send_message",{message:"Hello"});
  };

  useEffect(()=>{
    socket.on("recieve_message",(data)=>{
      alert(data.message);
    });
  });
  return (
    <div className="App">
      <input placeholder='Message...'></input>
      <button onClick={sendmessage}>Send Message</button>
    </div>
  );
}

export default App;
