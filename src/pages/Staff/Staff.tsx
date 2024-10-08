//components
import SideBar from "../../components/commons/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterBar from "./components/FilterBar";
import ListStaff from "./components/ListStaff";
import PagingBar from "../../components/commons/PagingBar";
import { getSumStaffAPI } from "./staff.service";

export default function Staff() {
    const navigate = useNavigate();
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);

    const [params] = useSearchParams();
    const pageNumber = 1;
    const [totalPage, setTotalPage] = useState(1);
    const limit = 5;

    //api paging
    const getSumStaff = async () => {
        const data = {
            page: params.get("page") || pageNumber,
            status: params.get("status"),
            role: params.get("role"),
            search: params.get("search"),
            limit: 5,
        };
        const res = await getSumStaffAPI(data);

        if (res?.status !== 200) {
            return;
        }
        setTotalPage(Math.ceil(res?.data?.length[0]?.Sum / limit));
    };
    useEffect(() => {
        getSumStaff();   
    }, [params]);

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
            <div className="w-full h-full bg-main-bg col-span-5 row-span-12   ">
                <FilterBar />
                <ListStaff />
                <PagingBar totalPage={totalPage}/>
            </div>
        </div>
    );
}
