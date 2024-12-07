import { UserOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.jfif";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-header">
        <img src={logo} alt="logo" />
      </div>
      <div className="title-function">
        Phần mềm Quản lý Chương trình Đào tạo
      </div>
      <div className="info-user">
        <div className="icon-user">
          <UserOutlined />
        </div>
        <div className="user-header">
          <div className="hello">Xin chào</div>
          <div className="name-user">PDT005- Trần Thu Thuý</div>
          <div className="function-user">
            <button className="change-password">Đổi mật khẩu</button>
            <button className="logout-page">Đăng xuất</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
