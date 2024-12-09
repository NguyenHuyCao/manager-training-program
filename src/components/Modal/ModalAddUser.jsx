import "./ModalAddUser.scss";
import { Modal, Input, Select, Divider, Form, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actionAddUser } from "../../store";

const ModalAddUser = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.addUser.isShowAddUser);

  // Xử lý khi nhấn nút Lưu
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Dữ liệu người dùng mới:", values);
        onClose(); // Đóng modal sau khi lưu thành công
      })
      .catch((errorInfo) => {
        console.error("Lỗi khi lưu dữ liệu:", errorInfo);
      });

    dispatch(actionAddUser.isShowModal());
    dispatch(actionAddUser.isSuccessData());
  };

  const onClose = () => {
    dispatch(actionAddUser.isShowModal());
  };

  return (
    <Modal
      title={
        <div style={{ fontWeight: "bold", textAlign: "center" }}>Thêm mới</div>
      }
      open={isShow}
      footer={null}
      onCancel={onClose}
      width={600}
      className="modal-container"
    >
      <Divider className="divider" />

      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mã đăng nhập"
              name="code"
              rules={[
                { required: true, message: "Vui lòng nhập mã đăng nhập" },
              ]}
            >
              <Input placeholder="Nhập mã đăng nhập" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input placeholder="Nhập email" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên người dùng"
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên người dùng" },
              ]}
            >
              <Input placeholder="Nhập tên người dùng" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Nhóm người dùng" name="usergroup">
              <Select placeholder="Chọn nhóm người dùng">
                <Select.Option value="Phòng đào tạo">
                  Phòng đào tạo
                </Select.Option>
                <Select.Option value="Phòng hành chính">
                  Phòng hành chính
                </Select.Option>
                <Select.Option value="Phòng kế toán">
                  Phòng kế toán
                </Select.Option>
                <Select.Option value="Phòng nhân sự">
                  Phòng nhân sự
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Nhóm quyền" name="permissionGroup">
              <Select placeholder="Chọn nhóm quyền">
                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="User">User</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Khoa" name="department">
              <Select placeholder="Chọn khoa">
                <Select.Option value="Toán - Tin">Toán - Tin</Select.Option>
                <Select.Option value="Hóa học">Hóa học</Select.Option>
                <Select.Option value="Vật lý">Vật lý</Select.Option>
                <Select.Option value="Sinh học">Sinh học</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Bộ môn" name="subject">
              <Select placeholder="Chọn bộ môn">
                <Select.Option value="Giải tích">Giải tích</Select.Option>
                <Select.Option value="Đại số">Đại số</Select.Option>
                <Select.Option value="Hóa phân tích">
                  Hóa phân tích
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <div className="action-buttons">
        <button onClick={onClose}>Hủy</button>
        <button type="primary" onClick={handleSave}>
          Lưu
        </button>
      </div>
    </Modal>
  );
};

export default ModalAddUser;
