import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useChats } from '../contexts/ChatsProvider';

export default function Chats() {
  const { chats, selectChatIndex } = useChats();

  return (
    <ListGroup variant='flush'>
      {/* Loop through the contacts */}
      {chats.map((chat, index) => (
        //   Avoid duplicate contacts
        <ListGroup.Item
          key={index}
          // Select a chat
          // styling
          action
          // onClick to pass into current index of chat
          onClick={() => selectChatIndex(index)}
          // Add into Chats.js
          active={chat.selected}
        >
          {chat.recipients.map((recipient) => recipient.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
