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

  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ display: 'flex', overflow: 'scroll initial',zIndex: "900" }}>
      <CDBSidebar textColor="#fff" backgroundColor="#d1d0d0">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Furniture
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/">
              <CDBSidebarMenuItem icon="columns">Bảng điều khiển</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/products">
              <CDBSidebarMenuItem icon="th-large">Sản phẩm</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/users">
              <CDBSidebarMenuItem icon="user">Người dùng</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/catagories">
              <CDBSidebarMenuItem icon="table">Danh mục</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/orders">
              <CDBSidebarMenuItem icon="chart-line">Đơn hàng</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
              cursor: 'pointer'
            }}
            onClick={handleGoTop}
          >
            Go Top
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;