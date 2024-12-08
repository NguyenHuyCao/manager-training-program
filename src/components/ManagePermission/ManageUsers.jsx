import "./ManageUsers.scss";
import { AppstoreAddOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useState } from "react";
import { actionIsShowAddPermission } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const ManageUsers = () => {
  const data = [
    {
      key: "1",
      code: "PDT",
      permission: "Phòng đào tạo",
      description: "Các chức năng hỗ trợ phòng đào tạo quản lý.",
    },
    {
      key: "2",
      code: "TK",
      permission: "Khoa",
      description: "Các chức năng của các trường khoa.",
    },
    {
      key: "3",
      code: "TK",
      permission: "Khoa",
      description: "Các chức năng của các trường khoa.",
    },
    {
      key: "4",
      code: "TK",
      permission: "Khoa",
      description: "Các chức năng của các trường khoa.",
    },
    {
      key: "5",
      code: "TK",
      permission: "Khoa",
      description: "Các chức năng của các trường khoa.",
    },
    {
      key: "6",
      code: "TK",
      permission: "Khoa",
      description: "Các chức năng của các trường khoa.",
    },
    {
      key: "7",
      code: "TK",
      permission: "Khoa",
      description: "Các chức năng của các trường khoa.",
    },
  ];
  const isSuccessData = useSelector(
    (state) => state.addPermission.isSuccessData
  );
  const dispatch = useDispatch();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the data for the current page
  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = data.slice(startIndex, startIndex + pageSize);

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Mã nhóm quyền",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Nhóm quyền",
      dataIndex: "permission",
      key: "permission",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div>
      <div className="header-home-page">Quản lý Người dùng</div>
      <div className="btn-add">
        {isSuccessData && (
          <div className="add-success">
            <CheckCircleOutlined /> Thêm mới Nhóm quyền thành công!
          </div>
        )}
        <button
          className="btn"
          onClick={() => dispatch(actionIsShowAddPermission.isShowModal())}
        >
          <AppstoreAddOutlined /> <span>Thêm mới</span>
        </button>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={currentPageData} // Only display data for the current page
          pagination={{
            position: ["bottomCenter"],
            pageSize: pageSize,
            current: currentPage, // Set current page
            onChange: handlePageChange, // Handle page change
            total: data.length, // Total number of records
          }}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
