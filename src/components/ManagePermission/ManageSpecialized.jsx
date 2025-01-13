import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Table, Tooltip, Modal, Form, Input as AntdInput } from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import { IoAdd } from "react-icons/io5";
import Header from "../Header/Header";
import { actionAddUnit } from "../../store";
import "./ManageSpecialized.scss";
import { getClass, updataClass } from "../../services/apiServices"; // Import the necessary functions

const ManageSpecialized = () => {
  const [loading, setLoading] = useState(false);
  const [classData, setClassData] = useState([]); // Initialize with an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // State for showing modal
  const [editingClass, setEditingClass] = useState(null); // State to store the class being edited
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClassData = async () => {
      setLoading(true);
      try {
        const res = await getClass(); // Fetch class data
        console.log("Class data response:", res);
        if (res && res.value) {
          setClassData(res.value); // Update state with the 'value' array from the response
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleEdit = (record) => {
    setEditingClass(record);
    setIsModalVisible(true); // Show modal when editing
  };

  const handleModalOk = async () => {
    // Logic to save the edited class
    console.log("Edited class data:", editingClass);
    const res = await updataClass(
      editingClass.id,
      editingClass.classId,
      editingClass.className
    );

    console.log("res", res);
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Close modal without saving
  };

  const handleChange = (e) => {
    setEditingClass({
      ...editingClass,
      [e.target.name]: e.target.value,
    });
  };

  // Filter data based on search text
  const filteredData = classData.filter(
    (item) =>
      item.classId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.className.toLowerCase().includes(searchText.toLowerCase())
  );

  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(startIndex, startIndex + pageSize);

  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "MÃ LỚP CHUYÊN NGÀNH", dataIndex: "classId", key: "classId" },
    {
      title: "TÊN LỚP CHUYÊN NGÀNH",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Hành động",
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
    <div className="content-page-specialize">
      <Header title={"QUẢN LÝ LỚP CHUYÊN NGÀNH"} />
      <div className="container-specialize">
        <div className="btn-add">
          <div className="title-specialized">Quản lý Lớp chuyên ngành</div>
          <div className="right-action">
            <div className="search-username">
              <Input
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={handleSearch}
                placeholder="Tìm kiếm lớp chuyên ngành"
                size={"large"}
                style={{ border: "rgb(145, 7, 7) solid 1px" }}
              />
            </div>
            <button
              className="btn"
              onClick={() => dispatch(actionAddUnit.isShowModal())}
            >
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
            loading={loading} // Show loading spinner while fetching data
          />
        </div>
      </div>

      {/* Modal for editing class */}
      <Modal
        title="Chỉnh sửa lớp chuyên ngành"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form>
          <Form.Item label="Mã lớp chuyên ngành">
            <AntdInput
              name="classId"
              value={editingClass?.classId || ""}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Tên lớp chuyên ngành">
            <AntdInput
              name="className"
              value={editingClass?.className || ""}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageSpecialized;
