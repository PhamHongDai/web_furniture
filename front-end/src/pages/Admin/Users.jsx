import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import Table from 'react-bootstrap/Table';
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
`
const Content = styled.div`
  margin: 20px 20px;
  width: 100%;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  tr th, tr td{
    text-align: center;
    vertical-align: middle;
  }
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4{
      margin-bottom: 0;
    }
  }
  .buy__btn{
    border: none;
    outline: none;
    padding: 10px 20px;
    margin: 20px 7px;
    border-radius: 5px;
    background: #0D324D;
    color: #dfdede;
    cursor: pointer;
    font-size: .9rem;
  }
  .buy__btn:hover{
    color: #fff;
  }
`
const Users = () => {
  const { users } = useSelector((state) => state.user);
  return (
    <Container>
      <Sidebar/>
      <Content>
        <div className="title">
          <h4>
            Danh sách người dùng
          </h4>
          {/* <motion.button whileHover={{ scale: 1.2 }} className="buy__btn">Người dùng bị khóa</motion.button> */}
        </div>
        <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên người dùng</th>
            <th>Ảnh đại diện</th>
            <th>Quyền</th>
            <th>Email</th>
            {/* <th>Hành động</th> */}
          </tr>
        </thead>
        <tbody>
        {
          users.map((item, index) => 
          (
            <tr key={index}>
              <td>{index}</td>
              <td >{item.name}</td>
              <td><img src={item.profilePicture} alt='avatar'/></td>
              <td>{item.role}</td>
              <td>{item.email}</td>
              {/* <td>
                <i className="ri-delete-bin-line"></i>
              </td> */}
            </tr>
          ))
        }
        </tbody>
      </Table>
      </Content>
    </Container>
  );
}

export default Users;
