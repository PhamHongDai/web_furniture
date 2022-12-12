import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';

const AddProductDialog = ({ 
  show,
  setShow,
  handleName,
  handlePrice,
  handleDescription,
  handleCategory,
  handleDiscountPercent,
  handleVariants,
  handleProductPicture,
  handleAddProduct
}) => {
  const { categories } = useSelector((state) => state.category);
  const [variantList, setVariantList] = useState([{name: '', quantity: 0}])
  const handleVariantAdd = () => {
    setVariantList([...variantList, {name: '', quantity: 0}]);
  }
  const handleVariantRemove = (index) => {
    const list = [...variantList];
    list.splice(index,1);
    setVariantList(list)
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
        style={{zIndex: "1300"}}
      >
        <Modal.Header>
          <Modal.Title>Thêm sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} md={7}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control onChange={handleName} type="text" placeholder="Nhập tên sản phẩm..." />
                </Form.Group>
              </Col>
              <Col xs={6} md={5}>
                <Form.Group className="mb-3">
                  <Form.Label>Giá</Form.Label>
                  <Form.Control onChange={handlePrice} type="number" placeholder="Nhập giá sản phẩm..." />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Mô tả sản phẩm</Form.Label>
                <Form.Control onChange={handleDescription} as="textarea" rows={3} style={{resize: "none"}} />
              </Form.Group>
            </Row>
            <Row>
              <Col xs={12} md={7}>
                <Form.Group className="mb-3">
                  <Form.Label>Danh mục</Form.Label>
                  <Form.Control onChange={handleCategory} as="select" className="text-center">
                    {
                      categories.map((item, index) => (
                        <option value={item._id} key={index}>{item.name}</option>
                      ))
                    }
                    </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={6} md={5}>
                <Form.Group className="mb-3">
                  <Form.Label>Giảm giá</Form.Label>
                  <Form.Control onChange={handleDiscountPercent} type="number" placeholder="Nhập phần trăm giảm giá..." />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={7}>
                <Form.Label>Hình Ảnh</Form.Label>
                <Form.Group className="mb-3">
                  <Form.Control onChange={handleProductPicture} type="file" accept=".jpg,.jpeg,.png" multiple />
                </Form.Group>
              </Col>
              <Col xs={6} md={5}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <Form.Label>Loại</Form.Label>
                  <Button variant="secondary" size="sm" 
                    onClick={handleVariantAdd} 
                    style={variantList.length < 3 ? {}:{display: "none"}}>Thêm</Button>
                </div>
                {
                  variantList.map((item, index) => (
                    <Row key={index}>
                      <Col xs={12} md={5}>
                        <Form.Group className="mb-3">
                          <Form.Control type="text" placeholder="Tên loại" />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={5}>
                        <Form.Group className="mb-3">
                          <Form.Control type="number" placeholder="Số lượng" />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={2} style={{paddingTop: "5px"}}>
                      <Form.Group className="mb-3">
                          <i className="ri-delete-bin-line" 
                              onClick={() => handleVariantRemove(index)}
                              style={variantList.length > 1 ? {}:{display: "none"}}/>
                      </Form.Group>
                      </Col>
                    </Row>
                  ))
                }
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow((prev) => !prev)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>Thêm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProductDialog;
