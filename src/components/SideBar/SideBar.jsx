import { FaUser } from "react-icons/fa";
import { PiListBulletsFill } from "react-icons/pi";
import { MdOutlineBalance, MdOutlineCellWifi } from "react-icons/md";
import { BsFillPatchCheckFill, BsListColumns } from "react-icons/bs";
import { MdOutlineClass } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import { PiTreeView } from "react-icons/pi";
import { FiBook } from "react-icons/fi";
import { TbUserExclamation } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import { RiCalendar2Line } from "react-icons/ri";
import { useLocation } from "react-router-dom";

import "./SideBar.scss";
import logo from "../../assets/logo.jfif";

import { useNavigate } from "react-router";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại
  console.log(location);

  return (
    <div className="container-sidebar">
      <div className="logo-page">
        <img src={logo} />
      </div>
      {/* <hr /> */}

      <div className="info-user">
        <div className="icon-user">
          <FaUser />
        </div>
        <div className="info">
          <h3 className="name">Nguyễn Minh Hiếu</h3>
          <p className="msv">A41239</p>
          <p className="role">Admin</p>
        </div>
      </div>
      <hr />

      <div className="manager-training-program">
        <div className="title">TRANG CÁ NHÂN</div>
        <div className="manager">
          <div className="manager-children">
            <FaUser className="icon" />
            <p>Thông tin cá nhân</p>
          </div>
        </div>
      </div>

      <div className="manager-training-program">
        <div
          className={`manager-children ${
            location.pathname === "/personal-info" ? "active" : ""
          }`}
        >
          TRA CỨU THÔNG TIN
        </div>
        <div className="manager">
          <div
            className={`manager-children ${
              location.pathname === "/training-program" ? "active" : ""
            }`}
            onClick={() => navigate("/training-program")}
          >
            <PiListBulletsFill className="icon" />
            <p>Trương trình đào tạo</p>
          </div>
          <div
            className={`manager-children ${
              location.pathname === "/course-info" ? "active" : ""
            }`}
            onClick={() => navigate("/course-info")}
          >
            <MdOutlineBalance className="icon" />
            <p>Học phần tương ứng</p>
          </div>
          <div
            className={`manager-children ${
              location.pathname === "/request-approval" ? "active" : ""
            }`}
            onClick={() => navigate("/request-approval")}
          >
            <BsFillPatchCheckFill className="icon" />
            <p>Yêu cầu duyệt</p>
          </div>
        </div>
      </div>

      <div className="administration">
        <div className="title">Quản trị</div>
        <div className="manager">
          <div
            onClick={() => navigate("/manage-specialize")}
            className="manager-children"
          >
            <MdOutlineClass />
            <p>Quản lý Lớp chuyên ngành</p>
          </div>
          <div
            onClick={() => navigate("/manage-key")}
            className="manager-children"
          >
            <RiCalendar2Line />
            <p>Quản lý Khoa</p>
          </div>
          <div
            onClick={() => navigate("/manage-group-users")}
            className="manager-children"
          >
            <TiGroupOutline />
            <p>Quản lý Nhóm người dùng</p>
          </div>
          <div
            onClick={() => navigate("/manage-subject")}
            className="manager-children"
          >
            <PiTreeView />
            <p>Quản lý Bộ môn</p>
          </div>
          <div
            onClick={() => navigate("/manage-industry")}
            className="manager-children"
          >
            <FiBook />
            <p>Quản lý Ngành học</p>
          </div>
          <div
            onClick={() => navigate("/manage-users")}
            className="manager-children"
          >
            <TbUserExclamation />
            <p>Quản lý Người dùng</p>
          </div>
          <div onClick={() => navigate()} className="manager-children">
            <BsListColumns />
            <p>Quản lý Học phần</p>
          </div>
          <div
            onClick={() => navigate("/manage-permission")}
            className="manager-children"
          >
            <MdOutlineCellWifi />
            <p>Quản lý Phân quyền</p>
          </div>
          <div onClick={() => navigate()} className="manager-children">
            <IoCalendarOutline />
            <p>Quản lý Thời gian</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
