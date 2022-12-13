import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Table from 'react-bootstrap/Table';
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import AddProductDialog from "../../components/UI/AddProductDialog";
import { addProduct, deleteProductById } from "../../slices/productSlice";
import { json } from "react-router-dom";
const Container = styled.div`
  display: flex;
  height: 100%;
`
const Content = styled.div`
  margin: 20px 20px;
  width: 100%;
  height: 100%;
  img{
    width: 80px;
    height: 80px;
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
const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [show, setShow] = useState(false);
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    discountPercent: 0,
    productPicture: [],
    productPictureToChange: []
  });
  const [variant, setVariant] = useState([{name: "", quantity: 0}]);

  const handleName = (event) => {
    setProductInfo({ ...productInfo, name: event.target.value });
    console.log(productInfo)
  };

  const handlePrice = (event) => {
    setProductInfo({ ...productInfo, price: event.target.value });
  };

  const handleDescription = (event) => {
    setProductInfo({ ...productInfo, description: event.target.value });
  };

  const handleCategory = (event) => {
    setProductInfo({ ...productInfo, category: event.target.value });
  };

  const handleDiscountPercent = (event) => {
    setProductInfo({ ...productInfo, discountPercent: event.target.value });
  };
  
  const handleVariants = (a) => {
    setProductInfo({ ...productInfo, variants: a});
  };

  const handleProductPicture = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProductInfo({
          ...productInfo,
          productPictures: [...productInfo.productPicture, reader.result],
          productPictureToChange: [...productInfo.productPictureToChange, event.target.files[0]],
        });
      } else return;
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleAddProduct = async () => {
    const form = new FormData();
    form.append("name", productInfo.name);
    form.append("price", productInfo.price);
    form.append("description", productInfo.description);
    form.append("category", productInfo.category);
    form.append("discountPercent", productInfo.discountPercent);
    for(let i = 0; i < variant.length; i++) {
        form.append("variant.name."+ `${i}`, variant[i].name);
        form.append(`variant.quantity.${i}`, variant[i].quantity);
      console.log(i);
    }
    for (let pic of productInfo.productPictureToChange) {
      form.append("productPicture", pic);
    }
    try {
      const res = await dispatch(addProduct(form));
      if (res.status === 201) {
        alert("Thêm Thành Công !");
      }
    } catch (err) {
      alert("Vui lòng kiểm tra lại các thông tin cho chính xác !");
    }
  }

  const handleDeleteProduct = async (id) => {
    const response = await dispatch(deleteProductById({ productId: id })).unwrap();
    if(response.status === 202){
      alert('Xóa Thành Công');
    }
  }

  return (
    <Container>
      <Sidebar/>
      <Content>
        <div className="title">
          <h4>
            Danh sách sản phẩm
          </h4>
          <motion.button whileHover={{ scale: 1.2 }} className="buy__btn" onClick={() => setShow((prev) => !prev)}>Thêm sản phẩm</motion.button>
        </div>
        <AddProductDialog 
          show={show}
          setShow={setShow}
          productInfo={productInfo}
          variant={variant}
          setVariant={setVariant}
          handleName={handleName}
          handlePrice={handlePrice}
          handleDescription={handleDescription}
          handleCategory={handleCategory}
          handleDiscountPercent={handleDiscountPercent}
          handleVariants={handleVariants}
          handleProductPicture={handleProductPicture}
          handleAddProduct={handleAddProduct}
        />

        <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Loại : Số lượng</th>
            <th>Giá</th>
            <th>Giảm giá</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
        {
          products.map((item, index) => 
          (
            <tr key={index}>
              <td>{index}</td>
              <td >{item.name}</td>
              <td>
                {
                  item.variants.map((chil, index) => (
                    <div className="variant__item" key={index}>
                      <span>{chil.name} : {chil.quantity}</span>
                    </div>
                  ))
                }
              </td>
              <td>{Number(item.price).toLocaleString("vi")}₫</td>
              <td>{item.discountPercent}%</td>
              <td><img src={item.productPictures[0]} alt=''></img></td>
              <td>
                <i className="ri-edit-line"></i>
                <> </>
                <i className="ri-delete-bin-line" onClick={() =>handleDeleteProduct(item._id)}></i>
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

export default Products;
