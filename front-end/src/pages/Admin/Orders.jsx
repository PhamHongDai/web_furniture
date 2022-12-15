import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Table from 'react-bootstrap/Table';
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import InfoOrderDialog from "../../components/UI/InfoOrderDialog";
import UpdateOrderDialog from "../../components/UI/UpdateOrderDialog";

const Container = styled.div`
  display: flex;
`
const Content = styled.div`
  margin: 20px 20px;
  width: 100%;
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
const Orders = () => {
  const { orders } = useSelector((state) => state.order);
  const [show, setShow] = useState(false);
  const [showe, setShowe] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    _id: "",
    items: [],
    oldType: "",
    orderStatus: '',
    paymentStatus: '',
    orderStatusL: [],
  });

  const handleOrderStatus = (e) => {
    setOrderInfo({...orderInfo, orderStatus: e.target.value});
  }
  const handlePaymentStatus = (e) => {
    setOrderInfo({...orderInfo, paymentStatus: e.target.value});
  }
  const handleInfoBtn = (item) => {
    setShow((prev) => !prev);
    let status = 0;
    item.orderStatus.map((item, index) => {
      if (item.isCompleted === true)
      {
        status = index;
      }})
    setOrderInfo({
      items: item.items,
      paymentStatus: item.paymentStatus,
      orderStatus: item.orderStatus[status].type,
      orderStatusL: item.orderStatus
    });
  };
  const handleEditBtn = (item) => {
    setShowe((prev) => !prev);
    let status = 0;
    item.orderStatus.map((item, index) => {
      if (item.isCompleted === true)
      {
        status = index;
      }})
    setOrderInfo({
      _id: item._id,
      items: item.items,
      oldType: item.orderStatus[status].type,
      paymentStatus: item.paymentStatus,
      orderStatus: item.orderStatus[status].type,
      orderStatusL: item.orderStatus
    });
  };

  

  return (
    <Container>
      <Sidebar/>
      <Content>
        <div className="title">
          <h4>
            Danh sách đơn hàng
          </h4>
          {/* <motion.button whileHover={{ scale: 1.2 }} className="buy__btn">Thêm đơn hàng</motion.button> */}
        </div>
        <InfoOrderDialog
        show={show}
        setShow={setShow}
        orderInfo={orderInfo}
        />
        <UpdateOrderDialog
          showe={showe}
          setShowe={setShowe}
          orderInfo={orderInfo}
          handleOrderStatus={handleOrderStatus}
          handlePaymentStatus={handlePaymentStatus}
          />
        <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên người đặt</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Tổng tiền</th>
            <th>Trạng thái đơn hàng</th>
            <th>Trạng thái thanh toán</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
        {
          orders.map((item, index) => {
            let starus = 0;
            item.orderStatus.map((chil, index) => {
              if (chil.isCompleted === true) {
                starus = index;
              }
            });
          return (
            <tr key={index}>
              <td>{index}</td>
              <td >{item.address.name}</td>
              <td>{item.address.address}</td>
              <td>{item.address.phone}</td>
              <td>{Number(item.totalAmount).toLocaleString("vi")}₫</td>
              <td>
                {item.orderStatus[starus].type}
              </td>
              <td>{item.paymentStatus}</td>
              <td>
                <i className="ri-information-line" onClick={() => handleInfoBtn(item)}></i>
                <> </>
                <i className="ri-edit-line" onClick={() => handleEditBtn(item)}></i>
              </td>
            </tr>
          )})
        }
        </tbody>
      </Table>
      </Content>
    </Container>
  );
}

export default Orders;
