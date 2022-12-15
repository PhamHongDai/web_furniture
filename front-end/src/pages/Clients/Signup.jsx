import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Helmet from "../../components/layout/Helmet";
import { signup } from "../../slices/authSlice";


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

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
      toast.error("Tên tối thiểu 3 ký tự");
    } else if (!email.includes(".com", 0)) {
      toast.error("Email phải có .com");
    } else if (password.length < 6 || confirmPassword.length < 6) {
      toast.error("Độ dài tối thiểu là 6");
    } else if (password !== confirmPassword) {
      toast.error("Mật khẩu không trùng khớp!");
    } else {
      try {
        const res = await dispatch(signup({ email, password, name }));
        console.log(res)
        if (res.payload.error === "User already exists !") {
          toast.warning("Tài khoản đã tồn tại");
        }else if (res.payload.request.status === 201) {
          toast.success("Đăng ký thành công!");
          setTimeout(function () {
            navigate("/signin");
          }, 1000);
        }
      } catch (error) {
        toast.error(error.error);
      }
    }
  };

    return (
      <Helmet title='Đăng ký'>
        <section>
          <Container>
            <div className="x">
              <div className="login__form">
                <h3>Đăng ký</h3>
                <form onSubmit={handleSignUp}>
                  <div className="form__group">
                    <input type="text" placeholder="Tên người dùng" 
                    value={name} onChange={e=> setName(e.target.value)}/>
                  </div>
                  <div className="form__group">
                    <input type="email" placeholder="Hãy nhập email..." 
                    value={email} onChange={e=> setEmail(e.target.value)}/>
                  </div>
                    <div className="form__group">
                    <input type="password" placeholder="Hãy nhập mật khẩu..."
                    value={password} onChange={e=> setPassword(e.target.value)}/>
                  </div>
                  <div className="form__group">
                    <input type="password" placeholder="Xác nhận mật khẩu"
                    value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}/>
                  </div>

                  <button type="submit" className="buy__btn">Tạo tài khoản</button>
                  <p>Đã có tài khoản? <Link to="/signin">Đăng nhập</Link></p>
                </form>
              </div>
            </div>
          </Container>
        </section>
      </Helmet>
    );
  }
  
export default Signup;
  