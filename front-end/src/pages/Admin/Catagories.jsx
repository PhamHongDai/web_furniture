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
  img{
    width: 80px;
    height: 80px;
    background-color: #f8f8f8;
    object-fit: cover;
    border-radius: 5px;
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
const Catagories = () => {
  const { categories } = useSelector((state) => state.category);
  return (
    <Container>
      <Sidebar/>
      <Content>
        <div className="title">
          <h4>
            Danh sách danh mục
          </h4>
          <motion.button whileHover={{ scale: 1.2 }} className="buy__btn">Thêm danh mục</motion.button>
        </div>
        <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Danh mục con</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
        {
          categories.map((item, index) => 
          (
            <tr key={index}>
              <td>{index}</td>
              <td>{item.name}</td>
              <td>
                { item.children.length === 0 ? (
                  <div>Không có</div>
                ) : (
                  item.children.map((chil, index) => (
                    <div className="variant__item" key={index}>
                      <span>{chil.name}</span>
                    </div>
                  ))
                )
                }
              </td>
              <td><img src={item.categoryImage} alt=''></img></td>
              <td>
                <i class="ri-edit-line"></i>
                <> </>
                <i className="ri-delete-bin-line"></i>
              </td>
            </tr>
          ))
        }
        </tbody>
      </Table>
      </Content>
    </Container>
  );
}

export default Catagories;
