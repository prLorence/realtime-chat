import { useState, useEffect, MouseEventHandler } from 'react'
import './App.css'
import { socket } from './socket'
import { ConnectionState } from './components/ConnectionState'
import { ConnectionManager } from './components/ConnectionManager'
import { Events } from './components/Events'
import { Form } from './components/Form'
import { CountOfUsers} from './components/CountOfUsers'

export type Chat = {
  name: string,
  message: string
}

function App() {
  const [isConnect, setIsConnected] = useState(socket.connected);
  // const [chatEvents, setChatEvents] = useState<Chat[]>([]);
  const [chatEvents, setChatEvents] = useState<string[]>([]);
  const [userEvents, setUserEvents] = useState<number>(0);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [])

    useEffect(() => {
    // function onChat(chatMessage: Chat) {
    //   console.log(chatMessage);
    //   setChatEvents(prev => [...prev, chatMessage]) 
    // }

    function onChat(chat: string) {
      setChatEvents(prev => [...prev, chat]);
    }

    function onUser(users: number) {
      setUserEvents(users);
    }
    socket.on('chats', onChat);
    socket.on('users', onUser)
      return () => {
      socket.off('chats', onChat)
      socket.off('users', onUser)
   }
  }, [chatEvents, userEvents])


  return (
    <div className="App">
      <h1>Real Time Chat Application</h1>
      <ConnectionState isConnected={isConnect}/>
      <ConnectionManager/>
      <Events events={chatEvents} />
      <CountOfUsers userCount={userEvents}/>
      <Form/>
    </div>
  )
}

export default App
