import React from 'react';
import ContactPage from './contacts';
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css"

function Home(){
  return <div className='container-fluid text-center'>
      <div className='row bg-dark'>
        <h2 className='bg-dark text-white'>CONTACT MANAGER</h2>
      </div>
      <div className='row bg-secodary'>
        <h3 className='bg-secondary text-white'>Home Page</h3>
      </div>
      <div className='m-5'>
      <Link href={'/contacts'}>
        <button className='btn btn-primary'>
          Contacts
        </button>
      </Link>
      </div>
    </div>
}

export default Home