//components
import SideBar from "../../components/commons/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormAdd from "./components/FormAdd";
import FormEdit from "./components/FormEdit";

import PagingBar from "../../components/commons/PagingBar";
//api
import { getSumIngredientAPI } from "./ingredientServices";
import ListIngredients from "./components/ListIngredients";
import Filter from "../../components/customer/filter";
import FilterBar from "./components/FilterBar";

export default function Staff() {
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isRender, setIsRender] = useState(false);

    const navigate = useNavigate();
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);

    const [params] = useSearchParams();

    const [totalPage, setTotalPage] = useState(0);
    const limit = 10;

    const fetchData = async () => {
        const data = {
            is_available: params.get("status"),
            search: params.get("title"),
        };
        const rs = await getSumIngredientAPI(data);
        setTotalPage(Math.ceil(rs?.data?.result[0].Sum / limit));
    };

    useEffect(() => {
        fetchData();

    }, [params, isAdd, isEdit, isRender]);

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
            <div className="w-full h-full bg-slate-300 col-span-5 row-span-12   ">
                {isAdd && <FormAdd isOpen={setIsAdd} setIsRender={setIsRender} isRender={isRender}/>}
                {isEdit && <FormEdit isOpen={setIsEdit} />}
                <FilterBar setIsAdd={setIsAdd} />
                <ListIngredients setIsEdit={setIsEdit} isRender={isRender}/>
                <PagingBar totalPage={totalPage} />
            </div>
        </div>
    );
}