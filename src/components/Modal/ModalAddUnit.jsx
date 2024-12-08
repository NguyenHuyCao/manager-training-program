import { useState } from "react";
import { Modal, Input, Button } from "antd";
import "./ModalAddUnit.scss";
import { actionAddUnit } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const ModalAddUnit = () => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.addUnit.isShowAddUnit);
  const [groupCode, setGroupCode] = useState(""); // State lưu mã nhóm người dùng
  const [groupName, setGroupName] = useState(""); // State lưu tên nhóm người dùng

  const handleOk = () => {
    console.log("Mã nhóm:", groupCode);
    console.log("Tên nhóm:", groupName);
    dispatch(actionAddUnit.isShowModal());
    dispatch(actionAddUnit.isSuccessData());
  };

  const handleCancel = () => {
    dispatch(actionAddUnit.isShowModal());
  };

  return (
    <Modal
      title={<div className="modal-title">Thêm mới</div>}
      open={isShow}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
      className="modal-add-unit"
    >
      <div className="modal-content">
        <div className="modal-input-group">
          <label>
            Mã nhóm người dùng <span className="required">*</span>
          </label>
          <Input
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
          />
        </div>
        <div className="modal-input-group">
          <label>
            Tên nhóm người dùng <span className="required">*</span>
          </label>
          <Input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <Button onClick={handleCancel} className="cancel-button">
            Huỷ
          </Button>
          <Button type="primary" onClick={handleOk}>
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddUnit;
