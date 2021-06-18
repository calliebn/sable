import React from 'react';
import Login from './Login';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  // save in local storge in 'Application'
  const [id, setId] = useLocalStorage('id');
  return (
    <>
      {id}j
      <Login onIdSubmit={setId} />;
    </>
  );
}

export default App;
