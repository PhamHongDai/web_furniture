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
  
`
const HomeAdmin = () => {
  const { products } = useSelector((state) => state.product);
  return (
    <Container>
      <Sidebar/>
      <Content>
        <div className="title">
          <h4>
            Bảng điều khiển
          </h4>
        </div>
      </Content>
    </Container>
  );
}

export default HomeAdmin;
