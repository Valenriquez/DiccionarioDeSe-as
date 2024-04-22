import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './SeeUsers.css'; // Import the CSS file
import { Link } from 'react-router-dom';
// /update/:id
function SeeUsers() {
    const [users, setUsers] = useState([])
    
    useEffect(()=> {
        axios.get('http://localhost/3000/')
        .then(res => setUsers(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost/3000/delete' + id)
            window.location.reload()
        }catch(err) {
            console.log(err);
        }
    }

    return (
    <div className='d-flex vh-100 bg-white justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded'>
            <Link to='/add-users' className='btn btn-success'>Añadir +</Link>
            <table className='table'>
                <thead>
                    <tr>
                    <th>Email: </th>
                    <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((data, i)=> (
                            <tr key={i}>
                                <td>{data.email}</td>
                                <td>
                                    <Link to={'update/${data.id}'} className='btn btn-primary'>Actualizar</Link>
                                    <button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
     </div>
    );
}

export default SeeUsers;