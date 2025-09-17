import io from 'socket.io-client'
import './App.css';
import { useEffect,useState } from 'react';

const socket = io.connect("http://localhost:3001");
function App() {

  const [room,setRoom]=useState("");

  const[message,setMessage]=useState("");
  const[messagerecieved,setMessageRecieved]=useState("");

  const joinRoom = ()=>{
    if(room!=""){
      socket.emit("join_room",room);
    };
  };

  const sendmessage = ()=>{
    socket.emit("send_message",{message,room});
  };

  useEffect(()=>{
    socket.on("recieve_message",(data)=>{
      setMessageRecieved(data.message);
    });
  });

  return (
    <div className="App">

      <div style={{ marginTop: "10px" }}>
        <input placeholder='Room Number...' onChange={(event)=>{
          setRoom(event.target.value)
        }}></input>   

        <button onClick={joinRoom}>Join Room</button> 
      </div>  

      <div style={{ marginTop: "20px" }}>
        <input placeholder='Message...' onChange={(event)=>{
          setMessage(event.target.value)
        }}></input>
        <button onClick={sendmessage}>Send Message</button>
        <h1>Message:</h1>
        {messagerecieved}
      </div>

    </div>
  );
}

export default App;
