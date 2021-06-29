import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import Input from '../Input/Input';
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'http://localhost:3000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  // useEffect for handling messages and only runs when messages array changes
  useEffect(() => {
    socket.on('message', (message) => {
      //Add new messages to messages array. '...' copies the old messages and appends new
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  //Functional componentfor sending messages
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  console.log(message, messages);
  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
