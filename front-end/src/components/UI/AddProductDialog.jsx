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
  variants,
  variantName,
  variantQuantity,
  setVariants,
  setVariantName,
  setVariantQuantity,
  handleName,
  handlePrice,
  handleDescription,
  handleCategory,
  handleDiscountPercent,
  handleProductPicture,
  handleAddProduct,
  handleUpdateProduct,
}) => {
  const { categories } = useSelector((state) => state.category);
  const handleVariantAdd = () => {
    setVariantName([...variantName, ""]);
    setVariantQuantity([...variantQuantity, ""]);
    setVariants([...variants, { name: "", quantity: 0 }]);
  }
  const handleVariantRemove = (index) => {
    const list1 = [...variantName];
    list1.splice(index, 1);
    setVariantName(list1)
    const list2 = [...variantQuantity];
    list2.splice(index, 1);
    setVariantQuantity(list2)
    const list3 = [...variants];
    list3.splice(index, 1);
    setVariants(list3)
  }

  const handleVariantNameChange = (e, index) => {
    variants[index].name = e.target.value;
  }
  const handleVariantQuantityChange = (e, index) => {
    variants[index].quantity = e.target.value;
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
    } else if (variants != null) {
      for (let i = 0; i < variants.length; i++) {
        if (variants[i].name === "" || parseInt(variants[i].quantity) <= 0) {
          toast.error("Vui lòng nhập tên loại sản phẩm và số lượng thứ " + i + " hợp lệ")
        }
        else {
          if (formMode) {
            await handleAddProduct();
            setShow((prev) => !prev);
            setVariants([]);
            break;
          } else {
            await handleUpdateProduct();
            setShow((prev) => !prev);
            setVariants([]);
            break;
          }
        }
      }
    }
  }

  const handleClose = () => {
    setVariants([]);
    setShow((prev) => !prev);
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
              <Col xs={12} md={5}>
                <Form.Label>Hình Ảnh</Form.Label>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="file" accept=".jpg,.jpeg,.png,.webp" multiple
                    onChange={handleProductPicture} 
                    disabled={!formMode ? "checked" : ""}/>
                </Form.Group>
              </Col>
              <Col xs={12} md={2}>
                <img style={{ width: "80px", height: "80px", backgroundColor: "#f8f8f8", objectFit: "cover", borderRadius: "5px" }}
                  src={productInfo.productPictures[0]} alt=''></img>
              </Col>
              <Col xs={6} md={5}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Form.Label>Loại</Form.Label>
                  <Button variant="secondary" size="sm"
                    onClick={handleVariantAdd}
                    style={variants.length < 3 ? {} : { display: "none" }}>Thêm</Button>
                </div>
                <Row>
                  {(
                    variants.map((item, index) => (
                      <>
                        <Col xs={12} md={5} key={index}>
                          <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Tên loại"
                              name="name"
                              defaultValue={item.name}
                              onChange={(e) => handleVariantNameChange(e, index)} />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={5}>
                          <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Số lượng"
                              name="quantity"
                              defaultValue={item.quantity}
                              onChange={(e) => handleVariantQuantityChange(e, index)} />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={2} style={{ paddingTop: "5px" }}>
                          <Form.Group className="mb-3">
                            <i className="ri-delete-bin-line"
                              onClick={() => handleVariantRemove(index)}
                              style={variants.length > 1 ? {} : { display: "none" }} />
                          </Form.Group>
                        </Col>
                      </>
                    )))
                  }
                </Row>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit}>{formMode ? "Thêm" : "Sửa"}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProductDialog;
