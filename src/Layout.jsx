import App from "./App.jsx";
import LoginPage from "./components/Login/Login.jsx";
import HomePage from "./components/Home/Home.jsx";
import ChangePassword from "./components/ChangePassword/ChangePassword.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import { Routes, Route } from "react-router";
import ManagePermission from "./components/ManagePermission/ManagePermission.jsx";
import ManageUnit from "./components/ManagePermission/ManageUnit.jsx";
import ManageUsers from "./components/ManagePermission/ManageUsers.jsx";

const Layout = () => {
  return (
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/home" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="manage-permission" element={<ManagePermission />} />
        <Route path="manage-unit" element={<ManageUnit />} />
        <Route path="manage-users" element={<ManageUsers />} />
      </Route>
    </Routes>
  );
};

export default Layout;
