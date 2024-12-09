import "./ManagePermission.scss";
import { AppstoreAddOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useState } from "react";
import { actionIsShowAddPermission } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const ManagePermission = () => {
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
      code: "GV",
      permission: "Giảng viên",
      description:
        "Chức năng dành cho giảng viên quản lý lớp học và sinh viên.",
    },
    {
      key: "4",
      code: "SV",
      permission: "Sinh viên",
      description:
        "Quyền truy cập tài nguyên học tập và quản lý cá nhân của sinh viên.",
    },
    {
      key: "5",
      code: "QLKH",
      permission: "Quản lý khoa học",
      description: "Chức năng hỗ trợ quản lý nghiên cứu khoa học và dự án.",
    },
    {
      key: "6",
      code: "TT",
      permission: "Thư viện",
      description: "Quyền quản lý tài liệu và hệ thống thư viện.",
    },
    {
      key: "7",
      code: "HTQT",
      permission: "Hợp tác quốc tế",
      description: "Hỗ trợ các hoạt động hợp tác với đối tác quốc tế.",
    },
    {
      key: "8",
      code: "KT",
      permission: "Kế toán",
      description: "Chức năng hỗ trợ quản lý tài chính và kế toán.",
    },
    {
      key: "9",
      code: "HCQT",
      permission: "Hành chính quản trị",
      description: "Quản lý các công việc hành chính và cơ sở vật chất.",
    },
    {
      key: "10",
      code: "ND",
      permission: "Người dùng thường",
      description: "Quyền truy cập cơ bản cho người dùng thông thường.",
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
      className: "stt-column",
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
      <div className="header-home-page">Quản lý nhóm quyền</div>
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

export default ManagePermission;
