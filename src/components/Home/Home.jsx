import Header from "../Header/Header";
import "./Home.scss";

const HomePage = () => {
  return (
    <div>
      {/* <Header /> */}
      <div className="header-home-page">Trang chủ</div>
      <div className="container-home-page">
        <div>Năm học: 2022 - 2023</div>
        <div>Kì học: 1</div>
      </div>
    </div>
  );
};

export default HomePage;
