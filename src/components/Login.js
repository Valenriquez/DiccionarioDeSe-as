import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Login.css'; // Import the CSS file
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
//import GetAllAdmins from './GetAllAdmins.json';;
// import GetAllAdmins from '../GetAllAdmins.json';
import GetAllAdmins from '../GetAllAdmins.json';
import axios from "axios";


import { useAuth } from './AuthContext';
//"email": "eve.holt@reqres.in",
// "password": "cityslicka"


function Login() {
 
    // admins
    //const [admins, setAdmins] = useState(Object.values(GetAllAdmins.admins)); // Convert the JSON object to an array
    // Convert the JSON array to an array
    
    // Email
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSuperUser, setIsSuperUser] = useState(false);

    
    const [isButtons, setIsButtons] = useState(false); // Add a state variable for login status
    const [successLoggedIn, setSuccessLoggedIn] = useState(false); // Add a state variable for login status


     
    console.log({ email, password })
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    
    // Super User


    //      console.log(isUserCorrect);
    //      const isUserCorrect = emailJson.includes(data.email) && passwordJson.includes(data.password);
    //      const user =  GetAllAdmins.admins.find(admin => admin.email === data.email && admin.password === data.password);
    // console.log(superUserJson); // Log the entire array to verify its contents

    const { login, logout } = useAuth();

   
    const handleApi = () => {
        const button = document.querySelector('.btn-outline-success');

        if (button) {
            // Add the "hidden" class to hide the button
            button.classList.add('hidden');
        }
        console.log({ email, password });
        axios
            .post('https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/adminsauth/login', {
                email: email,
                password: password,
                isSuperUser: isSuperUser
            })
            .then((result) => {
                if (result.data.issuperuser) {
                    setIsSuperUser(true);
                    console.log("SI ES SUPER USUARIO", isSuperUser)
                }
                setIsButtons(true);
                setSuccessLoggedIn(true); // Set success to true
                login(); // Call the login function from the context to set isLoggedIn to true
            })
            .catch((error) => {
                alert('El correo electrónico y/o la contraseña son incorrectos');
                setIsButtons(false);
                logout(); // Call the logout function from the context to set isLoggedIn to false
                console.log(error);
            });
    }


    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#0C249F" fillOpacity="1" d="M0,32L30,58.7C60,85,120,139,180,138.7C240,139,300,85,360,85.3C420,85,480,139,540,170.7C600,203,660,213,720,224C780,235,840,245,900,250.7C960,256,1020,256,1080,250.7C1140,245,1200,235,1260,197.3C1320,160,1380,96,1410,64L1440,32L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path>
                <path d="M1440,0 C1100,150 1000,320 700,320" fill="transparent" stroke="purple" strokeWidth="10" />
                <path d="M0,0 C300,120 400,320 700,320" fill="transparent" stroke="purple" strokeWidth="10" />
            </svg>

            <div className="container-login">
                <h1>Ingresa</h1>
                    <label htmlFor='email'>Correo: </label>
                    <input
                        value = {email} 
                        onChange={handleEmail}
                        className="input"
                        type="text"
                        placeholder="Email"
                    />
                   
                    <label htmlFor='password'>Contraseña: </label>
                    <input
                        value = {password} 
                        onChange={handlePassword}
                        className="input"
                        type="password"
                        placeholder="Contraseña"
                    />
                
                    <div>
                        <br />
                        <button className="btn btn-outline-success" onClick={handleApi} >Ingresa</button>
                        
                    </div>
             
            <br/>
            {successLoggedIn && (  
                <div className="alert alert-success" role="alert">
                 ¡Se ingresó exitosamente!
                </div>
            )}
            {isButtons && (
                <div className="buttons">
                    <Link to="/home">
                    <button className="btn btn-outline-success">
                        Inicio
                    </button>
                    </Link>
                </div>
             )}
            

            {isSuperUser && (
            <div className="buttons">
            <Link to="/see-admins">
                <br />
                <button className="btn btn-outline-success" >
                    Ver Administradores
                </button>   
            </Link>
             
            
        </div>
        )}
        </div>
        </>
    );
}

export default Login;
