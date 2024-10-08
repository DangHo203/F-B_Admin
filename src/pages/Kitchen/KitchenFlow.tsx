//components
import SideBar from "../../components/commons/Sidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainPanel from "./components/MainPanel";

export default function Kitchen() {
    const navigate = useNavigate();
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);
    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
        sessionStorage.setItem("active", "1");
    }, []);
    return (
        <div className="w-screen h-screen grid grid-cols-6 grid-rows-12 bg-main-bg">
            {/* sidebar */}
            <SideBar />

            {/* content */}
            <div className="w-full h-full bg-main-bg col-span-5 row-span-12 p-[30px]">
                <MainPanel/>
            </div>
        </div>
    );
}
