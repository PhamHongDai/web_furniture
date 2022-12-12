import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Helmet from "../../components/layout/Helmet";
import CommonSection from "../../components/UI/CommonSection";
import ButtonPurchase from "../../components/UI/ButtonPurchase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../slices/cartSlice";

const Container = styled.section`
  padding: 50px 140px;
  .content{
    margin-top: 20px;
  }
  .wrap{
    margin: 20px 0px;
    background: #fef8f3;
    border-radius: 3px;
  }
  .title-x {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f4e2d9;
    padding: 20px 20px;
    border-bottom: 1px solid #999;
  }
  .x {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px;
  }
  .x img{
    height: 90px;
    width: 90px;
    border-radius: 3px;
  }
  .y{
    display: flex;
    flex-direction: column;
    padding: 0px 10px;
    gap: 17px;
  }
  .y ,.title-y {
    label{
      color: #707070;
    }
    span {
      color: #0D324D;
    }
  }
  .buy__btn{
    width: 100%;
    border: none;
    outline: none;
    padding: 10px 20px;
    border-radius: 5px;
    background: #0D324D;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
  }
  .buy__btn:hover{
    background: #1c689e;
  }
  .total-x {
    padding: 20px 0px;
    .x .y span{
      font-size: 1.4rem;
      color: #EE4D2D;
    }
  }
  .notifi_block{
    font-size: 1.5rem;
    text-align: center;
    color: #0D324D;
    padding: 20px 20px;
  }
`

const Purchase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state.order);
  const [purchase, setPurchase] = useState([]);
  const [check, setCheck] = useState('all');

  const handleRePay = async (item) => {
    let newCartItem = {};
    item.items.map((product) => {
      newCartItem = {
        product: product.product._id,
        variant: product.variant,
        quantity: product.quantity
      };
      dispatch(addToCart({ cartItem: newCartItem }));
      navigate("/cart");
    }
    )
  }

  const handleBtn = (e) => {
    let value = e.target.value;
    if (value === "all") {
      setPurchase(orders);
      setCheck(value);
    } else if (value === "ordered") {
      const a = orders.filter((item) => item.orderStatus[0].isCompleted === true)
      setPurchase(a);
      setCheck(value);
    } else if (value === "packed") {
      const a = orders.filter((item) => item.orderStatus[1].isCompleted === true)
      setPurchase(a);
      setCheck(value);
    } else if (value === "shipped") {
      const a = orders.filter((item) => item.orderStatus[2].isCompleted === true)
      setPurchase(a);
      setCheck(value);
    } else if (value === "delivered") {
      const a = orders.filter((item) => item.orderStatus[3].isCompleted === true)
      setPurchase(a);
      setCheck(value);
    }
  }
  useEffect(() => {
    setPurchase(orders);
  }, [orders]);

  return (
    <Helmet title="Đơn mua">
      <CommonSection title="Đơn mua" />
      <Container>
        <ButtonPurchase handleBtn={handleBtn} valueCss={check} />
        <div className="content">
          {
            loading ? (
              <div className="notifi_block">
                Loading...
              </div>
            ) : purchase.length > 0 ? (
              <div className="order__item">
                {
                  purchase.map((item) => {
                    let d = new Date(item.createdAt);
                    let month = d.getMonth();
                    let minutes = d.getMinutes();
                    if (month < 10)
                      month = "0" + month;
                    if (minutes < 10)
                      minutes = "0" + minutes;
                    let format = month + "-" + d.getDate() + "-" + d.getFullYear() + " " + d.getHours() + ":" + minutes;
                    return (
                      <div className="wrap" key={item._id}>
                        <div className="title-x">
                          <div className="title-y">
                            <label>ID Đơn hàng: </label>
                            <span>{item._id}</span>
                          </div>
                          <div className="title-y">
                            <label>Trạng thái thanh toán:</label>
                            <> </>
                            <span>{item.paymentStatus}</span>
                          </div>
                          <div className="title-y">
                            <label>Ngày Đặt Hàng: </label>
                            <span>{format}</span>
                          </div>
                        </div>

                        {
                          item.items.map(purItem => {
                            let variantIndex = 0;
                            purItem.product.variants.map((itemVar, index) => {
                              if (itemVar._id === purItem.variant) {
                                variantIndex = index;
                              }
                            });

                            return (
                              <div className="x" key={purItem._id} style={{ borderBottom: "1px solid #88888866" }}>
                                <div className="x">
                                  <img src={purItem.product.productPictures[0]} alt="ảnh sản phẩm"/>
                                  <div className="y">
                                    <div>
                                      <span>{purItem.product.name}</span>
                                    </div>
                                    <div>
                                      <label>Phân loại hàng: </label>
                                      <span>{purItem.product.variants?.[variantIndex].name}</span>
                                    </div> 
                                    <div>
                                      <span>x {purItem.quantity}</span>
                                    </div>                            
                                  </div>
                                </div>

                                <div className="y">
                                  <span>{Number(purItem.price).toLocaleString("vi")}₫</span>
                                </div>
                              </div>
                            )
                          })
                        }

                        <div className="total-x">
                          <div className="x">
                            <div className="y"></div>

                            <div className="y">
                              <div>
                                <label>Tổng số tiền: </label>
                                <span>{Number(item.totalAmount).toLocaleString("vi")}₫</span>
                              </div>
                              <button className="buy__btn" onClick={()=>handleRePay(item)}>
                                Mua Lại
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            ) : (
              <div className="notifi_block">
                Chưa có đơn hàng!
              </div>
            )
          }
        </div>
      </Container>
    </Helmet>
  );
}

export default Purchase;
