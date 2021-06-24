import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useChats } from '../contexts/ChatsProvider';

export default function OpenChat() {
  const [text, setText] = useState('');
  const { sendMessage, selectedChat } = useChats();

  function handleSubmit(e) {
    e.preventDefault();

    // function for sending message
    // Get recipients and Ids

    sendMessage(
      selectedChat.recipients.map((recipient) => recipient.id),
      // Text to send - comes from the useState
      text
    );
    // After sending the message, empty string. Send another mesg
    setText('');
  }

  return (
    <div className='d-flex flex-column flex-grow-1'>
      {/* placeholer */}
      <div className='flex-grow-1 overflow-auto'></div>

      {/* Render Form */}
      {/* Submit of form */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className='m-2'>
          {/* To have a send button */}
          <InputGroup>
            <Form.Control
              as='textarea'
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              // Dont allow use to change size of text box
              style={{ height: '75px', resize: 'none' }}
            />
            {/* Insert a button */}
            <InputGroup.Append>
              <Button type='submit'>Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
