import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { userRoutes, adminRoutes } from "../src/routes";
import DefaultLayoutAdmin from "./layouts/AdminLayout/DefaultLayout/DefaultLayout";
import DefaultLayoutUser from "./layouts/UserLayout/DefaultLayOutUser";
import { AuthContext } from "./contexts/AuthContex";
import { ToastContainer } from "react-toastify";

function App() {
  const { token, user } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const tokenLocal = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return (
    <div className="App">
      <Routes>
        {userRoutes.map((route, index) => {
          const Page = route.component;
          //Không có layout thì mặc định là default layout
          let Layout = DefaultLayoutUser;
          // let Layout = null;
          if (route.layout !== null) {
            Layout = route.layout;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                  <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
                </Layout>
              }
            />
          );
        })}

        {/* privateRoutes */}
        {/* {user && user.role === "ADMIN" ? // Kiểm tra có phải là admin hay không */}
        {/* Cứ làm các trang của admin đi, khi nào xong hết thì thêm xác thực user sau */}
        {/* {
          adminRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayoutAdmin;
            if (route.layout) {
              Layout = route.layout;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout title={route.title}>
                    <Page />
                    <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
                  </Layout>
                }
              />
            );
          })
          // :''}
        } */}
        {adminRoutes.map((route, index) => {
          // Check if there is a token and the role is "admin"
          if (!tokenLocal || !role || role !== "admin") {
            // Redirect to login if the conditions are not met
            navigateTo("/login");
            return null;
          }

          const Page = route.component;
          let Layout = DefaultLayoutAdmin;
          if (route.layout) {
            Layout = route.layout;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout title={route.title}>
                  <Page />
                  <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
                </Layout>
              }
            />
          );
        })}

        {/* Điều hướng mặc định */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
