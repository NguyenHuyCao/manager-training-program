import App from "./App.jsx";
import LoginPage from "./components/Login/Login.jsx";
import HomePage from "./components/Home/Home.jsx";
import ChangePassword from "./components/ChangePassword/ChangePassword.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import { Routes, Route } from "react-router";
import ManagePermission from "./components/ManagePermission/ManagePermission.jsx";
import ManageUsers from "./components/ManagePermission/ManageUsers.jsx";
import RequestApproval from "./components/RequestApproval/RequestApproval.jsx";
import ManageSpecialized from "./components/ManagePermission/ManageSpecialized.jsx";
import ManageKey from "./components/ManagePermission/ManageKey.jsx";
import ManageGroupUsers from "./components/ManagePermission/ManageGroupUsers.jsx";
import ManageSubject from "./components/ManagePermission/ManageSubject.jsx";
import ManageIndustry from "./components/ManagePermission/ManageIndustry.jsx";

const Layout = () => {
  return (
    <Routes>
      <Route path="/login" index element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="request-approval" element={<RequestApproval />} />
        <Route path="manage-specialize" element={<ManageSpecialized />} />
        <Route path="manage-key" element={<ManageKey />} />
        <Route path="manage-group-users" element={<ManageGroupUsers />} />
        <Route path="manage-subject" element={<ManageSubject />} />
        <Route path="manage-industry" element={<ManageIndustry />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="manage-permission" element={<ManagePermission />} />
        <Route path="manage-users" element={<ManageUsers />} />
      </Route>
    </Routes>
  );
};

export default Layout;
