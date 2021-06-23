import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ChatsContext = React.createContext();

export function useChats() {
  return useContext(ChatsContext);
}

export function ChatsProvider({ children }) {
  const [chats, setChats] = useLocalStorage('chats', []);
  // import contacts
  const { contacts } = useContacts();

  function createChat(recipients) {
    setChats((prevChats) => {
      return [...prevChats, { recipients, messages: [] }];
    });
  }

  // Store name of recipients
  const formattedChats = chats.map((chat) => {
    // map all recipients for a single conversation
    const recipients = chat.recipients.map((recipient) => {
      // convert to object with id (recipient) and name
      // match and find contact
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });

      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });
    // new object that has everthing about our chats
    // replacing recipients with the new formatted text
    return { ...chat, recipients };
  });

  const value = {
    chats: formattedChats,
    createChat,
  };

  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
}
