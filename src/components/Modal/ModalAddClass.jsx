import { useState } from "react";
import { Modal, Input, Button, notification } from "antd";
import "./ModalAddUnit.scss";
import { actionAddUnit } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { addClass } from "../../services/apiServices";

const ModalAddUnit = () => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.addUnit.isShowAddUnit);
  const [groupCode, setGroupCode] = useState(""); // State lưu mã nhóm người dùng
  const [groupName, setGroupName] = useState(""); // State lưu tên nhóm người dùng
  const [loading, setLoading] = useState(false); // Track loading state for the API call

  const handleOk = async () => {
    // Validate input fields before making the API call
    if (!groupCode || !groupName) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin.",
      });
      return;
    }

    setLoading(true);
    try {
      // Make API call to add a new class
      const res = await addClass(groupCode, groupName);
      // console.log("res", res);

      if (res) {
        // Check if the response is successful
        notification.success({
          message: "Thêm mới thành công",
          description: `Lớp chuyên ngành ${groupName} đã được thêm.`,
        });

        // Close the modal
        dispatch(actionAddUnit.isShowModal());
        dispatch(actionAddUnit.isSuccessData());

        // Clear form inputs
        setGroupCode("");
        setGroupName("");
      } else {
        throw new Error(res.message || "Thêm mới không thành công.");
      }
    } catch (error) {
      // Handle error if API call fails
      notification.error({
        message: "Lỗi",
        description:
          error.message || "Có lỗi xảy ra khi thêm lớp chuyên ngành.",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleCancel = () => {
    dispatch(actionAddUnit.isShowModal()); // Close modal when Cancel is clicked
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
      confirmLoading={loading} // Show loading spinner on button during API call
    >
      <div className="modal-content">
        <div className="modal-input-group">
          <label>
            Mã lớp chuyên ngành <span className="required">*</span>
          </label>
          <Input
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            disabled={loading} // Disable input when loading
          />
        </div>
        <div className="modal-input-group">
          <label>
            Tên lớp chuyên ngành <span className="required">*</span>
          </label>
          <Input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            disabled={loading} // Disable input when loading
          />
        </div>
        <div className="modal-footer">
          <Button
            onClick={handleCancel}
            className="cancel-button"
            disabled={loading} // Disable cancel button during loading
          >
            Huỷ
          </Button>
          <Button
            type="primary"
            onClick={handleOk}
            loading={loading} // Show loading spinner on save button during API call
          >
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddUnit;
