import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { sendOtpToEmail, updateForgetPassword } from "../../slices/authSlice";
import { toast } from "react-toastify";
import Helmet from "../../components/layout/Helmet";
import CommonSection from "../../components/UI/CommonSection";
import { useEffect } from "react";

const Container = styled.section`
  .content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0px 120px;
    height: 400px;
    border-radius: 5px;
  }
  .group__input{
    display: flex;
    flex-direction: row;
    margin: 20px 10px;
    align-items: center;
  }
  .group__input span{
    display: inline-block;
    color: #999;
    width: 150px;
    height: 20px;
    max-width: 100%;
    text-align: right;
    margin: 5px 10px;
  }
  .group__input input {
    height: 35px;
    width: 400px;
    outline: none;
    border: 1px solid #999;
    border-radius: 5px;
    padding: 0px 10px;
  }
  .group__input label{
    cursor: pointer;
    padding: 0px 20px;
    color: coral;
    text-decoration: underline;
  }
  .group__input a:hover{
    color: #fbaf93;
  }
  .buy__btn{
    width: 120px;
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
`;

const Password = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleOTP = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      const res = await dispatch(sendOtpToEmail({ email })).unwrap()
      if (res.status === 201) {
        toast.info('Mã OTP đã gửi. Xin hãy kiểm tra email')
      }
    }
  };

  const handleChangePass = async (e) => {
    if (pass !== confirmPass) {
      toast.error('Mật khẩu không trùng khớp');
    } else {
      const change = await dispatch(updateForgetPassword({ otp, password: pass, email: email}));
      if(change.payload.status === 202) {
        toast.info("Đổi mật khẩu thành công!")
      } else {
        toast.error("Sai mã OTP!")
      }
    }
  }
  useEffect (() => {
    setEmail(user.email);
  },[user])

  return (
    <Helmet title="Đổi mật khẩu">
      <CommonSection title="Đổi mật khẩu" />
      <Container>
        <div className="content">
          <div className="y">
            <div className="group__input">
              <span>Xác nhận mã OTP</span>
              <input onChange={(e) => setOtp(e.target.value)} type="text" />
              <label onClick={handleOTP}>Lấy mã OTP</label>
            </div>
            <div className="group__input">
              <span>Mật Khẩu Mới</span>
              <input onChange={(e) => setPass(e.target.value)} type="password" />
            </div>
            <div className="group__input">
              <span>Xác Nhận Mật Khẩu</span>
              <input onChange={(e) => setConfirmPass(e.target.value)} type="password" />
            </div>
            <div className="group__input">
              <span></span>
              <button className="buy__btn" onClick={handleChangePass}>Xác Nhận</button>
            </div>
          </div>
        </div>
      </Container>
    </Helmet>
  );
};

export default Password;
