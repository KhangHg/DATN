import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { userRoutes, adminRoutes } from "../src/routes"
import DefaultLayoutAdmin from './layouts/AdminLayout/DefaultLayout/DefaultLayout'
import DefaultLayoutUser from './layouts/UserLayout/DefaultLayOutUser';
import { AuthContext } from './contexts/AuthContex'

function App() {
    const { token, user } = useContext(AuthContext);

    return (
        <div className="App">
            <Routes>
                {userRoutes.map((route, index) => {
                    console.log(route);
                    const Page = route.component;
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
                                <Layout
                                >
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}

                {/* privateRoutes */}
                {/* {user && user.role === "ADMIN" ? // Kiểm tra có phải là admin hay không */}
                {/* Cứ làm các trang của admin đi, khi nào xong hết thì thêm xác thực user sau */}
                {
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
                                    </Layout>
                                }
                            />
                        );
                    })
                    // :''}
                    }

                {/* Điều hướng mặc định */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App
