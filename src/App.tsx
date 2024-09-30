import React, { lazy, useEffect, startTransition, Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const DashBoard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Staff = lazy(() => import("./pages/Staff/Staff"));
const Customer = lazy(() => import("./pages/Customer/Customer"));
const Menu = lazy(() => import("./pages/Menu/Menu"));
const Ingredient = lazy(() => import("./pages/Ingredient/Ingredients"));

function App() {
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);
    const navigate = useNavigate();

    useEffect(() => {
        startTransition(() => {
            if (!isLogin && window.location.pathname !== "/register") {
                navigate("/login");
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
                            <Route path="/" element={<DashBoard />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/staff" element={<Staff />} />
                            <Route path="/customer" element={<Customer />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/ingredient" element={<Ingredient />} />
                        </>
                    )}
                </Routes>
            </Suspense>
            <ToastContainer />
        </div>
    );
}

export default App;
