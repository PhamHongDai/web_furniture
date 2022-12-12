import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px 20px;
  padding: 10px 10px;
  border-radius: 5px;
  background: #f6f0ea5c;
  cursor: pointer;
  a{
    text-decoration: none;
    color: #333;
  }
  ul{
    margin-bottom: 0;
    padding-left: 0;
  }
  :hover{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;  
  }
  .product__info{
    padding: 10px 0px;
  }
  .product__info h3{
    font-size: 1.2rem;
    color: #0D324D;
    font-weight: 600;
    margin-top: 10px;
    text-overflow: ellipsis;
    white-space: nowrap; 
    overflow: hidden;
    width: 250px;
  }
  .product__info span{
    font-size: 0.9rem;
  }
  .product__info a:hover{
    color: inherit;
  }
  /* .product__price{
    text-decoration-line: line-through;
    color:#929292;
  } */
  .product__card-bottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px 0px;
  }
  .product__card-bottom .price{
    color: #0D324D;
    font-size: 1.3rem;
    font-weight: 500;
  }
  .product__card-bottom span i{
    font-size: 1.2rem;
    padding: 5px;
    background: #0D324D;
    color: #fff;
    border-radius: 50px;
  }
  .product__img {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .product__img img{
    height: 300px;
    width: 250px;
    object-fit: contain;
    border-radius: 5px;
  }
`

const ProductCard = ({ item }) => {

  return (
    <Container>
      <Link to={`/shop/${item.slug}`}>
        <div className="product__img">
          <motion.img whileHover={{ scale: 0.9 }} src={item.productPictures[0]} alt="anh san pham" />
        </div>
        <div className="product__info">
          <h3 className="product__name">{item.name}</h3>
          <span>{item.category.name}</span>
        </div>
      <div className="product__card-bottom">
          <span className="price">{
            Number(Math.ceil((item.price * (100 - item.discountPercent)) / 100)).toLocaleString("vi")
          }₫</span>
      </div>
        </Link>
    </Container>
  );
}

export default ProductCard;
