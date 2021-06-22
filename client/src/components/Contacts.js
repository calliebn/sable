import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';

export default function Contacts() {
  // render contacts to page
  const { contacts } = useContacts();

  return (
    <ListGroup variant='flush'>
      {/* Loop through the contacts */}
      {contacts.map((contact) => (
        //   Avoid duplicate contacts
        <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
