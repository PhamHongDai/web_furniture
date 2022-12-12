import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { nameSchema, phoneSchema, stringSchema } from "../../validation/authValidations";

const Background = styled.div`
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 1000;
  align-items: center;
`

const DialogWrapper = styled.div`
  width: 450px;
  height: 280px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  border-radius: 5px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Title = styled.h5`
  font-weight: 600;
  font-size: 1.2rem;
  padding-bottom: 10px;
`

const Item = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;

  .warning {
    border: 1px solid #EE4D2D;
  }
`

const Input = styled.input`
  height: 35px;
  width: 195px;
  border: 1px solid #999;
  outline: none;
  border-radius: 2px;
  font-size: 14px;
  padding-left: 10px;
`

const AddressInput = styled.textarea`
  resize: none;
  height: 70px;
  width: 450px;
  border: 1px solid #999;
  border-radius: 2px;
  outline: none;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  padding: 10px;
`

const ButtonWhite = styled.button`
  height: 40px;
  width: 170px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 2px;
  margin-left: 25px;
  outline: none;
  border: none;
  &:hover {
    background: #d7d7d7;
  }
`

const ButtonPrimary = styled(ButtonWhite)`
  background: #0D324D;
  border: none;
  margin-right: 25px;
  color: #fff;

  &:hover {
    background: #1c689e;
  }
`

const AddressDialog = ({
  formMode,
  deliveryAddress,
  changeName,
  changePhoneNumber,
  changeAddress,
  addAddress,
  updateAddress,
  showAddressDialog,
  setShowAddressDialog
}) => {

  const [nameValid, setNameValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [stringValid, setStringValid] = useState(true);

  const checkNameValidation = (value) => {
    nameSchema
      .validate({ name : value })
      .then(() => setNameValid(true))
      .catch(() => setNameValid(false));
  };
  const checkPhoneValidation = (value) => {
    phoneSchema
      .validate({ phone : value })
      .then(() => setPhoneValid(true))
      .catch(() => setPhoneValid(false));
  };
  const checkStringValidation = (value) => {
    stringSchema
      .validate({ string : value })
      .then(() => setStringValid(true))
      .catch(() => setStringValid(false));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!nameValid)
    {
      toast.warning("Họ và tên phải có tối thiểu có 5 kí tự");
    } 
    else if (!phoneValid) {
      toast.warning("Số điện thoại phải là số và nằm trong khoảng 10-11 kí tự");
    }
    else if (!stringValid){
      toast.warning("Địa chỉ phải có tối thiếu 5 kí tự và tối đa 100 kí tự");
    }
    else if (formMode) {
      await addAddress();
    }
    else {
      await updateAddress();
    }
  }

  return (
    <React.Fragment>
      {showAddressDialog ? (
        <Background>
          <DialogWrapper>
            <Title>{formMode ? "Thêm" : "Cập nhật"} địa chỉ</Title>
            <Item>
              <Input placeholder="Họ và tên" className={nameValid ? "" : "warning"}
              onChange={changeName} defaultValue={deliveryAddress.name} 
              onBlur={(e) => checkNameValidation(e.target.value)}/>
              <Input placeholder="Số điện thoại" className={phoneValid ? "" : "warning"}
              type="number"
              onChange={changePhoneNumber} defaultValue={deliveryAddress.phoneNumber} 
              onBlur={(e) => checkPhoneValidation(e.target.value)}/>
            </Item>
            <Item>
              <AddressInput className={stringValid ? "" : "warning"}
                placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                onChange={changeAddress} defaultValue={deliveryAddress.address}
                onBlur={(e) => checkStringValidation(e.target.value)}/>
            </Item>
            <Item> 
              <ButtonWhite
                onClick={() => setShowAddressDialog((prev) => !prev)}
              >
                Trở Lại
              </ButtonWhite>
              <ButtonPrimary type="submit" 
                onClick={handleSubmit}
                >
                {formMode ? 'Thêm' : 'Cập nhật'}
              </ButtonPrimary>
            </Item>
          </DialogWrapper>
        </Background>
      ) : null}
    </React.Fragment>
  );
};

export default AddressDialog;
