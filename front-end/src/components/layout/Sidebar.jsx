import React from 'react';
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
    <div style={{ display: 'flex', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#d1d0d0">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Furniture
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Bảng điều khiển</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/products" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="th-large">Sản phẩm</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/users" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Người dùng</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/catagories" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Danh mục</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/orders" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Đơn mua</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>

      </CDBSidebar>
    </div>
  );
};

export default Sidebar;