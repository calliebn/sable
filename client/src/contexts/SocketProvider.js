import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  // use socket when we initially load our page
  useEffect(() => {
    const newSocket = io(
      'http://localhost:5000',
      // link to server.js id
      { query: { id } }
    );
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return;
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
