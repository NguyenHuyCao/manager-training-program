import { Input, Table, Tooltip, Modal, Form, Button, Select } from "antd";
import Header from "../Header/Header";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import "./ManageKey.scss";

const { Option } = Select;

const ManageKey = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  const data = [
    { key: "1", code: "K01", name: "Khoá 1", startYear: 2015, endYear: 2019 },
    { key: "2", code: "K02", name: "Khoá 2", startYear: 2016, endYear: 2020 },
    { key: "3", code: "K03", name: "Khoá 3", startYear: 2017, endYear: 2021 },
    { key: "4", code: "K04", name: "Khoá 4", startYear: 2018, endYear: 2022 },
    { key: "5", code: "K05", name: "Khoá 5", startYear: 2019, endYear: 2023 },
  ];

  const pageSize = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingRecord) {
          console.log("Cập nhật khoá:", { ...editingRecord, ...values });
        } else {
          console.log("Thêm mới khoá:", values);
        }
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log("Lỗi khi lưu:", info);
      });
  };

  const filteredData = data.filter(
    (item) =>
      item.code.toLowerCase().includes(searchText.toLowerCase()) ||
      item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(startIndex, startIndex + pageSize);

  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "MÃ KHOÁ", dataIndex: "code", key: "code" },
    { title: "TÊN KHOÁ", dataIndex: "name", key: "name" },
    { title: "NĂM BẮT ĐẦU", dataIndex: "startYear", key: "startYear" },
    { title: "NĂM KẾT THÚC", dataIndex: "endYear", key: "endYear" },
    {
      key: "action",
      render: (text, record) => (
        <Tooltip title="Chỉnh sửa">
          <EditOutlined
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => handleEdit(record)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Header title={"QUẢN LÝ KHOÁ"} />
      <div className="container-specialize">
        <div className="btn-add">
          <div className="title-specialized">Quản lý Khoá</div>
          <div className="right-action">
            <div className="search-username">
              <Input
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={handleSearch}
                placeholder="Khoá"
                size={"large"}
                style={{ border: "rgb(145, 7, 7) solid 1px" }}
              />
            </div>
            <button className="btn" onClick={handleAdd}>
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

      {/* Modal thêm/sửa khoá */}
      <Modal
        title={editingRecord ? "Chỉnh sửa khoá" : "Thêm mới khoá"}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Thoát
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Mã khoá"
            name="code"
            rules={[{ required: true, message: "Vui lòng nhập mã khoá!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên khoá"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên khoá!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Năm bắt đầu"
            name="startYear"
            rules={[{ required: true, message: "Vui lòng chọn năm bắt đầu!" }]}
          >
            <Select placeholder="Chọn năm bắt đầu">
              {[...Array(10)].map((_, i) => (
                <Option key={2015 + i} value={2015 + i}>
                  {2015 + i}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Năm kết thúc"
            name="endYear"
            rules={[{ required: true, message: "Vui lòng chọn năm kết thúc!" }]}
          >
            <Select placeholder="Chọn năm kết thúc">
              {[...Array(10)].map((_, i) => (
                <Option key={2019 + i} value={2019 + i}>
                  {2019 + i}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManageKey;
