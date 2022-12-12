import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.section`
  display: grid;
  grid-template-columns: auto auto auto auto;
  margin: 0px 100px;
  gap: 40px;
  p{
    margin-bottom: 0;
  }
  .service__item{
    padding: 30px;
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    border-radius: 5px;
  }
  .service__item span i {
    font-size: 1.8rem;
    background: #0D324D;
    padding: 10px;
    border-radius: 50px;
    color: #fff;
    font-weight: 400 !important;
  }
  .service__item h3{
    color: #0D324D;
    font-size: 1.2rem;
    font-weight: 600;
  }
  .service__item p{
    font-size: 0.9rem;
    margin-top: 5px;
    color:#222;
  }
`

const Services = () => {
  return (
    <Container>
      <motion.div whileHover={{scale:1.1}} className="service__item"
        style={{ background: "#ffa69eaa"}}>
        <span>
          <i className="ri-truck-line"/>
        </span>
        <div>
          <h3>Miễn phí vận chuyển</h3>
          <p>Trợ phí vận chuyển</p>
        </div>
      </motion.div>
      <motion.div whileHover={{scale:1.1}} className="service__item"
      style={{ background: "#98fcbd88"}}>
        <span>
          <i className="ri-refresh-line"></i>
        </span>
        <div>
          <h3>Dễ dàng trả hàng</h3>
          <p>Hỗ trợ tận tình</p>
        </div>
      </motion.div>
      <motion.div whileHover={{scale:1.1}} className="service__item"
      style={{ background: "#66b5f68c"}}>
        <span>
          <i className="ri-secure-payment-line"/>
        </span>
        <div>
          <h3>Thanh toán an toàn</h3>
          <p>Đảm bảo an toàn</p>
        </div>
      </motion.div>
      <motion.div whileHover={{scale:1.1}} className="service__item"
      style={{ background: "#d65bca8d"}}>
        <span>
          <i className="ri-exchange-dollar-line"/>
        </span>
        <div>
          <h3>Dễ dàng hoàn tiền</h3>
          <p>Hỗ trợ hoàn tiền</p>
        </div>
      </motion.div>
    </Container>
  );
}
  
export default Services;
  