import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';

// To aviod hard coding eventKey, create variables
const CHATS_KEY = 'chats';
const CONTACTS_KEY = 'contacts';

// Display id to user, Share with friends

export default function Sidebar({ id }) {
  // Not storing chats in local storage
  const [activeKey, setActiveKey] = useState(CHATS_KEY);
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
      </Tab.Container>
    </div>
  );
}
