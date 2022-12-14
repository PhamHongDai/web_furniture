import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Helmet from "../../components/layout/Helmet";
import CommonSection from "../../components/UI/CommonSection";
import DeleteConfirm from "../../components/UI/DeleteConfirm";
import { addToCart, removeCartItem } from "../../slices/cartSlice";

const Container = styled.div`
  padding: 0px 80px;
  a{
    text-decoration: none;
    color: #333;
  }
  ul{
    margin-bottom: 0;
    padding-left: 0;
  }
  .x{
    display: grid;
    grid-template-columns: 79% 21%;
    gap: 20px;
  }
  .table{
    overflow: auto;
    table-layout: fixed;
    width: 100%;  
  }
  .table tr td img{
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
  }
  thead th {
    font-size: 1.1rem;
    font-weight: 600;
    color: #0D324D;
  }
  
  th, td {
    padding: 5px 10px;
    text-align: center;
    vertical-align: middle;
    color: #0D324D;
  }
  tr td a{
    color: #0D324D;
  }
  tr td a:hover{
    color: #2384c9;
  }
  td i {
    cursor: pointer;
    padding: 0px 5px;
    vertical-align: middle;
    font-size: 1.1rem;
    color: #0D324D;
  }
  .wrap__links{
    box-shadow: 3px 3px 10px 0 #ddd;
    padding: 10px 20px;
  }
  .wrap__links div{
    padding: 10px 0px;
  }
  .group__btn{
    display: flex;
    flex-direction: column;
  }
  .group__btn .buy__btn{
    width: 100%;
    border: none;
    outline: none;
    padding: 10px 20px;
    margin: 10px 7px;
    border-radius: 5px;
    background: #0D324D;
    color: #ffffffd5;
    cursor: pointer;
    font-size: .9rem;
  }
  .notifi_block{
    font-size: 1.5rem;
    text-align: center;
    color: #0D324D;
  }
`

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems, loading } = useSelector((state) => state.cart);
  const [item, setItem] = useState({
    name: "",
    productId: "",
    variantId: "",
  });

  const handleDeleteBtn = async (_idPro, _idVar) => {
    const updateSeleted = selected.filter((newItem) => {
      return newItem.product._id !== _idPro || newItem.variant !== _idVar;
    });
    setSelected(updateSeleted);
    await dispatch(
      removeCartItem({ cartItem: { product: _idPro, variant: _idVar } })
    );
  };

  const handleIncrement = async (cartItem, index, variantIndex) => {
    const a = cartItems?.[index].product.variants?.[variantIndex].quantity;
    if (cartItem.quantity > a) {
      toast.warning("Số lượng đạt tối đa!");
    } else if (cartItem.quantity <= a) {
      const updateSelect = selected.map((item) => {
        if (
          item.variant === cartItem.variant &&
          item.product._id === cartItem.product
        ) {
          return { ...item, quantity: cartItem.quantity };
        }
        return item;
      });
      setSelected(updateSelect);
      await dispatch(addToCart({ cartItem }));
    }
  };

  const handleDecrement = async (cartItem, nameItem) => {
    if (cartItem.quantity === 0) {
      setItem({
        ...item,
        name: nameItem,
        productId: cartItem.product,
        variantId: cartItem.variant,
      });
      setShowDeleteItem((prev) => !prev);
    } else {
      const updateSelect = selected.map((item) => {
        if (
          item.variant === cartItem.variant &&
          item.product._id === cartItem.product
        ) {
          return { ...item, quantity: cartItem.quantity };
        }
        return item;
      });
      setSelected(updateSelect);
      await dispatch(addToCart({ cartItem }));
    }
  };

  const handleSelectedAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const selectCartItem = cartItems.filter(item => {
        return item.product.isDisabled === false 
      })
      setSelected(selectCartItem);
    } else {
      setSelected([]);
    }
  };

  const selectCartItem = cartItems.filter(item => {
    return item.product.isDisabled === false 
  })
  const isSelectedAll = (selectCartItem.length === selected.length && selected.length !== 0)


  const totalPrice = selected.reduce((total, priceItem) => {
    total +=
      (priceItem.product?.price -
        (priceItem.product?.discountPercent / 100) * priceItem.product?.price) *
      priceItem.quantity;
    return total;
  }, 0);

  // const totalDiscount = selected.reduce((total, priceItem) => {
  //   total +=
  //     (priceItem.product?.discountPercent / 100) *
  //     priceItem.product?.price *
  //     priceItem.quantity;
  //   return total;
  // }, 0);

  const handleSelected = (e, item) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelected([...selected, item]);
    } else {
      const updateSeleted = selected.filter((newItem) => {
        return (
          newItem.product._id !== item.product._id ||
          newItem.variant !== item.variant
        );
      });
      setSelected(updateSeleted);
    }
  };

  const itemSelected = (item) => {
    return selected.find(
      ({ product, variant }) =>
        product._id === item.product._id && variant === item.variant
    );
  };

  const hanldeAddToOrder = (e) => {
    e.preventDefault();
    if (selected.length > 0) {
      navigate("/checkout", { state: { selected: selected } });
    } else {
      toast.warning('Vui lòng chọn sản phẩm để thanh toán!')
    }
  };
  return (
    <Helmet title="Giỏ hàng">
      <CommonSection title="Giỏ hàng" />
      <section>
        <Container>
          {
            isAuthenticated ? (
              <>
                {
                  loading ? (
                    <div className="notifi_block">Loading...</div>) : cartItems.length === 0 ? (
                      <div className="notifi_block">Giỏ hàng của bạn đang trống! <Link to="/shop" style={{color: "coral", textDecoration: "underline"}}>Đến mua ngay</Link></div>) : (
                    <>
                      <div className="x">
                        <div className="y">
                          <table className="table">
                            <thead>
                              <tr>
                                <th style={{ width: "1%" }}><input
                                  type="checkbox"
                                  name="selectAll"
                                  checked={isSelectedAll ? true : false}
                                  onChange={handleSelectedAll}
                                /></th>
                                <th>Hình ảnh</th>
                                <th style={{ width: "25%" }}>Tên</th>
                                <th>Loại</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng giá</th>
                                <th>Xóa</th>
                              </tr>
                            </thead>
                            <DeleteConfirm
                              item={item}
                              handleDeleteBtn={handleDeleteBtn}
                              showDeleteItem={showDeleteItem}
                              setShowDeleteItem={setShowDeleteItem}
                            ></DeleteConfirm>
                            {
                              cartItems.map((item, index) => {
                                let variantIndex = 0;
                                item.product.variants.map((itemVar, index) => {
                                  if (itemVar._id === item.variant) {
                                    variantIndex = index;
                                  }
                                });
                                return (
                                  <tbody key={index}>
                                    <tr>
                                      <td><input
                                        type="checkbox"
                                        checked={itemSelected(item) ? true : false}
                                        onChange={(e) => handleSelected(e, item)}
                                        disabled={item.product.isDisabled ? ("checked") : "" }
                                      /></td>
                                      <td><img src={item.product.productPictures[0]} alt=''></img></td>
                                      <td><Link to={item.product.isDisabled ? ("") : (`/shop/${item.product.slug}`)}>{item.product.name}</Link></td>
                                      <td>{item.product.variants?.[variantIndex].name}</td>
                                      <td>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                          <span style={{ textDecoration: "line-through", color: "rgba(0,0,0,.54)" }}>{Number(item.product.price).toLocaleString("vi")}₫</span>
                                          <span>{Number(item.product.price - (item.product?.discountPercent / 100) * item.product.price).toLocaleString("vi")}₫</span>
                                        </div>
                                      </td>
                                      <td >
                                        <i className="ri-checkbox-indeterminate-line"  onClick={item.product.isDisabled ? ("") :(() =>
                                          handleDecrement(
                                            {
                                              product: item.product._id,
                                              variant: item.variant,
                                              quantity: item.quantity - 1,
                                            },
                                            item.product.name
                                          ))
                                        }></i>
                                        <input defaultValue={item.quantity} type="button" ></input>
                                        <i className="ri-add-box-line" onClick={ item.product.isDisabled ? ("") : (() =>
                                          handleIncrement(
                                            {
                                              product: item.product._id,
                                              variant: item.variant,
                                              quantity: item.quantity + 1,
                                            },
                                            index,
                                            variantIndex
                                          ))
                                        }></i>
                                      </td>
                                      <td>{Number((item.product.price - (item.product?.discountPercent / 100) * item.product.price) * item.quantity).toLocaleString("vi")}₫</td>
                                      <td><i className="ri-delete-bin-line" onClick={() =>
                                        handleDeleteBtn(item.product._id, item.variant)
                                      }></i></td>
                                    </tr>
                                  </tbody>
                                );
                              })}
                          </table>
                        </div>

                        <div className="y">
                          <div className="wrap__links">
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <h6 style={{ fontSize: "1.4rem", fontWeight: "500", color: "#0D324D" }} >Tổng tiền</h6>
                              <span style={{ fontSize: "1.6rem", fontWeight: "600", color: "#0D324D" }}>{Number(totalPrice).toLocaleString("vi")}₫</span>
                            </div>
                            <p style={{ color: "#999" }}>Thuế và vận chuyển sẽ tính toán khi thanh toán</p>
                            <div className="group__btn">
                              <Link to='/shop'>
                                <button className="buy__btn">Tiếp tục mua sắm</button>
                              </Link>
                              <Link to='/checkout'>
                                <button className="buy__btn" onClick={(e) => hanldeAddToOrder(e)}>Thanh toán</button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>)
                }
              </>
            ) : (
              <div className="notifi_block">
                Xin vui lòng <Link to="/signin" style={{color: "coral", textDecoration: "underline"}}>đăng nhập!</Link>
              </div>
            )}
        </Container>
      </section>
    </Helmet>
  );
}

export default Cart;
