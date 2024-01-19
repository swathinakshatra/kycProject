import React, { Component } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "@aws-amplify/ui-react/styles.css";
import Modals from "./Components/modals/modals";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import LoginForm from "./AdminComponents/authentication/LoginForm";
import ResetPassword from "./AdminComponents/authentication/ResetPassword";
import AppLayout from "./AdminComponents/layouts/applayout";
import AddUser from "./AdminComponents/Users/addUser";
import UsersList from "./AdminComponents/Users/UserList";
import Dashboard from "./AdminComponents/DashBoard/dashboard";
import ChangePassword from "./AdminComponents/authentication/ChangePassword";
import ForgotPassword from "./AdminComponents/authentication/ForgotPassword";
import AllKycHistory from "./AdminComponents/KYCHistory/allKycHistory";
import QRCode from "./AdminComponents/authentication/QrCode";
import Profile from "./AdminComponents/DashBoard/profile";
import AdminControls from "./AdminComponents/Admin/AdminControls";
import GenerateAPI from "./AdminComponents/Users/GenerateAppId";
import AllCreditsHistory from "./AdminComponents/CreditsHistory/allCreditsHistory";
import KycDetails from "./AdminComponents/KYCHistory/KycDetails";
import NavBar from "./Homepage/navBar";

const protect = (component) => <ProtectedRoute>{component}</ProtectedRoute>;

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <ToastContainer />

        <Router>
          <Routes>
            {/* <Route exact path="/" element={<Modals />} /> */}
            <Route path="/" element={protect(<AppLayout />)}>
              <Route index element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route exact path="/addUser" element={<AddUser />} />
              <Route exact path="/userslist" element={<UsersList />} />
              <Route exact path="/allkychistory" element={<AllKycHistory />} />
              <Route
                exact
                path="/allcreditshistory"
                element={<AllCreditsHistory />}
              />

              <Route exact path="/qrcode" element={<QRCode />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/admincontrols" element={<AdminControls />} />
              <Route exact path="/generateAppId" element={<GenerateAPI />} />
              <Route exact path="/kycdetails" element={<KycDetails />} />

              <Route
                exact
                path="/changepassword"
                element={<ChangePassword />}
              />
            </Route>
            <Route exact path="/loginForm" element={<LoginForm />} />
            <Route exact path="/forgotpassword" element={<ForgotPassword />} />
            <Route exact path="/resetpassword" element={<ResetPassword />} />
            <Route exact path="/modals" element={<Modals />} />

            {/* <Route exact path="/" element={<HomePage />} /> */}

            <Route exact path="/navbar" element={<NavBar />} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
