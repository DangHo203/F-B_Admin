import { link } from "fs";
import path from "../../utils/path";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
const navItems = [
    {
        id: 1,
        name: "Dashboard",
        link: path.home,
    },

    {
        id: 2,
        name: "Staff",
        link: path.staff,
    },
    {
        id: 3,
        name: "Customer",
        link: path.customer,
    },
    {
        id: 4,
        name: "Menu",
        link: path.menu,
    },
    {
        id: 5,
        name: "Ingredient",
        link: path.ingredient,
    },
    {
        id: 6,
        name: "Profile",
        link: path.profile,
    },
];

export default function SideBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [active, setActive] = useState<number>(() => {
        const saved = sessionStorage.getItem("active");
        return saved ? parseInt(saved, 10) : 1;
    });

    useEffect(() => {
        sessionStorage.setItem("active", active.toString());
        const id = parseInt(sessionStorage.getItem("active") || "1", 10);
        navigate(navItems[id - 1]?.link);
    }, [active]);

    const handleSetActive = (id: number) => {
        setActive(id);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        dispatch(logout());
        navigate(path.login);
    };
    return (
        <div className="w-full h-full bg-slate-100 col-span-1 row-span-12 flex flex-col justify-start items-start ">
            <div className="w-full h-[20%] p-5 flex justify-center items-center">
                <img
                    className="w-[125px] h-[100px]"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bf21ebf32d3638e22d34e08f9fc57515850acf1bdd8864f7413f0799d865e8a?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109"
                    alt=""
                />
            </div>

            <div className="w-full h-[70%] flex justify-start items-start gap-2 flex-col p-5">
                {navItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleSetActive(item.id)}
                        className={` cursor-pointer w-full p-1 rounded-[20px] flex justify-center hover:bg-blue-300 ${
                            active === item.id ? "text-white bg-blue-500" : ""
                        }`}
                    >
                        {item.name}
                    </div>
                ))}
            </div>

            <div className="w-full h-[10%] flex justify-center items-center">
                <div className="flex flex-row justify-around gap-5   text-[18px] text-black">
                    <span className="">Welcome Dunk</span>
                    <IoIosLogOut
                        onClick={handleLogout}
                        className="text-[30px]"
                    />
                </div>
            </div>
        </div>
    );
}
