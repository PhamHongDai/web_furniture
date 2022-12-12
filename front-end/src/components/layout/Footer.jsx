import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.footer`
  width: 100%;
  a{
    text-decoration: none;
    color: #333;
  }
  ul{
    margin-bottom: 0;
    padding-left: 0;
  }
  p{
    margin-bottom: 0;
  }
  .content{
    padding: 50px 120px;
    background: #331929;
  }
  .x{
    display: grid;
    grid-template-columns: 30% 23% 23% 24%;
  }
  .y{
    padding: 0px 20px;
    line-height: 35px;
  }
  .logo{
    display: flex;
    align-items: center;
    height: 45px;
  }
  .logo img{
    width: 45px;
    height: 45px;
  }
  .logo h1 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #fff;
  }
  .quick__links-title{
    display: flex;
    align-items: center;
    height: 45px;
  }
  .quick__links-title h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: rgba(255,255,255,0.735);
    color: #fff;
  }
  .footer__quick-links li{
    display: flex;
    margin: 10px 0px;
  }
  .footer__quick-links li a,p,i{
    font-size: .9rem;
    color: rgba(255,255,255,0.735);
  }
  .footer__quick-links li i{
    margin: 5px 5px;
  }
  .footer__bottom{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
  }
`
const Footer = () => {
    return (
      <Container>
        <div className="content">
          <div className="x">
            <div className="y">
              <div className="logo">
                <div>
                  <h1>Furniture</h1>
                </div>
              </div>
              <p className="footer__text">
              Mang đến cho ngôi nhà của bạn một phong cách mới. 
              Sống tốt hơn, thiết kế độc đáo, đáp ứng nhu cầu của bạn!
              </p>
            </div>
            
            <div className="y">
              <div className="footer__quick-links">
                <div className="quick__links-title">
                  <h4>Top Danh mục</h4>
                </div>
                <ul>
                  <li>
                    <Link to="#">Giường</Link>
                  </li>
                  <li>
                    <Link to="#">Sofa</Link>
                  </li>
                  <li>
                    <Link to="#">Ghế</Link>
                  </li>
                  <li>
                    <Link to="#">Tủ</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="y">
              <div className="footer__quick-links">
                <div className="quick__links-title">
                  <h4>Liên kết hữu ích</h4>
                </div>
                <ul>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li>
                    <Link to="/cart">Cart</Link>
                  </li>
                  <li>
                    <Link to="#">User</Link>
                  </li>
                  <li>
                    <Link to="#">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="y">
              <div className="footer__quick-links">
                <div className="quick__links-title">
                  <h4>Liên hệ</h4>
                </div>
                <ul>
                  <li>
                    <span><i className="ri-map-pin-2-line"></i></span>
                    <p>170 Quang Trung, Go Vap, HCM City</p>
                  </li>
                  <li>
                    <span><i className="ri-phone-line"></i></span>
                    <p>0377707514</p>
                  </li>
                  <li>
                    <span><i className="ri-mail-line"></i></span>
                    <p>19110161@student.hcmute.edu.vn</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p>Copyright 2022 - Developer by Bigcute. All rights reserved</p>
          </div>
        </div>
      </Container>
    );
  }
  
export default Footer;
  