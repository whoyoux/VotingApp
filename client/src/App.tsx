import { useEffect, useState } from 'react'

import { socket } from './lib/socket'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect')
    }
  }, [])

  return (
    <>
      <div>
        is connected {isConnected === true ? `${socket.id}` : 'false'}

        <button>Create voting room</button>
      </div>
    </>
  )
}

export default App
