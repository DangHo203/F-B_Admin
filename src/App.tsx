import React, { lazy, useEffect, startTransition, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { permissionPath } from "./constant/permission.constant";
import SocketSingleton from "./socket";
import { sendNotificationAction } from "./redux/api/notification";
import Swal from "sweetalert2";
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

const MapTest = lazy(() => import("./components/Map/Map"));

function App() {
    const { isLogin, role, permissions } = useSelector(
        (state: any) => state.userSlice
    );
    const pathname = window.location.pathname;
    const socket = SocketSingleton.getInstance();
    const dispatch: any = useDispatch();

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
            if (
                checkPermission &&
                !permissions.includes(checkPermission.permission)
            ) {
                toast.error("Permission denied");
                navigate("/");
            }
        });
    }, [isLogin, navigate]);

    useEffect(() => {
        socket.connect();
        socket.on("orderCancelNotification", (orderId: string) => {
            console.log("orderCancelNotification", orderId);

            dispatch(
                sendNotificationAction({
                    title: "Order has been cancelled" as string,
                    content: `Order ${orderId} has been cancelled` as string,
                    link: `/order/${orderId}` as string,
                    type: "failed" as string,
                })
            );
            Swal.fire({
                title: `Order #${orderId} has been cancelled`,
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
                },
                position: "top",
                timer: 2000,
            });
        });

        return () => {
            socket.off("orderCancelNotification");
        };
    }, []);

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
                                element={
                                    <MapTest
                                        start={[106.78, 10.79]}
                                        end={[106.9, 10.9]}
                                    />
                                }
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
