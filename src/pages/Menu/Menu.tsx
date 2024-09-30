//components
import SideBar from "../../components/commons/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterBar from "./Components/FilterBar";
import ListItems from "./Components/ListItems";

import {getSumFoodAPI} from "./menuServices";
import PagingBar from "../../components/commons/PagingBar";
import FormAdd from "./Components/FormAdd";
import FormEdit from "./Components/FormEdit";

const Menu = () => {
    const navigate = useNavigate();
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);
    const [params] = useSearchParams();
    const [page, setPage] = useState(1);
    const limit = 5;

    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    //api paging
    const getSumFood = async () => {
        const data = {
            status: params.get("status"),
            title: params.get("title"),
        };
        const res = await getSumFoodAPI(data);
        console.log(res);
        setPage(Math.ceil(res.data.data[0].Sum / limit));
    };

    useEffect(() => {
        getSumFood();
    }, [params]);

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
        sessionStorage.setItem("active", "1");
    }, []);
    
    return (
        <div className="w-screen h-screen grid grid-cols-6 grid-rows-12 bg-slate-300">
            {/* sidebar */}
            <SideBar />

            {/* content */}
            <div className="w-full h-full bg-slate-300 col-span-5 row-span-12">
                {
                    isAdd && <FormAdd setIsAdd={setIsAdd}/>
                }
                {
                    isEdit && <FormEdit setIsEdit={setIsEdit}/>
                }
                <FilterBar setIsAdd={setIsAdd} />
                <ListItems setIsEdit={setIsAdd} />
                <PagingBar totalPage={page} />
            </div>
        </div>
    );
}

export default Menu;
