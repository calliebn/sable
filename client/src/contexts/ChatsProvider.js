import React, { useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ChatsContext = React.createContext();

export function useChats() {
  return useContext(ChatsContext);
}

// THIS IS NOT WORKING!
export function ChatsProvider({ children }) {
  const [chats, setChats] = useLocalStorage('chats', []);

  // Create a state with the first chat
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);

  // import contacts
  const { contacts } = useContacts();

  function createChat(recipients) {
    setChats((prevChats) => {
      return [...prevChats, { recipients, messages: [] }];
    });
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
    const selected = index === selectedChatIndex;
    // new object that has everthing about our chats
    // replacing recipients with the new formatted text
    // True, false boolean for selected
    return { ...chat, recipients, selected };
  });

  const value = {
    chats: formattedChats,
    createChat,
    // Use selected convo at a later point
    selectedChat: formattedChats[selectedChatIndex],
    // mapping to a different name
    selectChatIndex: setSelectedChatIndex,
    createChat,
  };

  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
}
