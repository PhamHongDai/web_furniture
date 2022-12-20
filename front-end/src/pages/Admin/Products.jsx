import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import AddProductDialog from "../../components/UI/AddProductDialog";
import { addProduct, setDisableProduct, getProductsDisable, getProducts, updateProduct, setDisableProductFasle } from "../../slices/productSlice";
import { toast } from "react-toastify";
import { getAllOrders } from "../../slices/orderSlice";

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
  const [isDisable, setIsDisable] = useState(false);
  const [formMode, setFormMode] = useState(true);
  const [productInfo, setProductInfo] = useState({
    _id: "",
    name: "",
    price: 0,
    description: "",
    category: "",
    discountPercent: 0,
    productPictures: [],
    productPictureToChange: []
  });
  const [variantName, setVariantName] = useState([]);
  const [variantQuantity, setVariantQuantity] = useState([]);

  const [variants, setVariants] =  useState([]);

  const handleName = (event) => {
    setProductInfo({ ...productInfo, name: event.target.value });
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


  const handleProductPicture = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProductInfo({
          ...productInfo,
          productPictures: [reader.result],
          productPictureToChange: [event.target.files[0]],
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
    for(let i = 0; i < variants.length; i++) {
        form.append(`variant[]` , variants[i].name);
        form.append(`variant[]`, variants[i].quantity);
    }
    for (let pic of productInfo.productPictureToChange) {
      form.append("productPicture", pic);
    }
    try {
      const res = await dispatch(addProduct(form));
      setVariants([]);
      if (res.payload.status === 200) {
        toast.info("Thêm Thành Công !");
      }
    } catch (err) {
      toast.error("Vui lòng kiểm tra lại các thông tin cho chính xác !");
    }
  }

  const handleUpdateProduct = async () => {
    const form = new FormData();
    form.append("_id", productInfo._id);
    form.append("name", productInfo.name);
    form.append("price", productInfo.price);
    form.append("description", productInfo.description);
    form.append("category", productInfo.category);
    form.append("discountPercent", productInfo.discountPercent);
    for(let i = 0; i < variants.length; i++) {
        form.append(`variant[]` , variants[i].name);
        form.append(`variant[]`, variants[i].quantity);
    }
    try {
      const res = await dispatch(updateProduct(form));
      if (res.payload.status === 200) {
        toast.info("Sửa Thành Công !");
        await dispatch(getAllOrders());
      }
    } catch (err) {
      toast.error("Vui lòng kiểm tra lại các thông tin cho chính xác !");
    }
  }

  const handleDeleteProduct = async (id) => {
    const response = await dispatch(setDisableProduct({"_id": id}));
    console.log(response);
    if(response.payload.status === 200){
      toast.warning('Khóa Thành Công');
    }
  }

  const handleSetProduct = async (id) => {
    const response = await dispatch(setDisableProductFasle({"_id": id}));
    console.log(response);
    if(response.payload.status === 200){
      toast.warning('Mở khóa Thành Công');
    }
  }

  const handleAddBtn = () => {
    setShow((prev) => !prev);
    setFormMode(true);
    setProductInfo({
      name: "",
      price: 0,
      description: "",
      category: "",
      discountPercent: 0,
      productPictures: [],
      productPictureToChange: []
    });
    setVariantName([]);
    setVariantQuantity([]);
  }

  const handleEditBtn = async(item) => {
    setShow((prev) => !prev);
    setFormMode(false);
    setVariantName([]);
    setVariantQuantity([]);
    setProductInfo({
      _id: item._id,
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category._id,
      discountPercent: item.discountPercent,
      productPictures: item.productPictures,
      productPictureToChange: []
    });
    item.variants.map((it,index) => {
      variantName.push(it.name);
      variantQuantity.push(it.quantity);
      variants.push({name: variantName[index], quantity: variantQuantity[index]})
    })
  };
 
  const handleIsDisabledBtn = async() => {
    if(!isDisable){
      setIsDisable((prev) => !prev);
      const response = await dispatch(getProductsDisable());
      if(response.payload.status === 200){
        toast.info('Danh sách sản phẩm bị khóa');
      }
    } else {
      setIsDisable((prev) => !prev);
      const response = await dispatch(getProducts());
      if(response.payload.status === 200){
        toast.info('Danh sách sản phẩm');
      }
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
          <Col style={{textAlign: "right"}}>
            <motion.button whileHover={{ scale: 1.2 }} className="buy__btn" onClick={handleIsDisabledBtn}>{!isDisable ? "Sản phẩm bị khóa" : "Danh sách sản phẩm" }</motion.button>
            <> </>
            <motion.button whileHover={{ scale: 1.2 }} className="buy__btn" onClick={() => handleAddBtn()}>Thêm sản phẩm</motion.button>
          </Col>
        </div>
        <AddProductDialog 
          show={show}
          setShow={setShow}
          formMode={formMode}
          productInfo={productInfo}
          variants={variants}
          variantName={variantName}
          variantQuantity={variantQuantity}
          setVariants={setVariants}
          setVariantName={setVariantName}
          setVariantQuantity={setVariantQuantity}
          handleName={handleName}
          handlePrice={handlePrice}
          handleDescription={handleDescription}
          handleCategory={handleCategory}
          handleDiscountPercent={handleDiscountPercent}
          handleProductPicture={handleProductPicture}
          handleAddProduct={handleAddProduct}
          handleUpdateProduct={handleUpdateProduct}
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
                {
                  isDisable ? (
                    <>
                    <i className="ri-checkbox-line" onClick={() =>handleSetProduct(item._id)}></i>
                    </>
                  ) : (
                    <>
                      <i className="ri-edit-line" onClick={() => handleEditBtn(item)}></i>
                      <> </>
                      <i className="ri-delete-bin-line" onClick={() =>handleDeleteProduct(item._id)}></i>
                    </>
                  )
                }
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
