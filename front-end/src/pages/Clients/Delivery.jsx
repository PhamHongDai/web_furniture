import React, { useState } from "react";
import styled from "styled-components";
import AddressDialog from "../../components/UI/AddressDialog";
import { useDispatch, useSelector } from "react-redux";
import Helmet from "../../components/layout/Helmet";
import DeleteAddressDialog from "../../components/UI/DeleteAddressDialog";
import CommonSection from "../../components/UI/CommonSection";
import {
  addAddress,
  deleteAddress,
  setDefaultDeliveryInfoAddress,
} from "../../slices/addressSlice";
import { toast } from "react-toastify";

const Container = styled.section`
  margin: 0px 200px;
  .x{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;
  }
  .y h4{
    font-weight: 600;
    font-size: 1.4rem;
    color: #0D324D;
  }
  .buy__btn{
    width: 190px;
    border: none;
    outline: none;
    padding: 10px 20px;
    border-radius: 5px;
    background: #0D324D;
    cursor: pointer;
    font-size: 1rem;
  }
  .buy__btn span{
    color: #fff;
  }
  .buy__btn:hover{
    background: #1c689e;
  }
  .item-x{
    padding: 10px 0px;
    display: flex;
    align-items: center;
  }
  .item-x label{
    color: #555555CC;
    display: inline-block;
    width: 150px;
    height: 20px;
    max-width: 100%;
    text-align: right;
    margin-right: 27px;
  }
  .defaul__value{
    border: 2px solid #0D324D;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0D324D;
    padding: 5px 5px;
    margin: 0px 10px;
    border-radius: 3px;
  }
  .text__action{
    padding: 0px 10px;
    cursor: pointer;
  }
  .text__action:hover{
    color: #999;
  }
  .choose__btn{
    height: 40px;
    width: 100%;
    background: #fff;
    cursor: pointer;
    border: 1px solid #999;
    border-radius: 2px;
  }
  .choose__btn:hover{
      background: #e8e8e8;
    }
  .notifi_block{
    padding: 50px 20px;
    font-size: 1.5rem;
    text-align: center;
    color: #0D324D;
  }
`

const Delivery = () => {
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showDeleteAddressDialog, setShowDeleteAddressDialog] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState({
    _id: "",
    name: "",
    phoneNumber: "",
    address: "",
    isDefault: false,
  });
  const [formMode, setFormMode] = useState(true);
  const dispatch = useDispatch();
  const { deliveryInfo, loading } = useSelector((state) => state.address);

  const handleName = (event) => {
    setDeliveryAddress({ ...deliveryAddress, name: event.target.value });
  };

  const handlePhoneNumber = (event) => {
    setDeliveryAddress({ ...deliveryAddress, phoneNumber: event.target.value });
  };

  const handleAddress = (event) => {
    setDeliveryAddress({ ...deliveryAddress, address: event.target.value });
  };

  const handleAddBtn = () => {
    setShowAddressDialog((prev) => !prev);
    setFormMode(true);
    setDeliveryAddress({
      name: "",
      phoneNumber: "",
      address: "",
    });
  };

  const handleEditBtn = (item) => {
    setDeliveryAddress(item);
    setShowAddressDialog((prev) => !prev);
    setFormMode(false);
  };

  const handleUpdateAddress = async () => {
    if (
      deliveryAddress.name &&
      deliveryAddress.phoneNumber &&
      deliveryAddress.address
    ) {
      dispatch(addAddress({ address: deliveryAddress }));
      setShowAddressDialog((prev) => !prev);
      setDeliveryAddress({
        _id: "",
        name: "",
        phoneNumber: "",
        address: "",
        isDefault: false,
      });
    } else {
      toast.warning("Hãy điền đủ thông tin!");
    }
  };

  const handleAddAddress = async () => {
    if (
      deliveryAddress.name &&
      deliveryAddress.phoneNumber &&
      deliveryAddress.address
    ) {
      dispatch(addAddress({ address: deliveryAddress }));
      setShowAddressDialog((prev) => !prev);
      setDeliveryAddress({
        name: "",
        phoneNumber: "",
        address: "",
      });
    } else {
      toast.warning("Hãy điền đủ thông tin!");
    }
  };

  const handleDeleteBtn = async (id) => {
    setAddressId(id);
    setShowDeleteAddressDialog((prev) => !prev);
  };

  const handleDeleteAddress = async () => {
    dispatch(deleteAddress({ addressId: addressId }));
    setShowDeleteAddressDialog((prev) => !prev);
    setAddressId("");
  };

  const handleSetDefaultBtn = async (_id) => {
    dispatch(setDefaultDeliveryInfoAddress({ addressId: _id }));
  };

  return (
    <Helmet title="Địa chỉ vận chuyển">
      <CommonSection title="Địa chỉ vận chuyển"/>
      <Container>
        <div className="container">
          <div className="x" style={{borderBottom: "1px solid #999"}}>
            <div className="y">
              <h4>Địa Chỉ Của Tôi</h4>
            </div>

            <div className="y">
              <button className="buy__btn" onClick={handleAddBtn}>
                <span>Thêm Địa Chỉ Mới</span>
              </button>
            </div>
          </div>

          {
            loading ? (
              <div className="notifi_block">Loading...</div>
            ) : 
              deliveryInfo.address?.length === 0 || 
              deliveryInfo.address === undefined ? (
                <div className="notifi_block">Không có địa chỉ giao hàng</div>
              ) : (
                <>
                {
                  deliveryInfo.address?.map((item) => (
                    <div className="x" key={item._id} style={{borderBottom: "1px dotted rgba(0,0,0,0.2)"}}>
                      <div className="y">
                        <div className="item-x">
                          <label>Họ và tên</label>
                          <span>{item.name}</span>
                          {item.isDefault ? (
                            <div className="defaul__value">Mặc định</div>
                            ) : (
                            <></>
                          )}
                        </div>
                        <div className="item-x">
                          <label>Số điện thoại</label>
                          <span>{item.phoneNumber}</span>
                        </div>
                        <div className="item-x">
                          <label>Địa chỉ</label>
                          <span>{item.address}</span>
                        </div>
                    </div>

                    <div className="y">
                      <div className="item-x" style={{ justifyContent: "center" }}>
                        <span className="text__action" onClick={() => handleEditBtn(item)}>
                          Cập nhật
                        </span>
                        <span className="text__action" onClick={() => handleDeleteBtn(item._id)}>
                          Xóa
                        </span>
                      </div>
                      <div className="item-x">
                        <button className="choose__btn" onClick={() => handleSetDefaultBtn(item._id)}>
                          Thiết Lập Mặc Định
                        </button>
                      </div>
                    </div>
                  </div>
                  ))
                }
                </>
              )
          }
        <AddressDialog
          formMode={formMode}
          deliveryAddress={deliveryAddress}
          changeName={handleName}
          changePhoneNumber={handlePhoneNumber}
          changeAddress={handleAddress}
          addAddress={handleAddAddress}
          updateAddress={handleUpdateAddress}
          showAddressDialog={showAddressDialog}
          setShowAddressDialog={setShowAddressDialog}
        />
        <DeleteAddressDialog
          deleteAddress={handleDeleteAddress}
          showDeleteAddressDialog={showDeleteAddressDialog}
          setShowDeleteAddressDialog={setShowDeleteAddressDialog}
        />
        </div>
      </Container>
    </Helmet>
  );
};

export default Delivery;
