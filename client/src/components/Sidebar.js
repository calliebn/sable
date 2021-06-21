import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Chats from './Chats';
import Contacts from './Contacts';
import NewChatModal from './NewChatModal';
import NewContactModal from './NewContactModal';

// To aviod hard coding eventKey, create variables
const CHATS_KEY = 'chats';
const CONTACTS_KEY = 'contacts';

// Display id to user, Share with friends

export default function Sidebar({ id }) {
  // Not storing chats in local storage

  const [activeKey, setActiveKey] = useState(CHATS_KEY);

  //   Open or hide the modals
  const [modalOpen, setModalOpen] = useState(false);

  //   To connect to the But  ton
  const chatsOpen = activeKey === CHATS_KEY;

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div styles={{ width: '250ps' }} className='d-flex flex-column'>
      {/* Create activeKey state */}
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant='tabs' className='justify-content-center'>
          <Nav.Item>
            {/* EventKey - Change between different tabs */}
            <Nav.Link eventKey={CHATS_KEY}>Chats</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        {/* All info when we click on the tab */}
        <Tab.Content className='border-right overflow-auto flex-grow-1'>
          {/* Which tab is which */}
          <Tab.Pane eventKey={CHATS_KEY}>
            {/* Render chats */}
            <Chats />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            {/* Render contacts */}
            <Contacts />
          </Tab.Pane>

          {/* Tell us  */}
        </Tab.Content>
        <div className='p-2 border-top border-right small'>
          Your Id: <span className='text-muted'>{id}</span>
        </div>

        {/* For creating new contact and converstaton */}
        <Button onClick={() => setModalOpen(true)} className='rounded-0'>
          New {chatsOpen ? 'Chat' : 'Contact'}
        </Button>
      </Tab.Container>

      {/* True or false if modal is open using variables */}
      <Modal show={modalOpen} onHide={closeModal}>
        {chatsOpen ? (
          <NewChatModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
