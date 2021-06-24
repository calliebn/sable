import React from 'react';
import Sidebar from './Sidebar';
import { useChats } from '../contexts/ChatsProvider';
import OpenChat from './OpenChat';

export default function Dashboard({ id }) {
  // render only if we have a currently selected conversation
  const { selectedChat } = useChats();

  //   height of page
  return (
    <div className='d-flex' style={{ height: '100vh' }}>
      {/* render the sidebar */}
      <Sidebar id={id} />

      {/* render the conversation if we have a selected chat*/}
      {selectedChat && <OpenChat />}
    </div>
  );
}
