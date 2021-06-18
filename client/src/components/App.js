import React from 'react';
import Login from './Login';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';

function App() {
  // save in local storge in 'Application'
  const [id, setId] = useLocalStorage('id');

  // If you have id, do not need login page
  // If we have an Id, go to another page. If not, use login page
  //  Or got to Dashboard component & pass id
  return (
    //!!!! CHECK IF WE NEED THE FRAGMENTS OR NOT
    <>
      id ? : <Dashboard id={id} /> : <Login onIdSubmit={setId} />
    </>
  );
}

export default App;
