import { Input, Table, Tooltip, Button, Modal, Form } from "antd";
import Header from "../Header/Header";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { IoAdd } from "react-icons/io5";
import { useEffect, useState } from "react";
import "./ManageGroupUsers.scss";
import { getGroupUsers } from "../../services/apiServices";

const ManageGroupUsers = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]); // Hold the fetched group data
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getGroupUsers();
      if (res && res.value) {
        setData(res.value); // Populate data from API
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (record) => {
    console.log("Chỉnh sửa nhóm:", record);
    setIsModalOpen(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: `Bạn có chắc chắn muốn xoá nhóm "${record.roleName}"?`,
      okText: "Xoá",
      cancelText: "Hủy",
      onOk: async () => {
        // await deleteGroupUser(record.code);
        setData((prevData) => prevData.filter((item) => item.id !== record.id)); // Remove deleted record from state
      },
    });
  };

  const handleAddNew = () => {
    form.validateFields().then(async (values) => {
      console.log("Thông tin nhóm mới:", values);
      // const res = await addGroupUser(values); // API request to add a new group
      // if (res && res.data) {
      //   setData((prevData) => [...prevData, res.data]); // Add new group to the data
      //   setIsModalOpen(false);
      //   form.resetFields();
      // }
    });
  };

  const filteredData = data.filter(
    (item) =>
      item.roleId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.roleName.toLowerCase().includes(searchText.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(startIndex, startIndex + pageSize);

  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "MÃ NHÓM NGƯỜI DÙNG", dataIndex: "roleId", key: "roleId" },
    { title: "NHÓM NGƯỜI DÙNG", dataIndex: "roleName", key: "roleName" },
    { title: "MÔ TẢ", dataIndex: "description", key: "description" },
    {
      title: "HOẠT ĐỘNG",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Xoá">
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header title={"QUẢN LÝ NHÓM NGƯỜI DÙNG"} />
      <div className="container-specialize">
        <div className="btn-add">
          <div className="title-specialized">Quản lý Nhóm người dùng</div>
          <div className="right-action">
            <div className="search-username">
              <Input
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={handleSearch}
                placeholder="Tìm kiếm nhóm người dùng"
                size={"large"}
                style={{ border: "rgb(145, 7, 7) solid 1px" }}
              />
            </div>
            <button className="btn" onClick={() => setIsModalOpen(true)}>
              <IoAdd /> <span>Thêm mới</span>
            </button>
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={currentPageData}
            pagination={{
              position: ["bottomCenter"],
              pageSize: pageSize,
              current: currentPage,
              onChange: handlePageChange,
              total: filteredData.length,
            }}
          />
        </div>
      </div>

      {/* Modal Thêm mới */}
      <Modal
        title="Thêm Nhóm Người Dùng"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddNew}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Mã Nhóm Người Dùng"
            name="roleId"
            rules={[{ required: true, message: "Vui lòng nhập mã nhóm" }]}
          >
            <Input placeholder="Nhập mã nhóm người dùng" />
          </Form.Item>
          <Form.Item
            label="Tên Nhóm Người Dùng"
            name="roleName"
            rules={[{ required: true, message: "Vui lòng nhập tên nhóm" }]}
          >
            <Input placeholder="Nhập tên nhóm người dùng" />
          </Form.Item>
          <Form.Item label="Mô Tả" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManageGroupUsers;
