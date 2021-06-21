import React from 'react';
import Sidebar from './Sidebar';

export default function Dashboard({ id }) {
  //   height of page
  //   render the sidebar
  return (
    <div className='d-flex' style={{ height: '100vh' }}>
      <Sidebar id={id} />
    </div>
  );
}
