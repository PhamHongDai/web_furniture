import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
  const { users } = useSelector((state) => state.user);
    const { categories } = useSelector((state) => state.category);
  const { orders } = useSelector((state) => state.order);

  let priceTotal = 0;
  let order = 0;
  let packed = 0;
  let shipped = 0;

  orders.map((item, index) => {
    if(item.paymentStatus === "completed")
    {
      priceTotal += item.totalAmount;
    }
    if(item.orderStatus[0].isCompleted === true)
    {
      order+=1
    }
    if(item.orderStatus[1].isCompleted === true)
    {
      packed+=1
    }
    if(item.orderStatus[2].isCompleted === true)
    {
      shipped+=1
    }

  })

  return (
    <Container>
      <Sidebar />
      <Content>
        <div className="title">
          <h4>
            Bảng điều khiển
          </h4>
        </div>
        <Row xs={1} md={2} className="g-4">
          <Col>
            <Card bg={"Light".toLowerCase()}>
              <Card.Body>
                <Card.Title>TỔNG DOANH THU</Card.Title>
                <Card.Text>
                    {Number(priceTotal).toLocaleString("vi")}₫
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg={"Light".toLowerCase()}>
              <Card.Body>
                <Card.Title>SỐ ĐƠN HÀNG CHỜ XÁC NHẬN</Card.Title>
                <Card.Text>
                  {order}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg={"Light".toLowerCase()}>
              <Card.Body>
                <Card.Title>SỐ ĐƠN HÀNG ĐANG ĐÓNG GÓI</Card.Title>
                <Card.Text>
                  {packed}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg={"Light".toLowerCase()}>
              <Card.Body>
                <Card.Title>SỐ ĐƠN HÀNG ĐANG VẬN CHUYỂN</Card.Title>
                <Card.Text>
                  {shipped}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg={"Light".toLowerCase()}>
              <Card.Body>
                <Card.Title>SỐ LƯỢNG NGƯỜI DÙNG</Card.Title>
                <Card.Text>
                  {users.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg={"Light".toLowerCase()}>
              <Card.Body>
                <Card.Title>TỔNG SỐ DANH MỤC</Card.Title>
                <Card.Text>
                  {categories.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Content>
    </Container>
  );
}

export default HomeAdmin;
