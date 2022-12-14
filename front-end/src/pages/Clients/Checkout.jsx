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
  .x h3{
    font-size: 1.4rem;
    font-weight: 600;
    color: #0D324D;
  }
  .x{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .item-x{
    display: flex;
    align-items: center;
    padding: 10px 10px;
  }
  .item-x label{
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
  .item-x span{
    color: #111;
    font-size: 1.1rem;
  }
  .item-x select,
  .item-x select option{
    color: #111;
    font-size: 1rem;
    max-width: 700px;
    outline: none;
    border: none;
    border-bottom: 1px solid #999;
  }
  
  .wrap .item-x{
    display: flex;
    justify-content: space-between;
  }
  .wrap .item-x label,
  .wrap .item-x span{
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
  const [address, setAddress] = useState({
    _id: "",
    address :"",
    phone:"",
    name: "",
  });
  const orderItems = location.state.selected;
  const { deliveryInfo, loading } = useSelector((state) => state.address);
  const shippingFee = 30000;

  const setDefaultDeliveryInfo = () => {
    if (deliveryInfo.address){
      if (deliveryInfo.address.length !== 0) {
        const defaultAddress = deliveryInfo.address.find(
          (add) => add.isDefault === true
        );
        if (defaultAddress) {
          setAddress({_id: defaultAddress._id, name: defaultAddress.name, phone: defaultAddress.phoneNumber, address: defaultAddress.address});
        } else {
          setAddress({_id: deliveryInfo.address[0]._id, name: deliveryInfo.address[0].name, phone: deliveryInfo.address[0].phoneNumber, address: deliveryInfo.address[0].address});
        }
      }
    };
    }

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
      address: address,
      totalAmount,
      paymentStatus: "pending",
      paymentType: "cod",
      items: getItemsToPay(),
    };

    try {
      var res = await dispatch(addOrder(order)).unwrap();
    } catch (error) {
      toast.error(
        "S??? l?????ng s???n ph???m trong kho kh??ng ????? ! Vui l??ng ch???n s???n ph???m kh??c"
      );
      navigate(-1);
      return;
    }
    if (res.status === 201) {
      toast.success("????n h??ng ???? ???????c ?????t!")
      setTimeout(function () {
        navigate("/purchase");
      }, 1500);
    }
  };

  const handleChangeAddress = (e) => {
    const newAddress = deliveryInfo.address.find(
      (add) => add._id === e.target.value
    );
    setAddress({_id: newAddress._id, name: newAddress.name, phone: newAddress.phoneNumber, address: newAddress.address});
  };

  useEffect(() => {
    setDefaultDeliveryInfo();
  }, [deliveryInfo]);

    return (
      <Helmet title="Thanh to??n">
        <CommonSection title="Thanh to??n"/>
          <Container>
            <div className="x" style={{borderBottom: "1px solid #999"}}>
              <div className="item-x">
                <h3>Th??ng tin ????n h??ng</h3>
              </div>
            </div>
            <div className="x">
              {
                loading ? (
                  <div className="notifi__block">Loading...</div>
                ) : deliveryInfo.address?.length === 0 || 
                  deliveryInfo.address === undefined  ? (
                    <div className="notifi__block">
                      Vui l??ng th??m ?????a ch??? giao h??ng.
                      <Link to="/delivery">
                        T???i ????y!
                      </Link>
                    </div>
                  ) : (
                  <div className="y">
                    <div className="item-x">
                      <label>H??? v?? T??n:</label>
                      <span>{address.name}</span>
                    </div>
                    <div className="item-x">
                      <label>S??? ??i???n tho???i:</label>
                      <span>{address.phone}</span>
                    </div>
                    <div className="item-x">
                      <label>?????a ch???:</label>
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
              <div className="y">
                <div className="wrap">
                  <div className="item-x">
                    <label>T???ng s??? lo???i m???t h??ng:</label>
                    <span>{orderItems.length}</span>
                  </div>
                  <div className="item-x">
                    <label>T???ng s??? l?????ng m???t h??ng:</label>
                    <span>{totalQuantity}</span>
                  </div>
                  <div className="item-x">
                    <label>T???ng ti???n h??ng:</label>
                    <span>{Number(totalPrice).toLocaleString("vi")}???</span>
                  </div>
                  <div className="item-x">
                    <label>Ph?? v???n chuy???n:</label>
                    <span>{Number(shippingFee).toLocaleString("vi")}???</span>
                  </div>
                  <div className="item-x" style={{borderTop: "1px solid #fff"}}>
                    <label style={{fontSize: "1.4rem"}}>T???ng ti???n thanh to??n:</label>
                    <span style={{fontSize: "1.4rem"}}>{Number(totalAmount).toLocaleString("vi")}???</span>
                  </div>
                  <div className="item-x">
                    <button className="buy__btn" onClick={() => handlePayment()}>?????t h??ng</button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
      </Helmet>
    );
  }
  
export default Checkout;
  