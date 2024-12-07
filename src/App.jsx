import "./App.scss";

import { Layout } from "antd";
import HeaderPage from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import { Outlet } from "react-router";

const { Sider, Content } = Layout;

const siderStyle = {
  backgroundColor: "#fff",
};

function App() {
  return (
    <>
      <Layout>
        <HeaderPage />

        <Layout>
          <Sider width="25%" style={siderStyle}>
            <SideBar />
          </Sider>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
