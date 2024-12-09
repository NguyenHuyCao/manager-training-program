import "./ManageUsers.scss";
import {
  AppstoreAddOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Table, Select, Button, Popover, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionAddUser } from "../../store";
import { useSelector } from "react-redux";

const ManageUsers = () => {
  // Dữ liệu mẫu
  const data = [
    {
      key: "1",
      code: "PDT001",
      username: "Nguyễn Thị Hải Yến",
      usergroup: "Phòng đào tạo",
      department: "Toán - Tin",
      email: "yennht@edu.vn",
    },
    {
      key: "2",
      code: "PDT002",
      username: "Trần Văn Nam",
      usergroup: "Phòng hành chính",
      department: "Hóa học",
      email: "namtv@edu.vn",
    },
    // Add other rows as needed...
  ];

  const dispatch = useDispatch();
  const isSuccessData = useSelector((state) => state.addUser.isSuccessData);

  // State cho tìm kiếm và phân trang
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [isDot, setIsDot] = useState(false);
  const pageSize = 5;

  // Các bộ lọc
  const [userGroupFilter, setUserGroupFilter] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState(null);

  // Xử lý tìm kiếm
  const filteredData = data
    .filter((item) => {
      const searchValue = searchText.toLowerCase();
      return (
        item.username.toLowerCase().includes(searchValue) ||
        item.code.toLowerCase().includes(searchValue) ||
        item.usergroup.toLowerCase().includes(searchValue) ||
        item.email.toLowerCase().includes(searchValue)
      );
    })
    .filter((item) => {
      return (
        (userGroupFilter ? item.usergroup === userGroupFilter : true) &&
        (departmentFilter ? item.department === departmentFilter : true)
      );
    });

  // Tính toán dữ liệu hiển thị cho trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(startIndex, startIndex + pageSize);

  // Cột của bảng
  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "Mã", dataIndex: "code", key: "code" },
    { title: "Tên người dùng", dataIndex: "username", key: "username" },
    { title: "Nhóm người dùng", dataIndex: "usergroup", key: "usergroup" },
    { title: "Khoa", dataIndex: "department", key: "department" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = () => {
    setIsFilter(!isFilter);
    setIsDot(true);
  };

  // Hàm xử lý khi nhấn nút hủy
  const handleReset = () => {
    setUserGroupFilter(null);
    setDepartmentFilter(null);
    setIsFilter(false);
    setIsDot(false);
  };

  // Popover content cho bộ lọc
  const filterContent = (
    <div className="filter-dropdown">
      <div className="filter-title">Bộ lọc</div>
      <div className="filter-item">
        <div>Nhóm người dùng:</div>
        <Select
          style={{ width: 200 }}
          value={userGroupFilter}
          onChange={setUserGroupFilter}
        >
          <Select.Option value="Phòng đào tạo">Phòng đào tạo</Select.Option>
          <Select.Option value="Phòng hành chính">
            Phòng hành chính
          </Select.Option>
          <Select.Option value="Phòng kế toán">Phòng kế toán</Select.Option>
          <Select.Option value="Phòng nhân sự">Phòng nhân sự</Select.Option>
        </Select>
      </div>
      <div className="filter-item">
        <div>Khoa:</div>
        <Select
          style={{ width: 200 }}
          value={departmentFilter}
          onChange={setDepartmentFilter}
        >
          <Select.Option value="Toán - Tin">Toán - Tin</Select.Option>
          <Select.Option value="Hóa học">Hóa học</Select.Option>
          <Select.Option value="Vật lý">Vật lý</Select.Option>
          <Select.Option value="Sinh học">Sinh học</Select.Option>
        </Select>
      </div>
      <div className="filter-actions">
        <Button onClick={handleReset}>Hủy</Button>
        <Button className="btn-filter" onClick={handleFilter}>
          Lọc
        </Button>
      </div>
    </div>
  );

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    if (isSuccessData) {
      api.success({
        message: "Thành công",
        description: "Thêm mới Người dùng thành công",
        placement: "topLeft",
      });
    }
  };
  useEffect(() => {
    openNotification();
  }, [isSuccessData]);

  const handleAddUser = () => {
    dispatch(actionAddUser.isShowModal());
    if (isSuccessData) dispatch(actionAddUser.isSuccessData());
  };

  return (
    <div className="manage-users">
      {contextHolder}

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
          <Popover
            content={filterContent}
            trigger="click"
            open={isFilter}
            placement="bottomRight"
          >
            <button
              className={`filter-button ${
                userGroupFilter || departmentFilter ? "active" : ""
              }`}
              onClick={() => setIsFilter(!isFilter)}
            >
              <FilterOutlined />
              {isDot && <div className="dot-red"></div>}
            </button>
          </Popover>
          <button className="btn" onClick={handleAddUser}>
            <AppstoreAddOutlined /> <span>Thêm mới</span>
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
          locale={{ emptyText: "Không có dữ liệu" }}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
