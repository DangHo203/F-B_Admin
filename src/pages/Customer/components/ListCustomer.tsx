import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
    getCustomerByParamsAPI,
    changeStatusCustomerAPI,
} from "../customerServices";
import DisplayInformation from "./DisplayInformation";
import { FaEye } from "react-icons/fa";
import { FaBan } from "react-icons/fa6";
import { logout } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const title = [
    {
        title: "ID",
        colSpan: "col-span-1",
        justify: "justify-center",
    },
    {
        title: "Name",
        colSpan: "col-span-2",
        justify: "justify-start",
    },
    {
        title: "Phone",
        colSpan: "col-span-2",
        justify: "justify-start",
    },
    {
        title: "Status",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "Action",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
];

interface StatusButtonProps {
    color: string;
    text: string;
}
const StatusButton: React.FC<StatusButtonProps> = ({ color, text }) => {
    console.log(color);
    return (
        <div
            className={`flex justify-center items-center bg-${color}-500 rounded-[20px] p-2`}
        >
            <span className={`text-sm text-white`}>{text}</span>
        </div>
    );
};

export default function ListStaff() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [params] = useSearchParams();

    const [isOpenFormInformation, setIsOpenFormInformation] = useState(false);

    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

    const handleOpenForm = (userId: number) => {
        setIsOpenFormInformation(!isOpenFormInformation);
        setSelectedCustomer(userId);
    };
    const handleBanCustomer = async (userId: number, status: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to do this action?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await changeStatusCustomerAPI({
                    _id: userId,
                    status: status,
                });
                if (rs?.status === 200) {
                    toast.success("Change status successfully");
                    fetchData();
                } else {
                    toast.error("Change status failed");
                }
            }
        });
    };

    const fetchData = async () => {
        const rs = await getCustomerByParamsAPI({
            page: params.get("page") || 1,
            status: params.get("status"),
            search: params.get("search"),
        });
        setList(rs.data.data);
    };
    useEffect(() => {
        fetchData();
    }, [params]);
    useEffect(() => {
        if (list.length === 0) {
            params.delete("page");
            params.append("page", "1");
            navigate(`?${params.toString()}`);
        }
    }, [list]);

    return (
        <div className="w-full h-[80%] flex flex-col justify-center items-center px-[100px]">
            <div className="grid grid-cols-7 grid-rows-1 w-full px-[30px]">
                {title.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`flex ${item.justify} items-center ${item.colSpan}`}
                        >
                            <p className="text-lg font-semibold">
                                {item.title}
                            </p>
                        </div>
                    );
                })}
            </div>
            {list?.length === 0 ? (
                <div className="w-full h-full grid-rows-5 bg-white rounded-[30px] flex items-center justify-center p-5">
                    <span className="text-red-600 text-[25px] font-medium">
                        No item find
                    </span>
                </div>
            ) : (
                <div className="w-full h-full grid grid-cols-1 grid-rows-5 bg-white rounded-[30px] items-center justify-center p-[30px]">
                    {list?.map(
                        (item: {
                            user_id: number;
                            image: string;
                            fullName: string;
                            email: string;
                            phone: string;
                            status: string;
                        }) => {
                            return (
                                <>
                                    <div
                                        key={item.user_id}
                                        className=" grid grid-cols-7 grid-rows-1 w-full"
                                    >
                                        <div className="flex justify-center items-center col-span-1">
                                            <p className="text-lg font-semibold">
                                                {item.user_id}
                                            </p>
                                        </div>
                                        <div className="flex justify-start items-start col-span-2">
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div className="ml-2">
                                                <p className="text-lg font-semibold">
                                                    {item.fullName}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {item.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex justify-start items-center col-span-2">
                                            <p className="text-sm text-gray-500">
                                                {item.phone}
                                            </p>
                                        </div>

                                        <div className="flex justify-start items-center col-span-1">
                                            {item.status === "active" && (
                                                <div
                                                    className={`flex justify-center items-center bg-green-400 rounded-[20px] p-2`}
                                                >
                                                    <span
                                                        className={`text-sm text-white`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </div>
                                            )}
                                            {item.status === "pending" && (
                                                <div
                                                    className={`flex justify-center items-center bg-yellow-400 rounded-[20px] p-2`}
                                                >
                                                    <span
                                                        className={`text-sm text-white`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </div>
                                            )}
                                            {item.status === "off" && (
                                                <div
                                                    className={`flex justify-center items-center bg-gray-400 rounded-[20px] p-2`}
                                                >
                                                    <span
                                                        className={`text-sm text-white`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </div>
                                            )}
                                            {item.status === "banned" && (
                                                <div
                                                    className={`flex justify-center items-center bg-red-400 rounded-[20px] p-2`}
                                                >
                                                    <span
                                                        className={`text-sm text-white`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-start items-center gap-3 col-span-1">
                                            <FaEye
                                                onClick={() =>
                                                    handleOpenForm(item.user_id)
                                                }
                                                className="text-[30px] text-yellow-500 hover:text-yellow-200"
                                            />

                                            <FaBan
                                                onClick={() =>
                                                    handleBanCustomer(
                                                        item.user_id,
                                                        item.status === "banned"
                                                            ? "active"
                                                            : "banned"
                                                    )
                                                }
                                                className="text-[30px] text-red-500 hover:text-red-200"
                                            />
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    )}
                    {isOpenFormInformation && (
                        <DisplayInformation
                            setIsOpenFormInformation={setIsOpenFormInformation}
                            user_id={selectedCustomer}
                        />
                    )}
                </div>
            )}
          
        </div>
    );
}
