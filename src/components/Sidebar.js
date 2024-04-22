import React from 'react';
import { IconName } from "react-icons/bs";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '200vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#0C249F " fixed>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/home" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fas fa-home">Inicio</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/create-category" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="th-large">Crear Categoría</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/create-word" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="th-large">Crear Palabra</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/edit-category" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="th-large">Editar Categoría</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/edit-word" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="th-large">Editar Palabra</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
           </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;