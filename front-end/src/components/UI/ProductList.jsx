import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const Container = styled.section`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  padding: 0px 120px;
;
`

const ProductList = ({data}) => {
    return (
      <Container>
        {
          data.map((item, index) => (
            <ProductCard key={index} item={item}/>
          ))
        }
      </Container>
    );
  }
  
export default ProductList;
  