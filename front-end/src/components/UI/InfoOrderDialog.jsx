import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';

const InfoOrderDialog = ({
  show,
  setShow,
  orderInfo,
}) => {
  
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow((prev) => !prev)}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ zIndex: "1300" }}
      >
        <Modal.Header>
          <Modal.Title>Danh sách sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped>
            <thead>
              <tr>
                  <th>#</th>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {
                orderInfo.items.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.product.name}</td>
                    <td><img style={{width: "80px", height: "80px", backgroundColor: "#f8f8f8", objectFit: "cover", borderRadius: "5px"}}
                        src={item.product.productPictures[0]} alt=''></img></td>
                    <td>{item.quantity}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow((prev) => !prev)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InfoOrderDialog;
