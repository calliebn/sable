import React, { useState, useCallback } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useChats } from '../contexts/ChatsProvider';

export default function OpenChat() {
  const [text, setText] = useState('');
  // Scrolling
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

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

  // Displaying all messages
  return (
    <div className='d-flex flex-column flex-grow-1'>
      {/* placeholer */}

      <div className='flex-grow-1 overflow-auto'>
        {/* put messages on left hand side */}
        {/* Stack them on one on top of the other, start messages from the bottom to top */}
        {/* Padding for a little space */}

        <div className='d-flex flex-column align-items-start justify-content-end px-3'>
          {/* Display different messages */}
          {selectedChat.messages.map((message, index) => {
            const lastMessage = selectedChat.messages.length - 1 === index;

            // No unique Ids
            return (
              // name of person who sends the message and the wrap
              // the message in the bubble

              <div
                ref={lastMessage ? setRef : null}
                // WHY IS THIS NOT GOING TO THE RIGHT?
                key={index}
                className={`my-1 d-flex flex-column 
                ${
                  message.fromMe
                    ? 'align-self-end align-items-end'
                    : 'align-items-start'
                }`}
              >
                {/* string interpolation */}
                {/* instead of normal string, use inline if statement */}
                <div
                  className={`rounded px-2 py-1 
                  ${message.fromMe ? 'bg-primary text-white' : 'border'}`}
                >
                  {message.text}
                </div>

                <div
                  className={`text-muted small 
                ${message.fromMe ? 'text-right' : ''}`}
                >
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
