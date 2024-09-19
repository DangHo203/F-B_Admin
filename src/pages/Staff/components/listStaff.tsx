import { useEffect, useState } from "react";
import { getStaffByParamsAPI, deleteStaffAPI } from "../staffServices";
import { set } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import FormUpdate from "./formUpdate";

const title = [
    {
        title: "Name",
        colSpan: "col-span-2",
    },
    {
        title: "Phone",
        colSpan: "col-span-2",
    },
    {
        title: "Role",
        colSpan: "col-span-1",
    },
    {
        title: "Status",
        colSpan: "col-span-1",
    },
    {
        title: "Point",
        colSpan: "col-span-1",
    },
    {
        title: "Action",
        colSpan: "col-span-1",
    },
];

export default function ListStaff() {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [params] = useSearchParams();
    const [isOpenFormUpdate, setIsOpenFormUpdate] = useState(false);

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteStaffAPI(id);
                fetchData();
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };

    const fetchData = async () => {
        const rs = await getStaffByParamsAPI({
            page: params.get("page") || 1,
            role: params.get("role"),
            status: params.get("status"),
            search: params.get("search"),
        });
        console.log(rs);
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
        <div className="w-full h-[80%] flex flex-col justify-center items-center p-2">
            {isOpenFormUpdate && <FormUpdate />}
            <div className="grid grid-cols-8 grid-rows-1 w-full px-5">
                {title.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`flex justify-start items-center ${item.colSpan}`}
                        >
                            <p className="text-lg font-semibold">
                                {item.title}
                            </p>
                        </div>
                    );
                })}
            </div>
            {list.length === 0 ? (
                <div className="w-full h-full grid-rows-5 bg-white rounded-[30px] flex items-center justify-center p-5">
                    <span className="text-red-600 text-[25px] font-medium">
                        No item find
                    </span>
                </div>
            ) : (
                <div className="w-full h-full grid grid-cols-1 grid-rows-5 bg-white rounded-[30px] items-center justify-center p-5">
                    {list.map(
                        (item: {
                            user_id: number;
                            image: string;
                            fullName: string;
                            email: string;
                            phone: string;
                            role: string;
                            status: string;
                            point: number;
                        }) => {
                            return (
                                <div
                                    key={item.user_id}
                                    className=" grid grid-cols-8 grid-rows-1 w-full"
                                >
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
                                        <p className="text-sm text-gray-500">
                                            {item.role}
                                        </p>
                                    </div>
                                    <div className="flex justify-start items-center col-span-1">
                                        <p className="text-sm text-gray-500">
                                            {item.status}
                                        </p>
                                    </div>
                                    <div className="flex justify-start items-center col-span-1">
                                        <p className="text-sm text-gray-500">
                                            {item.point}
                                        </p>
                                    </div>
                                    <div className="flex justify-start items-center col-span-1">
                                        <button
                                            onClick={() =>
                                                setIsOpenFormUpdate(true)
                                            }
                                            className="bg-blue-500 text-white p-1 rounded-md"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    item.user_id.toString()
                                                )
                                            }
                                            className="bg-red-500 text-white p-1 rounded-md ml-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            )}
        </div>
    );
}
