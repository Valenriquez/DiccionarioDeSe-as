

import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import {BrowserRouter} from 'react-router-dom';
import {Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import User from './components/User';

// AUTH
import { AuthProvider } from './components/AuthContext';
import { useAuth } from './components/AuthContext';


// USUARIOS
import SeeUsers from './users/SeeUsers';
import AddUsers from './users/AddUsers';
import UpdateUser from './users/UpdateUser';

// ADMINS
import SeeAdmins from './admins/SeeAdmins';
import AddAdmins from './admins/AddAdmins';

// CATEOGRIAS 
import CreateCategory from './sidebar-options/CreateCategory';
import CreateWord from './sidebar-options/CreateWord';
import EditCategory from './sidebar-options/EditCategory';
import EditWord from './sidebar-options/EditWord';

// STATS 
import Stats from './components/Stats';

// editing  
import UpdateCategory from './sidebar-options/UpdateCategory';
import UpdateWord from './sidebar-options/UpdateWord';

import Tutorial from './components/Tutorial';

// S3 BUCKET
import Upload from './Upload';


function App(){
  
  function ProtectedRoute({ element }) {
    const { isLoggedIn } = useAuth(); // Use your authentication context to check if the user is logged in
    console.log('isLoggedIn:', isLoggedIn); // Log the authentication status

    // if (isLoggedIn || isLoggedIn === false) { 
    if (isLoggedIn){  /// MODIFICARRRR SI EL LOGIN SIRVE
      return element; // Render the element (e.g., the home page) for authenticated users
    } else {
      return <Navigate to="/" />; // Redirect to the login page for unauthenticated users
    }
  }
  return (
    <AuthProvider> {/* Wrap the entire application with AuthProvider */}

    <React.Fragment>
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<Login />} />
          

          <Route path="/home" element={<User />} />
          <Route path="/create-category" element={<CreateCategory/>} />
          <Route path="/create-word" element={<CreateWord/>} />
          <Route path="/edit-category" element={<EditCategory/>} />
          <Route path="/edit-word" element={<EditWord/>} />
          <Route path="/see-users" element={<SeeUsers/>} />
          <Route path="/add-users" element={<AddUsers/>} />
          <Route path="/update/:id" element={<UpdateUser/>} />
          <Route path="/see-admins" element={<SeeAdmins/>} />
          <Route path="/add-admins" element={<AddAdmins/>} />
          <Route path="/stats" element={<Stats/>} />
          <Route path="/update-category/:id" element={<UpdateCategory/>} />
          <Route path="/update-word/:id" element={<UpdateWord/>} />
          <Route path="/tutorial" element={<Tutorial/>} />
          <Route path="/upload" element={<Upload/>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
    </AuthProvider>

  );
}

export default App;

