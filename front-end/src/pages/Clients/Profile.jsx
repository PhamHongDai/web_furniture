import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../slices/authSlice";
import { phoneSchema, nameSchema } from "../../validation/authValidations";
import { toast } from "react-toastify";
import Helmet from "../../components/layout/Helmet";
import CommonSection from "../../components/UI/CommonSection";

const Container = styled.section`
  .content{
    display: flex;
    flex-direction: column;
    /* background: #f2f1f186; */
    margin: 0px 120px;
    height: 400px;
    border-radius: 5px;
  }
  .x{
    display: grid;
    grid-template-columns: 30% 70%;
  }
  .group__input{
    display: flex;
    flex-direction: column;
    margin: 20px 10px;
  }
  .group__input span{
    color: #999;
    width: 150px;
    height: 20px;
    max-width: 100%;
    margin: 5px 5px;
  }
  .group__input input {
    height: 35px;
    width: 700px;
    outline: none;
    border: 1px solid #999;
    border-radius: 5px;
    padding: 0px 10px;
  }
  .warning {
    border: 2px solid #ee4d2da2;
  }
  .buy__btn{
    width: 70px;
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
  .wrap__img-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60%;
    margin: 20px 0px;
  }
  .wrap__img-info img{
    height: 6rem;
    width: 6rem;
    border-radius: 5rem;
    margin: 15px 0px;
  }
  .wrapChooseImg {
    position: relative;
  }
  .chooseFile {
    position: relative;
    max-width: 100px;
    height: 40px;
    z-index: 2;
    cursor: pointer;
    opacity: 0;
  }
  .choose__btn{
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 100px;
    z-index: 1;
    background: #fff;
    cursor: pointer;
    border: 1px solid #999;
    border-radius: 2px;
  }
  .wrapChooseImg:hover {
    .choose__btn{
      background: #e8e8e8;
    }
  }
`;

const Profile = () => {

  const { user, loading } = useSelector((state) => state.auth);
  const [nameValid, setNameValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
    profilePicture: null,
    profilePictureToChange: null,
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        ...userInfo,
        name: user.name,
        profilePicture: user.profilePicture,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user]);

  const handleName = (event) => {
    setUserInfo({ ...userInfo, name: event.target.value });
  };

  const handlePhoneNumber = (event) => {
    setUserInfo({ ...userInfo, phoneNumber: event.target.value });
  };

  const checkNameValidation = (value) => {
    nameSchema
      .validate({ name: value })
      .then(() => setNameValid(true))
      .catch(() => setNameValid(false));
  };
  const checkPhoneValidation = (value) => {
    phoneSchema
      .validate({ phone: value })
      .then(() => setPhoneValid(true))
      .catch(() => setPhoneValid(false));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", userInfo.name);
    form.append("phoneNumber", userInfo.phoneNumber);
    if (userInfo.profilePictureToChange) {
      form.append("profilePicture", userInfo.profilePictureToChange);
    }
    if (!nameValid) {
      toast.warning("T??n ng?????i d??ng ph???i c?? t???i thi???u c?? 5 k?? t???");
    }
    else if (!phoneValid) {
      toast.warning("S??? ??i???n tho???i ph???i l?? s??? v?? n???m trong kho???ng 10-11 k?? t???");
    }
    else {
      try {
        const res = await dispatch(updateUserInfo(form)).unwrap();
        if (res.status === 202) {
          toast.info("C???p nh???t th??ng tin th??nh c??ng !")
        }
      } catch (err) {
        toast.warning("Vui l??ng ki???m tra l???i c??c th??ng tin cho ch??nh x??c !");
      }
    }
  };

  const handleSelectImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserInfo({
          ...userInfo,
          profilePicture: reader.result,
          profilePictureToChange: e.target.files[0],
        });
      } else return;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Helmet title="H??? s?? ng?????i d??ng">
      <CommonSection title="H??? s?? ng?????i d??ng" />
      <Container>
        <div className="content">
          <div className="x">
            <div className="y">
              <div className="wrap__img-info">
                <img src={userInfo.profilePicture || user.profilePicture} />
                <div className="wrapChooseImg">
                  <input
                    className="chooseFile"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleSelectImage}
                  />
                  <button className="choose__btn">Ch???n ???nh</button>
                </div>
              </div>
            </div>
            <div className="y">
              <div className="group__input">
                <span>T??n</span>
                <input className={nameValid ? "" : "warning"}
                  onChange={handleName} defaultValue={user.name}
                  onBlur={(e) => checkNameValidation(e.target.value)} />
              </div>
              <div className="group__input">
                <span>Email</span>
                <input defaultValue={user.email} disabled />
              </div>
              <div className="group__input">
                <span>S??? ??i???n Tho???i</span>
                <input className={phoneValid ? "" : "warning"}
                  type="number"
                  onChange={handlePhoneNumber}
                  defaultValue={user.phoneNumber === undefined ? "" : user.phoneNumber ? user.phoneNumber : ""}
                  onBlur={(e) => checkPhoneValidation(e.target.value)} />
              </div>
              <div className="group__input">
                <button className="buy__btn" onClick={handleSave}>L??u</button>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </Helmet>
  );
};

export default Profile;
