import React from "react";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0,0,0,0.562),rgba(0,0,0,0.562)),
    url("./../common-section.jpg") no-repeat center center;
  background-size: cover;
  padding: 100px 0px;
  .container h1{
    color:#fff;
    font-size: 2.3rem;
    font-weight: 500;
    text-align: center;
  }
`

const CommonSection = ({title}) => {
    return (
      <Container>
        <div className="container">
          <h1>{title}</h1>
        </div>
      </Container>
    );
  }
  
export default CommonSection;
  