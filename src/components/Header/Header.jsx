import { UserOutlined } from "@ant-design/icons";
import { FaChevronCircleRight } from "react-icons/fa";
import "./Header.scss";
// import { Link } from "react-router";
// import { useDispatch } from "react-redux";
// import { actionLogout } from "../../store";

const Header = ({ title }) => {
  // const dispatch = useDispatch();

  return (
    <>
      <div className="header">
        <div className="title-function">
          Hệ thống Quản lý Chương trình đào tạo
        </div>
        {/* <div className="info-user"> */}
        <div className="icon-user">
          <UserOutlined />
        </div>
        {/* <div className="user-header">
            <div className="hello">Xin chào</div>
            <div className="name-user">PDT005- Trần Thu Thuý</div>
            <div className="function-user">
              <button className="change-password">
                <Link to={"/home/change-password"}>Đổi mật khẩu</Link>
              </button>
              <button
                className="logout-page"
                onClick={() => dispatch(actionLogout.logout())}
              >
                Đăng xuất
              </button>
            // </div>
            </div> */}
        {/* </div> */}
      </div>
      <div className="subtitle">
        <FaChevronCircleRight className="icon-subtitle" />
        <p className="title">{title}</p>
      </div>
    </>
  );
};

export default Header;
