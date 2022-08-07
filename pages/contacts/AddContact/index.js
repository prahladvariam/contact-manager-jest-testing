import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React from 'react';

function AddContact()  {

    const state = {id: Date.now(),name: '', mobile:'', email:''};   
    const router = useRouter() 
    //console.log(contact);
    const submitContact = async (e) => {
        e.preventDefault()
        //console.log(contact);
        const response = await fetch('http://localhost:4000/contacts', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        //console.log(contact);
        const data = await response.json()
        if( data !== ""){
            alert('Contact saved sucessfully')
        }
        router.push('/contacts')
        
    }

    return(
        <div className='container-fluid'>
        <div className='row'>
            <h2 className="text-center bg-dark text-white">CONTACT MANAGER</h2>
            </div>
        <div className="container">
        <div className="row" style={{padding: "35px"}}><div className="col-md-3"></div>
        <div className="col-md-6" style={{backgroundColor: "#012641", borderRadius: "10px 10px 10px 10px", color: "#ffffff", padding: "40px"}}>
        <div> 
            <form onSubmit={submitContact} className='formData' >
                <label>Name:</label>
                <input type='text' className='form-control' defaultValue={state.name} onChange={(e) => {state.name = e.target.value}} data-testid="name" />
                <label>Mobile:</label>
                <input type='number' className='form-control' defaultValue={state.mobile} onChange={(e) => {state.mobile = e.target.value}} data-testid="number" />
                <label>Email:</label>
                <input type='email' className='form-control' defaultValue={state.email} onChange={(e) => {state.email = e.target.value}} data-testid="email" />
                <div className='text-center'>
                <button type='submit' className='btn btn-primary m-2' id='formSubmit'>Save</button>
                </div>
            </form>
        </div>    
        </div>
        <div className="col-md-3"></div>
        </div>
        <div className='row'>
        <div className='text-center'>
        <Link href="/contacts" className="text-center"><button className="btn btn-primary m-4">Back To Contact List</button></Link>
        </div>    
        </div>
        </div>
        </div>
    )
}

export default AddContact
