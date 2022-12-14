import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';

const AddCategotyDialog = ({
  show,
  setShow,
  formMode,
  categoryInfo,
  handleName,
  handleCategoryImage,
  handleAddCategory,
  handleUpdateCategory,
  handleIsDisabled,
}) => {
  const handleSubmit = async () => {
    if (categoryInfo.name.length === 0) {
      toast.error("Vui lòng nhập tên danh mục")
    } else if (categoryInfo.categoryImageToChange === null && formMode === true) {
      toast.error("Vui lòng chọn ảnh danh mục")
    } else if (formMode) {
      await handleAddCategory();
      setShow((prev) => !prev);
    } else {
      await handleUpdateCategory();
      setShow((prev) => !prev);
    }
  }
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
          <Modal.Title>{formMode ? "Thêm" : "Sửa"} danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                onChange={handleName}
                defaultValue={categoryInfo.name}
                type="text" placeholder="Nhập tên danh mục..." />
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={12} md={7}>
                  <Form.Label>Hình Ảnh</Form.Label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="file" accept=".jpg,.jpeg,.png,.webp"
                      onChange={handleCategoryImage} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={3} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {
                    formMode ? ("") : categoryInfo.isDisable ? (
                      <Form.Control
                        style={{ width: "150px" }}
                        as="select" className="text-center"
                        defaultValue={categoryInfo.isDisable}
                        onChange={handleIsDisabled}
                      >
                        <option>Chọn trạng thái</option>
                        <option value="true">Khóa</option>
                        <option value="false">Sẵn sàng</option>
                      </Form.Control>
                    ) : ("")
                  }
                </Col>
                <Col xs={12} md={2}>
                  <img style={{ width: "80px", height: "80px", backgroundColor: "#f8f8f8", objectFit: "cover", borderRadius: "5px" }}
                    src={categoryInfo.categoryImage} alt=''></img>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow((prev) => !prev)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit}>{formMode ? "Thêm" : "Sửa"}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCategotyDialog;
