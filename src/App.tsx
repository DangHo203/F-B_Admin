import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import path from "./ultils/path";
import { DashBoard, Login, Register, Profile, Staff } from "./pages";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function App() {
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);
    const navigate = useNavigate();

    useEffect(() => {      
        if (!isLogin && window.location.pathname !== "/register" ) {
            navigate("/login");
        }
    }, [isLogin, navigate]);

    return (
        <div className="App">
            <Routes>
                <Route path={path.login} element={<Login />} />
                <Route path={path.register} element={<Register />} />
                {isLogin && (
                    <>
                        <Route path={path.home} element={<DashBoard />} />
                        <Route path={path.profile} element={<Profile />} />
                        <Route path={path.staff} element={<Profile />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

export default App;
