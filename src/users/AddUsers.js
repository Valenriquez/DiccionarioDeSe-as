import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddUsers() {
    const [email, setEmail] = useState('')

    const navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost/3000/add', {email})
        .then(res => {
            console.log(res);
            navigate('/see-users');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-white justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Añadir Usuario(a)</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Enail</label>
                    <input type='text' placeholder='Ingresa el email ' className='form-control' 
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <button className='btn btn-success'>Listo</button>
            </form>
        </div>
     </div>   
  )
}

export default AddUsers
