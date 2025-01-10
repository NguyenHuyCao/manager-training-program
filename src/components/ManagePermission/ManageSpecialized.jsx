import "./ManageSpecialized.scss";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import { Input, Table, Tooltip } from "antd";
import { useState } from "react";
import { actionAddUnit } from "../../store";
import { useDispatch } from "react-redux";
import Header from "../Header/Header";
import { IoAdd } from "react-icons/io5";

const ManageSpecialized = () => {
  const data = [
    { key: "1", code: "PDT", permission: "Phòng đào tạo" },
    { key: "2", code: "TK", permission: "Khoa" },
    { key: "3", code: "HC", permission: "Hành chính" },
    { key: "4", code: "KT", permission: "Kế toán" },
    { key: "5", code: "CNTT", permission: "Công nghệ thông tin" },
    { key: "6", code: "YTP", permission: "Y tế dự phòng" },
    { key: "7", code: "DT", permission: "Đào tạo" },
    { key: "8", code: "TT", permission: "Thư viện" },
    { key: "9", code: "QT", permission: "Quản trị" },
    { key: "10", code: "PTC", permission: "Phát triển chung" },
    { key: "11", code: "NN", permission: "Ngoại ngữ" },
    { key: "12", code: "GDTC", permission: "Giáo dục thể chất" },
    { key: "13", code: "CTSV", permission: "Công tác sinh viên" },
    { key: "14", code: "MT", permission: "Môi trường" },
    { key: "15", code: "DL", permission: "Du lịch" },
  ];

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleEdit = (record) => {
    console.log("Chỉnh sửa:", record);
    // Thêm logic chỉnh sửa tại đây (ví dụ: mở modal hoặc chuyển trang)
  };

  const filteredData = data.filter(
    (item) =>
      item.code.toLowerCase().includes(searchText.toLowerCase()) ||
      item.permission.toLowerCase().includes(searchText.toLowerCase())
  );

  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(startIndex, startIndex + pageSize);

  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "MÃ LỚP CHUYÊN NGÀNH", dataIndex: "code", key: "code" },
    {
      title: "TÊN LỚP CHUYÊN NGÀNH",
      dataIndex: "permission",
      key: "permission",
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
          />
        </div>
      </div>
    </div>
  );
};

export default ManageSpecialized;
