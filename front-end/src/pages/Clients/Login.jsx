import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Helmet from "../../components/layout/Helmet";
import { signin } from "../../slices/authSlice";
import { toast } from "react-toastify";
const Container = styled.div`
  .login__form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  form{
    width: 30%;
    background: #22101b;
    padding: 40px 10px;
    border-radius: 5px;
    text-align: center;
  }
  form p {
    color: #fff;
  }
  form a {
    color: orange;
    text-decoration: underline;
  }
  form a:hover {
    color: #fff;
  }
  .form__group input, 
  .form__group textarea{
    width: 80%;
    border-radius: 5px;
    padding: 12px 15px;
    resize: none;
  }
  .form__group input:focus, 
  .form__group textarea:focus{
    outline: none;
  }
  .form__group{
    margin-bottom: 10px;
  }
  .login__form h3 {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .buy__btn{
    border: none;
    outline: none;
    padding: 10px 20px;
    margin: 20px 7px;
    border-radius: 5px;
    background: #fff;
    color: #111;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
  }
`

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.includes(".com", 0)) {
      toast.error("Email không tồn tại!");
    } else if (password.length < 6) {
      toast.error("Mật khẩu phải lớn hơn 6 kí tự");
    } else {
      try {
         const res = await dispatch(signin({ email, password })).unwrap();
        if (res.status === 200 && res.data.user.role === "user") {
          toast.success("Người dùng đăng nhập thành công");
          setTimeout(function () {
            navigate("/");
          }, 1000);
        } else {
          toast.success("Admin đăng nhập thành công");
          setTimeout(function () {
            navigate("/admin");
          }, 1000);
        }
      } catch (error) { 
        toast.error(error.error);
      }
    }
  };
  
    return (
      <Helmet title='Đăng nhập'>
        <section>
          <Container>
            <div className="x">
              <div className="login__form">
                <h3>Đăng nhập</h3>
                <form onSubmit={handleLogin}>
                  <div className="form__group">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                  />
                  </div>
                  <div className="form__group">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    type="password"
                    required
                  />
                  </div>

                  <button type="submit" className="buy__btn">Đăng nhập</button>
                  <p>Chưa có tài khoản? <Link to="/signup">Tạo tài khoản</Link></p>
                </form>
              </div>
            </div>
          </Container>
        </section>
      </Helmet>
    );
  }
  
export default Login;
  