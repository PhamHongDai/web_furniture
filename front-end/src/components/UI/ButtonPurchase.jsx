import React from 'react'
import styled from "styled-components";

const Container = styled.div`
    display: flex;
`

const Button = styled.button`
    border: none;
    font-size: 1rem;
    line-height: 1.1875rem;
    padding: 1rem 0;
    text-align: center;
    flex-grow: 1;
    background-color: #fff;
    border-bottom: 2px solid rgba( 0, 0, 0, 0.15 );
    cursor: pointer;
    outline: none;
    &:hover {
        color: #EE4D2D;
    }
`

const CssCheck = {
    color : "#EE4D2D",
    borderBottom: "2px solid #EE4D2D",
}

const ButtonPurchase= (props) => {
    return (
        <Container>
            <Button value="all" style={(props.valueCss === "all") ? CssCheck : {}} onClick={props.handleBtn}>Tất cả</Button>
            <Button value="ordered" style={(props.valueCss === "ordered") ? CssCheck : {}} onClick={props.handleBtn}>Chờ xác nhận</Button>
            <Button value="packed" style={(props.valueCss === "packed") ? CssCheck : {}} onClick={props.handleBtn}>Đóng gói</Button>
            <Button value="shipped" style={(props.valueCss === "shipped") ? CssCheck : {}} onClick={props.handleBtn}>Đang giao</Button>
            <Button value="delivered" style={(props.valueCss === "delivered") ? CssCheck : {}} onClick={props.handleBtn}>Đã giao</Button>
        </Container>
    )
}

export default ButtonPurchase;
