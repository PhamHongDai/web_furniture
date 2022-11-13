import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Helmet from "../../components/layout/Helmet";
import CommonSection from "../../components/UI/CommonSection";
import { addOrder } from "../../slices/orderSlice";

const Container = styled.section`
  padding: 50px 120px;
  .row h3{
    font-size: 1.4rem;
    font-weight: 600;
    color: #0D324D;
  }
  .row{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .item-row{
    display: flex;
    align-items: center;
    padding: 10px 10px;
  }
  .item-row label{
    margin-right: 5px;
  }
  .wrap{
    background: #0c304a;
    border-radius: 5px;
    color: #999;
    margin: 20px 10px;
    width: 400px;
    padding: 10px 10px;
  }
  .item-row span{
    color: #111;
    font-size: 1.1rem;
  }
  .item-row select,
  .item-row select option{
    color: #111;
    font-size: 1rem;
    max-width: 700px;
    padding: 5px 5px;
    outline: none;
    border: none;
    border-bottom: 1px solid #999;
  }
  
  .wrap .item-row{
    display: flex;
    justify-content: space-between;
  }
  .wrap .item-row label,
  .wrap .item-row span{
    color: #fff;
  }
  .buy__btn{
    width: 100%;
    border: none;
    outline: none;
    padding: 10px 20px;
    margin: 10px 7px;
    border-radius: 5px;
    background: #fff;
    color: #0c304a;
    cursor: pointer;
    font-size: 1.2rem;
  }
  .notifi__block{
    font-size: 1.5rem;
    text-align: center;
    color: #0D324D;
    padding: 0px 100px
  }
  .notifi__block a{
    color: coral;
    text-decoration: underline;
  }
`

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [address, setAddress] = useState(null);
  const orderItems = location.state.selected;
  const { deliveryInfo, loading } = useSelector((state) => state.address);
  const shippingFee = 30000;

  const setDefaultDeliveryInfo = () => {
    if (deliveryInfo.address) {
      const defaultAddress = deliveryInfo.address.find(
        (add) => add.isDefault === true
      );
      if (defaultAddress) {
        setAddress(defaultAddress);
      } else {
        setAddress(deliveryInfo.address[0]);
      }
    }
  };

  const totalPrice = orderItems.reduce((total, priceItem) => {
    total +=
      (priceItem.product?.price -
        (priceItem.product?.discountPercent / 100) * priceItem.product?.price) *
      priceItem.quantity;
    return total;
  }, 0);
  const totalAmount = totalPrice + shippingFee;
  let totalQuantity = 0
  orderItems.map((item) => {
    totalQuantity += item.quantity;
  })

  const getItemsToPay = () => {
    const items = [];
    orderItems.map((item) => {
      items.push({
        product: item.product._id,
        variant: item.variant,
        price:
          (item.product.price -
            (item.product.discountPercent / 100) * item.product.price) *
          item.quantity,
        quantity: item.quantity,
      });
    });
    return items;
  };

  //handlePayment
  const handlePayment = async () => {
    const order = {
      address: address._id,
      totalAmount,
      paymentStatus: "pending",
      paymentType: "cod",
      items: getItemsToPay(),
    };

    try {
      var res = await dispatch(addOrder(order)).unwrap();
    } catch (error) {
      toast.error(
        "Số lượng sản phẩm trong kho không đủ ! Vui lòng chọn sản phẩm khác"
      );
      navigate(-1);
      return;
    }
    if (res.status === 201) {
      toast.success("Đơn hàng đã được đặt!")
      setTimeout(function () {
        navigate("/purchase");
      }, 1500);
    }
  };

  const handleChangeAddress = (e) => {
    const newAddress = deliveryInfo.address.find(
      (add) => add._id === e.target.value
    );
    setAddress(newAddress);
  };

  useEffect(() => {
    setDefaultDeliveryInfo();
  }, [deliveryInfo]);

    return (
      <Helmet title="Thanh toán">
        <CommonSection title="Thanh toán"/>
          <Container>
            <div className="row" style={{borderBottom: "1px solid #999"}}>
              <div className="item-row">
                <h3>Thông tin đơn hàng</h3>
              </div>
            </div>
            <div className="row">
              {
                loading ? (
                  <div className="notifi__block">Loading...</div>
                ) : !address ? (
                  <div className="notifi__block">
                    Vui lòng thêm địa chỉ giao hàng.
                    <Link to="/delivery">
                      Tại đây!
                    </Link>
                  </div>
                ) : (
                  <div className="col">
                    <div className="item-row">
                      <label>Họ và Tên:</label>
                      <span>{address.name}</span>
                    </div>
                    <div className="item-row">
                      <label>Số điện thoại:</label>
                      <span>{address.phoneNumber}</span>
                    </div>
                    <div className="item-row">
                      <label>Địa chỉ:</label>
                      <span>
                        <select  
                          value={address._id}
                          onChange={(e) => handleChangeAddress(e)}
                          label={address.address}
                        >
                        {deliveryInfo.address?.map((info) => (
                          <option key={info._id} value={info._id}>{info.address}</option>
                        ))}
                        </select>
                      </span>
                    </div>
                  </div>
                )
              }
              <div className="col">
                <div className="wrap">
                  <div className="item-row">
                    <label>Tổng số loại mặt hàng:</label>
                    <span>{orderItems.length}</span>
                  </div>
                  <div className="item-row">
                    <label>Tổng số lượng mặt hàng:</label>
                    <span>{totalQuantity}</span>
                  </div>
                  <div className="item-row">
                    <label>Tổng tiền hàng:</label>
                    <span>{Number(totalPrice).toLocaleString("vi")}₫</span>
                  </div>
                  <div className="item-row">
                    <label>Phí vận chuyển:</label>
                    <span>{Number(shippingFee).toLocaleString("vi")}₫</span>
                  </div>
                  <div className="item-row" style={{borderTop: "1px solid #fff"}}>
                    <label style={{fontSize: "1.4rem"}}>Tổng tiền thanh toán:</label>
                    <span style={{fontSize: "1.4rem"}}>{Number(totalAmount).toLocaleString("vi")}₫</span>
                  </div>
                  <div className="item-row">
                    <button className="buy__btn" onClick={() => handlePayment()}>Đặt hàng</button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
      </Helmet>
    );
  }
  
export default Checkout;
  