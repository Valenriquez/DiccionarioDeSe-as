import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './SeeAdmins.css'; // Import the CSS file
import { Link } from 'react-router-dom';


function SeeAdmins() {
    const [admins, setAdmins] = useState([])
    const [successDelete, setSuccessDelete] = useState(false); // State to track success
    
    useEffect(() => {
        axios.get('https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/admins/getall')
          .then(res => {
            console.log('API Response:', res.data); // Log the API response data
            setAdmins(res.data.admins); // Update the admins state with the fetched data
          })
          .catch(err => console.log('API Error:', err)); // Log any API errors
      }, []); // Empty dependency array to run the effect only once
    
      console.log('Admins Array:', admins); // Log the state of the admins array
    

    const handleDelete = async (id) => {
        try {
            await axios.delete('https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/admins/delete/' + id)
            window.location.reload()
            setSuccessDelete(true); 
            
        }catch(err) {
            console.log(err);
        }
    }

    return (
    <div className='d-flex vh-100 bg-white justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded'>
            <Link to='/add-admins' className='btn btn-success'>Añadir +</Link>
            <Link to="/home">
                <button className="btn btn-success" style={{ margin: '10px' }}> Inicio </button>
            </Link>
            <Link to="/">
                <button className="btn btn-outline-success" style={{ margin: '10px' }}> Salir </button>
            </Link>
            {successDelete  && (
                <div className="alert alert-success" role="alert">
                    Se eliminó exitosamente el administrador!
                </div>)} 
            <table className='table'>
                <thead>
                    <tr>
                    <th>Nombre: </th>
                    <th>Email: </th>
                    <th>Super Administrador(a): </th>
                    <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                {
                        admins.map((data, i)=> (
                            <tr key={i}>
                                <td>{data.username}</td>
                                <td>{data.email}</td>
                                <td>{data.issuperuser ? "Verdadero" : "Falso"}</td>
                                    <button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.id)}>
                                        Eliminar
                                    </button>
                             </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
     </div>
    );
}

export default SeeAdmins;