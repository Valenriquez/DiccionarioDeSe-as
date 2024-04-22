import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// https://reqres.in/api/users (name, job)
// "name": "morpheus",
// "job": "leader"

    //  https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/adminsauth/add

function AddAdmins() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [issuperuser, setIssuperuser] = useState(false)
    const [success, setSuccess] = useState(false); // State to track success


    const navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault();
        axios.post('https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/admins/add', {username, email, issuperuser})
        .then(res => {
            console.log(res);
            setSuccess(true); // Set success to true
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-white justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Añadir Administrador(a)</h2>
                {success && ( // Conditionally render the success message
            <div className="alert alert-success" role="alert">
              Se añadió exitosamente el administrador!
            </div>
          )}
                <div className='mb-2'>
                    <label htmlFor=''>Username: </label>
                    <input type='text' placeholder='Ingresa el nombre ' className='form-control' 
                    onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor=''>Email: </label>
                    <input type='text' placeholder='Ingresa el email ' className='form-control' 
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-2'>  
                <label htmlFor=''>Es SuperUser: </label>
                     <input
                        input type='checkbox'
                        onChange={e => setIssuperuser(e.target.checked)}
                      />
                </div>
                <button className='btn btn-success'>Listo</button>
                <Link to="/see-admins">
                    <button className="btn btn-outline-success" style={{ margin: '10px' }}> Atrás </button>
                </Link>
            </form>
        </div>
     </div>   
  )
}

export default AddAdmins
