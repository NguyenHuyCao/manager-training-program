import "./ManageUnit.scss";
import { AppstoreAddOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useState } from "react";
import { actionAddUnit } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const ManageUnit = () => {
  const data = [
    {
      key: "1",
      code: "PDT",
      permission: "Phòng đào tạo",
    },
    {
      key: "2",
      code: "TK",
      permission: "Khoa",
    },
    {
      key: "3",
      code: "TK",
      permission: "Khoa",
    },
    {
      key: "4",
      code: "TK",
      permission: "Khoa",
    },
    {
      key: "5",
      code: "TK",
      permission: "Khoa",
    },
    {
      key: "6",
      code: "TK",
      permission: "Khoa",
    },
    {
      key: "7",
      code: "TK",
      permission: "Khoa",
    },
  ];
  const isSuccessData = useSelector((state) => state.addUnit.isSuccessData);
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
      title: "Mã nhóm",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Nhóm người dùng",
      dataIndex: "permission",
      key: "permission",
    },
  ];

  return (
    <div>
      <div className="header-home-page">Quản lý Đơn vị</div>
      <div className="btn-add">
        {isSuccessData && (
          <div className="add-success">
            <CheckCircleOutlined /> Thêm mới Nhóm quyền thành công!
          </div>
        )}
        <button
          className="btn"
          onClick={() => dispatch(actionAddUnit.isShowModal())}
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

export default ManageUnit;
