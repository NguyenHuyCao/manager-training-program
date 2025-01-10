import { Table, Input, Button, Tooltip, Modal } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import Header from "../Header/Header";
import "./ManageSubject.scss";

const ManageSubject = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const data = [
    {
      key: "1",
      code: "M01",
      name: "Môn Toán",
    },
    {
      key: "2",
      code: "M02",
      name: "Môn Lý",
    },
    {
      key: "3",
      code: "M03",
      name: "Môn Hóa",
    },
    {
      key: "4",
      code: "M04",
      name: "Môn Sinh",
    },
    {
      key: "5",
      code: "M05",
      name: "Môn Văn",
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (record) => {
    console.log("Chỉnh sửa môn:", record);
    // Open modal to edit the subject
    setIsModalOpen(true);
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
    { title: "MÃ BỘ MÔN", dataIndex: "code", key: "code" },
    { title: "TÊN BỘ MÔN", dataIndex: "name", key: "name" },
    {
      // title: "HOẠT ĐỘNG",
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
        </div>
      ),
    },
  ];

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header title={"QUẢN LÝ BỘ MÔN"} />
      <div className="container-specialize">
        <div className="btn-add">
          <div className="title-specialized">Quản lý Bộ môn</div>
          <div className="right-action">
            <div className="search-username">
              <Input
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={handleSearch}
                placeholder="Tìm kiếm bộ môn"
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

      {/* Modal for adding or editing a subject */}
      <Modal
        title="Thêm Mới Bộ Môn"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <div>
          {/* Your form or inputs for adding/editing a subject */}
          <Input placeholder="Mã bộ môn" style={{ marginBottom: 10 }} />
          <Input placeholder="Tên bộ môn" />
          <div style={{ marginTop: 20 }}>
            <Button
              type="primary"
              onClick={() => console.log("Thêm mới bộ môn")}
            >
              Thêm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageSubject;
