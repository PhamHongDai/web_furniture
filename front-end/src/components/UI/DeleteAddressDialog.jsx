import React from "react";
import styled from "styled-components";

const Background = styled.div`
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DialogWrapper = styled.div`
  width: 400px;
  height: 100px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  border-radius: 5px;
  padding: 30px 20px 5px 20px;
`;
const Title = styled.span`
  font-size: 16px;
`;

const Item = styled.div`
  margin: 30px;
  display: flex;
`;

const ButtonWhite = styled.button`
  height: 40px;
  width: 170px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 2px;
  margin-left: 25px;
  outline: none;
  border: none;
  :hover {
    background-color: #d7d7d7;
  }
`;

const ButtonPrimary = styled(ButtonWhite)`
  background-color: #0D324D;
  border: none;
  margin-right: 25px;
  color: #fff;

  :hover {
    background-color: #1c689e;
  }
`;

const DeleteAddressDialog = ({
  deleteAddress,
  showDeleteAddressDialog,
  setShowDeleteAddressDialog
}) => {
  return (
    <React.Fragment>
      {showDeleteAddressDialog ? (
        <Background>
          <DialogWrapper
            style={{ display: "inline-table" }}
          >
            <Title>Bạn có chắc muốn xoá địa chỉ này?</Title>
            <Item>
              <ButtonWhite
                onClick={() => setShowDeleteAddressDialog((prev) => !prev)}
                >TRỞ LẠI
              </ButtonWhite>
              <ButtonPrimary 
                onClick={deleteAddress}
                >XÓA
              </ButtonPrimary>
            </Item>
          </DialogWrapper>
        </Background>
      ) : null}
    </React.Fragment>
  );
};

export default DeleteAddressDialog;
