import React, { lazy, useEffect, startTransition, Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ShiftScheduler from "./pages/test/shift";
import ShiftSchedulerCalendar from "./pages/test/calendar";
import { permissionPath } from "./constant/permission.constant";
const DashBoard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Staff = lazy(() => import("./pages/Staff/Staff"));
const Customer = lazy(() => import("./pages/Customer/Customer"));
const Menu = lazy(() => import("./pages/Menu/Menu"));
const Ingredient = lazy(() => import("./pages/Ingredient/Ingredients"));
const Order = lazy(() => import("./pages/Order/Order"));
const Kitchen = lazy(() => import("./pages/Kitchen/KitchenFlow"));
const HistoryOrder = lazy(() => import("./pages/HistoryOrder/History"));
const Notification = lazy(() => import("./pages/Notification/Notification"));
const Shipper = lazy(() => import("./pages/Shipper/Shipper"));
const Schedule = lazy(() => import("./pages/ShiftSchedule/Schedule"));

// const MapTest = lazy(() => import("./pages/test/Map/Map"));

function App() {
    const { isLogin, role, permissions } = useSelector(
        (state: any) => state.userSlice
    );
    const pathname = window.location.pathname;

    const navigate = useNavigate();
    useEffect(() => {
        startTransition(() => {
            if (!isLogin && window.location.pathname !== "/register") {
                navigate("/login");
            }
            if (role == "shipper" && window.location.pathname !== "/shipper") {
                navigate("/shipper");
            }

            //check permission
            const checkPermission = permissionPath.find(
                (item) => item.path === pathname
            );
            console.log(checkPermission);
            if (
                checkPermission &&
                !permissions.includes(checkPermission.permission)
            ) {
                toast.error("Permission denied");
                navigate("/");
            }
        });
    }, [isLogin, navigate]);

    return (
        <div className="App">
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {isLogin && (
                        <>
                            <Route
                                path="/test"
                                // element={<MapTest />}
                            />
                            <Route path="/shipper" element={<Shipper />} />
                            <Route path="/" element={<DashBoard />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/staff" element={<Staff />} />
                            <Route path="/customer" element={<Customer />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route
                                path="/ingredient"
                                element={<Ingredient />}
                            />
                            <Route
                                path="/history_order"
                                element={<HistoryOrder />}
                            />
                            <Route path="/order" element={<Order />} />
                            <Route path="/kitchen" element={<Kitchen />} />
                            <Route
                                path="/notification"
                                element={<Notification />}
                            />
                            <Route path="/schedule" element={<Schedule />} />
                        </>
                    )}
                </Routes>
            </Suspense>
            <ToastContainer />
        </div>
    );
}

export default App;
