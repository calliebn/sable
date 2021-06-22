import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import { useChats } from '../components/ChatsProvider';

export default function NewChatModal(closeModal) {
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  const { contact } = useContacts();
  const { createChat } = useChats();

  function handleSubmit(e) {
    e.preventDefault();

    createChat(selectedContactIds);

    closeModal();
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prevSelectedContactsIds) => {
      if (prevSelectedContactsIds.includes(contactId)) {
        return prevSelectedContactsIds.filter((prevID) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactsIds, contactId];
      }
    });
  }
  return (
    <>
      <Modal.Header closeButton>Create Chat</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Loop through contact */}
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type='checkbox'
                value={selectedContactIds.includes(contact.id)}
                label={contactname}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}

          <Button type='submit'>Chat</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
