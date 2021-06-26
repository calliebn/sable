import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ChatsContext = React.createContext();

export function useChats() {
  return useContext(ChatsContext);
}

// pass id as prop into convo
export function ChatsProvider({ id, children }) {
  const [chats, setChats] = useLocalStorage('chats', []);

  // Create a state with the first chat
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);

  // import contacts
  const { contacts } = useContacts();

  // socket
  const socket = useSocket();

  function createChat(recipients) {
    setChats((prevChats) => {
      return [...prevChats, { recipients, messages: [] }];
    });
  }

  // Parameters: Reciver, text, sender
  // msg that gets called from both server (send a msg)
  // and send msg to other people

  const addMessageToChat = useCallback(
    ({ recipients, text, sender }) => {
      setChats((prevChats) => {
        // convo that matches the recipent.
        // create new message

        let madeChange = false;
        const newMessage = { sender, text };
        const newChats = prevChats.map((chat) => {
          // If recipient array matches the recipients of each
          // individual convo
          if (arrayEquality(chat.recipients, recipients)) {
            madeChange = true;
            //  new chat
            return { ...chat, messages: [...chat.messages, newMessage] };
          }
          //  if not true, return convo
          return chat;
        });

        // Loop for changes and no changes
        if (madeChange) {
          return newChats;
        } else {
          return [
            // Taking current chats
            ...prevChats,
            // Adding new Chats
            { recipients, messages: [newMessage] },
          ];
        }
      });
    },
    [setChats]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', addMessageToChat);

    return () => socket.off('recieve-message');
  }, [socket, addMessageToChat]);

  function sendMessage(recipients, text) {
    socket.emit('send-message', { recipients, text });
    addMessageToChat({ recipients, text, sender: id });
  }

  // Store name of recipients
  const formattedChats = chats.map((chat, index) => {
    // map all recipients for a single conversation
    const recipients = chat.recipients.map((recipient) => {
      // Link to Chat.js
      // convert to object with id (recipient) and name
      // match and find contact
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });

      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });
    // To figure if chat selected. Determining if we get index from above

    const messages = chat.messages.map((message) => {
      const contact = contacts.find((contact) => {
        // If we have a contat = sender
        return contact.id === message.sender;
      });

      const name = (contact && contact.name) || message.sender;
      // message sent from me
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedChatIndex;
    // new object that has everthing about our chats
    // replacing recipients with the new formatted text
    // True, false boolean for selected
    return { ...chat, messages, recipients, selected };
  });

  const value = {
    chats: formattedChats,
    createChat,
    // Use selected convo at a later point
    selectedChat: formattedChats[selectedChatIndex],
    sendMessage,
    // mapping to a different name
    selectChatIndex: setSelectedChatIndex,
    createChat,
  };

  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
}
// Doesn't depend on anything in this component
// take in 2 arrays
function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  // otherwise, sort
  a.sort();
  b.sort();
  // every element in a is = every element in b at the same index position
  // arrays are exactyl equal
  return a.every((element, index) => {
    return element === b[index];
  });
}
