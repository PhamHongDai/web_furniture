import React, { useEffect } from "react";
import avatar from "./../../images/defaultavatar.png"
import logo from "./../../images/logo.png"
import styled from 'styled-components'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, signout } from "../../slices/authSlice";

const nav__link = [
  {
    path: '/',
    display: 'Trang chủ',
  },
  {
    path: '/shop',
    display: 'Mua sắm',
  },
  {
    path: '/cart',
    display: 'Giỏ hàng',
  },
]

const Head = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 3px 3px 8px -3px #ddd;
`

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(#F1DFD1, #F6F0EA);
  height: 70px;
  padding: 0px 120px;
  a{
    text-decoration: none;
    color: #333;
  }
  ul{
    margin-bottom: 0;
    padding-left: 0;
  }
  .links__group a{
    padding: 10px 10px;
    font-weight: 500;
  }
  .links__group a:hover{
    color: red !important;
  }
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  img {
    width: 45px;
    height: 45px;
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0;
    color: #B82E1F;
  }
`
const Navigation = styled.div`
  .menu{
    display: flex;
    align-items: center;
    column-gap: 2.7rem;
  }
  .nav__link a {
    font-weight: 500;
    cursor: pointer;
  }
  .nav__link a:hover{
    color: red;
  }
  .nav__active {
    color: red;
  }
  
`
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
  span i {
    cursor: pointer;
    font-size: 27px;
  }
  span img {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
  }
  .cart__icon {
    position: relative;
  }
  .badge {
    position: absolute;
    top: -2%;
    right: -25%;
    height: 17px;
    width: 20px;
    min-width: 1.2rem;
    line-height: 1.2em;
    content: '';
    background: #0D324D;
    color: #fff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .8rem;
    .avatar{
      position: relative;
      display: inline-block;
    }
}
`
const Menu = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 3px;
  margin-top: 55px;
  right: 110px;
`

const GroupAvatar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 15px;
  .menu{
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 3px;
    margin-top: 45px;
    right: 5px;
    .link {
      color: currentColor;
      text-decoration: none;
      background-color: transparent;
      text-transform: none;
      padding: 10px 10px;
      cursor: pointer;
    }
    .link:hover{
      background-color: #eeeeee;
    }
  }
  &:hover{
    .menu{
      display: flex;
      flex-direction: column;
    }
  }

`

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchUser = () => {
      dispatch(isUserLoggedIn());
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <Head>
      <Container>
        <a href="/">
          <Logo>
            <img src={logo} alt='logo' />
            <div>
              <h1>Furniture</h1>
            </div>
          </Logo>
        </a>

        <Navigation>
          <ul className="menu">
            {user.role === 'admin' ? "" : (
              nav__link.map((item, index) => (
                <li className="nav__link" key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active" : ""}
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))
            )
            }
          </ul>
        </Navigation>

        <Icon>
          {
            user.role === 'admin' ? "" : (
              <motion.span whileTap={{ scale: 1.2 }} className='cart__icon'>
                <Link to="/cart">
                  <i className="ri-shopping-cart-2-line" />
                  {
                    !isAuthenticated ? (
                      ""
                    ) : cartItems.length === 0 ? (
                      ""
                    ) : (
                      <span className="badge">{cartItems.length}</span>
                    )
                  }
                </Link>
              </motion.span>
            )
          }
          {
            isAuthenticated ? (
              <GroupAvatar className="group__avatar">
                <span className="avatar">
                  {
                    user.profilePicture === null ? (
                      <Link className="link" to="/profile"><motion.img whileTap={{ scale: 1.2 }} src={avatar} alt='avatar' /></Link>
                    ) : (
                      <Link className="link" to="/profile"><motion.img whileTap={{ scale: 1.2 }} src={user.profilePicture} alt='avatar' /></Link>
                    )
                  }
                </span>
                <Menu className="menu">
                  {
                    user.role === 'admin' ? (
                      ""
                    ) : (
                      <>
                        <Link className="link" to="/profile">
                          Tài Khoản Của Tôi
                        </Link>
                        <Link className="link" to="/password">
                          Mật khẩu
                        </Link>
                        <Link className="link" to="/delivery">
                          Địa chỉ giao hàng
                        </Link>
                        <Link className="link" to="/purchase">
                          Đơn Mua
                        </Link>
                      </>
                    )
                  }
                  <a className="link" href="/"
                    onClick={() => dispatch(signout())}
                  >
                    Đăng Xuất
                  </a>
                </Menu>
              </GroupAvatar>
            ) : (
              <span>
                <div className="links__group">
                  <Link to='/signup'>Đăng ký</Link>
                  <Link to='/signin'>Đăng nhập</Link>
                </div>
              </span>
            )
          }

        </Icon>
      </Container>
    </Head>
  );
}

export default Header;
