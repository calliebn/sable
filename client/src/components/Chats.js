import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useChats } from '../contexts/ChatsProvider';

export default function Chats() {
  const { chats } = useChats();

  return (
    <ListGroup variant='flush'>
      {/* Loop through the contacts */}
      {chats.map((chat, index) => (
        //   Avoid duplicate contacts
        <ListGroup.Item key={index}>
          {chat.recipients.map((recipient) => recipient.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
