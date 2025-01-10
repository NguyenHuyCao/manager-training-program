import { Table, Input, Button, Tooltip, Modal } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import Header from "../Header/Header";
import "./ManageIndustry.scss";

const ManageIndustry = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const data = [
    { key: "1", code: "C01", name: "Công nghệ Thông tin" },
    { key: "2", code: "C02", name: "Kinh tế" },
    { key: "3", code: "C03", name: "Điện tử" },
    { key: "4", code: "C04", name: "Cơ khí" },
    { key: "5", code: "C05", name: "Y dược" },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (record) => {
    console.log("Chỉnh sửa ngành học:", record);
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
    { title: "MÃ NGÀNH HỌC", dataIndex: "code", key: "code" },
    { title: "TÊN NGÀNH HỌC", dataIndex: "name", key: "name" },
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
      <Header title={"QUẢN LÝ NGÀNH HỌC"} />
      <div className="container-specialize">
        <div className="btn-add">
          <div className="title-specialized">Quản lý Ngành học</div>
          <div className="right-action">
            <div className="search-username">
              <Input
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={handleSearch}
                placeholder="Tìm kiếm ngành học"
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

      {/* Modal for adding or editing an industry */}
      <Modal
        title="Thêm Mới Ngành Học"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <div>
          {/* Your form or inputs for adding/editing an industry */}
          <Input placeholder="Mã ngành học" style={{ marginBottom: 10 }} />
          <Input placeholder="Tên ngành học" />
          <div style={{ marginTop: 20 }}>
            <Button
              type="primary"
              onClick={() => console.log("Thêm mới ngành học")}
            >
              Thêm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageIndustry;
