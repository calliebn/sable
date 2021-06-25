import React from 'react';
import Login from './Login';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ChatsProvider } from '../contexts/ChatsProvider';

function App() {
  // save in local storge in 'Application'
  const [id, setId] = useLocalStorage('id');

  // For the contact context
  const dashboard = (
    <ContactsProvider>
      <ChatsProvider id={id}>
        <Dashboard id={id} />
      </ChatsProvider>
    </ContactsProvider>
  );

  // If you have id, do not need login page
  // If we have an Id, go to another page. If not, use login page
  //  Or got to Dashboard component & pass id
  return (
    //!!!! CHECK ERROR IN FRAGMENTS/CHEVRON
    <>{id ? dashboard : <Login onIdSubmit={setId} />}</>
  );
}

export default App;
