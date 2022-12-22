import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getAllOrders, updateStatus } from '../../slices/orderSlice';
import { getProducts } from '../../slices/productSlice';

const UpdateOrderDialog = ({
  showe,
  setShowe,
  orderInfo,
  handleOrderStatus,
  handlePaymentStatus,
}) => {
  const dispatch = useDispatch();
  const handleSubmit = async() => {
    if(orderInfo.paymentStatus.length === 0 ){
      toast.error("Vui lòng chọn trạng thái thanh toán")
    } else if (orderInfo.orderStatus.length === 0 ) {
      toast.error("Vui lòng chọn trạng thái đơn hàng")
    } else {
      const info = {
        _id: orderInfo._id,
        type: orderInfo.orderStatus,
        oldType: orderInfo.oldType,
        paymentStatus: orderInfo.paymentStatus,
        items: orderInfo.items,
      }
      const res = await dispatch(updateStatus(info));
      console.log(res);
      if(res.payload.status === 200)
      {
        await dispatch(getAllOrders());
        await dispatch(getProducts());
        setShowe((prev) => !prev);
        toast.warn('Cập nhật trạng thái thành công')
      }
    }
  }
  return (
    <>
      <Modal
        show={showe}
        onHide={() => setShowe((prev) => !prev)}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ zIndex: "1300" }}
      >
        <Modal.Header>
          <Modal.Title>Sửa trạng thái</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Trạng thái đơn hàng</Form.Label>
                <Form.Control
                  as="select" className="text-center"
                  defaultValue={orderInfo.orderStatus}
                  onChange={handleOrderStatus}
                >
                  <option value="">Chọn trạng thái</option>
                  {
                    orderInfo.orderStatusL.map((item, index) => {
                      return (
                        <option key={index} value={item.type}>{item.type}</option>
                      )
                      })
                    }
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Trạng thái thanh toán</Form.Label>
                <Form.Control
                  as="select" className="text-center"
                  defaultValue={orderInfo.paymentStatus}
                  onChange={handlePaymentStatus}
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="pending">Chưa thanh toán</option>
                  <option value="completed">Đã thanh toán</option>
                  <option value="cancelled">Đã hủy</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowe((prev) => !prev)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Sửa</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateOrderDialog;
