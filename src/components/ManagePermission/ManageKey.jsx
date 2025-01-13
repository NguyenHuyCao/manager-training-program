import {
  Input,
  Table,
  Tooltip,
  Modal,
  Form,
  Button,
  message,
  Select,
} from "antd";
import Header from "../Header/Header";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { getKeys, addKey, updateKey } from "../../services/apiServices"; // Import updateKey
import "./ManageKey.scss";

const { Option } = Select;

const ManageKey = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getKeys();
      if (res?.value) {
        const formattedData = res.value.map((item) => ({
          key: item.id,
          code: item.schoolYearId, // schoolYearId là kiểu number
          name: item.schoolYearName,
          startYear: new Date(item.startYear).getFullYear(),
          endYear: new Date(item.endYear).getFullYear(),
        }));
        setData(formattedData);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu khóa:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Define the function to format date
      const formatDate = (year) => `${year}-01-01`;

      const newKeyData = {
        schoolYearId: Number(values.code.trim()), // Chuyển đổi sang kiểu number
        schoolYearName: String(values.name.trim()),
        startYear: formatDate(values.startYear),
        endYear: formatDate(values.endYear),
      };

      console.log("newKeyData", newKeyData);
      if (editingRecord) {
        // If editing an existing record, call the update API
        const response = await updateKey(
          editingRecord.key, // Pass the ID of the record being updated
          newKeyData.schoolYearId,
          newKeyData.schoolYearName,
          newKeyData.startYear,
          newKeyData.endYear
        );
        if (response.id) {
          message.success("Cập nhật khoá thành công!");
        } else {
          message.error(`Cập nhật khoá thất bại: ${response?.message}`);
        }
      } else {
        // If adding a new record, call the add API
        const response = await addKey(
          newKeyData.schoolYearId,
          newKeyData.schoolYearName,
          newKeyData.startYear,
          newKeyData.endYear
        );
        if (response.id) {
          message.success("Thêm mới khoá thành công!");
        } else {
          message.error(`Thêm mới khoá thất bại: ${response?.message}`);
        }
      }

      setIsModalOpen(false);
      fetchData(); // Re-fetch the data after adding/updating
    } catch (info) {
      console.log("Lỗi khi lưu:", info);
      message.error("Lỗi khi lưu thông tin!");
    }
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
