import "./ManageUsers.scss";
import {
  AppstoreAddOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Table } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionIsShowAddPermission } from "../../store";

const ManageUsers = () => {
  // Dữ liệu mẫu
  const data = [
    {
      key: "1",
      code: "PDT001",
      username: "Nguyễn Thị Hải Yến",
      usergroup: "Phòng đào tạo",
      department: "Toán - Tin",
      email: "adb@gmail.com",
    },
    {
      key: "2",
      code: "PDT002",
      username: "Trần Văn An",
      usergroup: "Phòng hành chính",
      department: "Hóa học",
      email: "tva@gmail.com",
    },
    {
      key: "3",
      code: "PDT003",
      username: "Lê Minh Hoàng",
      usergroup: "Phòng đào tạo",
      department: "Vật lý",
      email: "lmh@gmail.com",
    },
    {
      key: "4",
      code: "PDT004",
      username: "Phạm Thị Hồng Nhung",
      usergroup: "Phòng kế toán",
      department: "Kế toán - Kiểm toán",
      email: "pthn@gmail.com",
    },
    {
      key: "5",
      code: "PDT005",
      username: "Nguyễn Văn Tâm",
      usergroup: "Phòng đào tạo",
      department: "Sinh học",
      email: "nvt@gmail.com",
    },
    {
      key: "6",
      code: "PDT006",
      username: "Đặng Thị Mai",
      usergroup: "Phòng hành chính",
      department: "Ngữ văn",
      email: "dtm@gmail.com",
    },
    {
      key: "7",
      code: "PDT007",
      username: "Vũ Thị Lan",
      usergroup: "Phòng kế hoạch",
      department: "Lịch sử",
      email: "vtl@gmail.com",
    },
    {
      key: "8",
      code: "PDT008",
      username: "Phan Quang Vinh",
      usergroup: "Phòng đào tạo",
      department: "Địa lý",
      email: "pqv@gmail.com",
    },
    {
      key: "9",
      code: "PDT009",
      username: "Bùi Thị Hạnh",
      usergroup: "Phòng nhân sự",
      department: "Tiếng Anh",
      email: "bth@gmail.com",
    },
    {
      key: "10",
      code: "PDT010",
      username: "Hoàng Văn Quang",
      usergroup: "Phòng kế toán",
      department: "Tin học",
      email: "hvq@gmail.com",
    },
  ];

  const dispatch = useDispatch();

  // State cho tìm kiếm và phân trang
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Xử lý tìm kiếm
  // Xử lý tìm kiếm
  const filteredData = data.filter((item) => {
    const searchValue = searchText.toLowerCase();
    return (
      item.username.toLowerCase().includes(searchValue) ||
      item.code.toLowerCase().includes(searchValue) ||
      item.usergroup.toLowerCase().includes(searchValue) ||
      item.email.toLowerCase().includes(searchValue)
    );
  });

  // Tính toán dữ liệu hiển thị cho trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(startIndex, startIndex + pageSize);

  // Cột của bảng
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Nhóm người dùng",
      dataIndex: "usergroup",
      key: "usergroup",
    },
    {
      title: "Khoa",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="manage-users">
      {/* Header */}
      <div className="header-home-page">Quản lý Người dùng</div>

      {/* Thanh công cụ tìm kiếm và thêm mới */}
      <div className="btn-add">
        <div className="search-username">
          <Input
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Tên người dùng"
            size={"large"}
          />
        </div>
        <div className="actions">
          <button className="filter">
            <FilterOutlined />
          </button>
          <button
            className="btn"
            onClick={() => dispatch(actionIsShowAddPermission())}
          >
            <AppstoreAddOutlined /> <span>Thêm mới</span>
          </button>
        </div>
      </div>

      {/* Bảng hiển thị dữ liệu */}
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
          locale={{ emptyText: "Không có dữ liệu" }}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
