import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Table from 'react-bootstrap/Table';
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import AddCategotyDialog from "../../components/UI/AddCatagoryDialog";
import { toast } from "react-toastify";
import { addCategories } from "../../slices/categorySlice";

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
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const [formMode, setFormMode] = useState(true);
  const [categoryInfo,setCategoryInfo] = useState({
    name: "",
    categoryImage: null,
    categoryImageToChange: null,
  })

  const handleName = (event) => {
    setCategoryInfo({ ...categoryInfo, name: event.target.value });
  };

  const handleCategoryImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCategoryInfo({
          ...categoryInfo,
          categoryImage: reader.result,
          categoryImageToChange: e.target.files[0],
        });
      } else return;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAddCategory = async () => {
    const form = new FormData();
    form.append("name", categoryInfo.name);
    form.append("categoryImage", categoryInfo.categoryImageToChange);
    try {
      const res = await dispatch(addCategories(form));
      if (res.payload.status === 201) {
        toast.info("Thêm Thành Công !");
      }
    } catch (err) {
      toast.error("Vui lòng kiểm tra lại các thông tin cho chính xác !");
    }
  }

  const handleAddBtn = () => {
    setShow((prev) => !prev);
    setFormMode(true);
    setCategoryInfo({
      name: "",
      categoryImage: null,
      categoryImageToChange: null,
    })
  }

  const handleEditBtn = (item) => {
    setShow((prev) => !prev);
    setFormMode(false);
    setCategoryInfo({
      name: item.name,
      categoryImage: item.categoryImage,
    })
  }
  const handleDeleteBtn = () => {

  }

  return (
    <Container>
      <Sidebar/>
      <Content>
        <div className="title">
          <h4>
            Danh sách danh mục
          </h4>
          <motion.button whileHover={{ scale: 1.2 }} className="buy__btn" onClick={() => handleAddBtn()}>Thêm danh mục</motion.button>
        </div>
        <AddCategotyDialog
        show={show}
        setShow={setShow}
        formMode={formMode}
        categoryInfo={categoryInfo}
        handleName={handleName}
        handleCategoryImage={handleCategoryImage}
        handleAddCategory={handleAddCategory}
        />
        <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
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
              <td><img src={item.categoryImage} alt=''></img></td>
              <td>
                <i className="ri-edit-line" onClick={() => handleEditBtn(item)}></i>
                <> </>
                <i className="ri-delete-bin-line" onClick={() => handleDeleteBtn()}></i>
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
