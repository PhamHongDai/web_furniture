import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddProductDialog = ({
  show,
  setShow,
  formMode,
  productInfo,
  variant,
  setVariant,
  handleName,
  handlePrice,
  handleDescription,
  handleCategory,
  handleDiscountPercent,
  handleProductPicture,
  handleAddProduct,
}) => {
  const { categories } = useSelector((state) => state.category);
  const handleVariantAdd = () => {
    setVariant([...variant, { name: '', quantity: 0 }]);
  }
  const handleVariantRemove = (index) => {
    const list = [...variant];
    list.splice(index, 1);
    setVariant(list)
  }

  const handleVariantChange = (e, key, index) => {
    if (key === 0) {
      const { name, value } = e.target;
      const list = [...variant];
      list[index][name] = value;
      setVariant(list);
    } else if (key === 1) {
      const { name, value } = e.target;
      const list = [...variant];
      list[index][name] = parseInt(value);
      setVariant(list);
    }
    console.log(variant)
  }

  const handleSubmit = async () => {
    if (productInfo.name.length === 0) {
      toast.error("Vui lòng nhập tên sản phẩm")
    } else if (productInfo.price <= 0) {
      toast.error("Vui lòng nhập giá sản phẩm hợp lệ")
    } else if (productInfo.description.length === 0) {
      toast.error("Vui lòng nhập mô tả sản phẩm")
    } else if (productInfo.category.length === 0) {
      toast.error("Vui lòng chọn danh mục sản phẩm")
    } else if (productInfo.discountPercent < 0 || productInfo.discountPercent > 100) {
      toast.error("Vui lòng nhập phần trăm giảm giá hợp lệ")
    } else if (productInfo.productPictureToChange.length === 0 && formMode === true) {
      toast.error("Vui lòng chọn ảnh sản phẩm")
    } else if (variant) {
      for (let i = 1; i <= variant.length; i++) {
        if (variant[i - 1].name === "" || parseInt(variant[i - 1].quantity) < 0) {
          toast.error("Vui lòng nhập tên loại sản phẩm và số lượng thứ " + i + " hợp lệ")
        }
      }
      if (formMode) {
        await handleAddProduct();
        setShow((prev) => !prev);
      } else {
        console.log("edit");
        setShow((prev) => !prev);
      }
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
          <Modal.Title>{formMode ? "Thêm" : "Sửa"} sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} md={7}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    onChange={handleName}
                    defaultValue={productInfo.name}
                    type="text" placeholder="Nhập tên sản phẩm..." />
                </Form.Group>
              </Col>
              <Col xs={6} md={5}>
                <Form.Group className="mb-3">
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    onChange={handlePrice}
                    defaultValue={productInfo.price}
                    type="number" placeholder="Nhập giá sản phẩm..." />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Mô tả sản phẩm</Form.Label>
                <Form.Control
                  onChange={handleDescription}
                  defaultValue={productInfo.description}
                  as="textarea" rows={3} style={{ resize: "none" }} />
              </Form.Group>
            </Row>
            <Row>
              <Col xs={12} md={7}>
                <Form.Group className="mb-3">
                  <Form.Label>Danh mục</Form.Label>
                  <Form.Control
                    onChange={handleCategory}
                    as="select" className="text-center"
                    defaultValue={productInfo.category}>
                    <option>Chọn danh mục</option>
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
                  <Form.Control
                    onChange={handleDiscountPercent}
                    defaultValue={productInfo.discountPercent}
                    type="number" placeholder="Nhập phần trăm giảm giá..." />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={7}>
                <Form.Label>Hình Ảnh</Form.Label>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="file" accept=".jpg,.jpeg,.png" multiple
                    onChange={handleProductPicture} />
                </Form.Group>
              </Col>
              <Col xs={6} md={5}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Form.Label>Loại</Form.Label>
                  <Button variant="secondary" size="sm"
                    onClick={handleVariantAdd}
                    style={variant.length < 3 ? {} : { display: "none" }}>Thêm</Button>
                </div>
                {formMode ? (
                  variant.map((item, index) => (
                    <Row key={index}>
                      <Col xs={12} md={5}>
                        <Form.Group className="mb-3">
                          <Form.Control type="text" placeholder="Tên loại"
                            name="name"
                            value={item.name}
                            onChange={(e) => handleVariantChange(e, 0, index)} />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={5}>
                        <Form.Group className="mb-3">
                          <Form.Control type="number" placeholder="Số lượng"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleVariantChange(e, 1, index)} />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={2} style={{ paddingTop: "5px" }}>
                        <Form.Group className="mb-3">
                          <i className="ri-delete-bin-line"
                            onClick={() => handleVariantRemove(index)}
                            style={variant.length > 1 ? {} : { display: "none" }} />
                        </Form.Group>
                      </Col>
                    </Row>
                  ))
                ) : (
                  variant.map((item, index) => (
                    <Row key={index}>
                      <Col xs={12} md={5}>
                        <Form.Group className="mb-3">
                          <Form.Control type="text" placeholder="Tên loại"
                            name="name"
                            defaultValue={item.name}
                            onChange={(e) => handleVariantChange(e, 0, index)} />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={5}>
                        <Form.Group className="mb-3">
                          <Form.Control type="number" placeholder="Số lượng"
                            name="quantity"
                            defaultValue={item.quantity}
                            onChange={(e) => handleVariantChange(e, 1, index)} />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={2} style={{ paddingTop: "5px" }}>
                        <Form.Group className="mb-3">
                          <i className="ri-delete-bin-line"
                            onClick={() => handleVariantRemove(index)}
                            style={variant.length > 1 ? {} : { display: "none" }} />
                        </Form.Group>
                      </Col>
                    </Row>
                  ))
                )

                }
              </Col>
            </Row>
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

export default AddProductDialog;
