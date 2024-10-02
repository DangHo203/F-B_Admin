import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getFoodByParamsAPI, deleteFoodAPI } from "../menuServices";
import Swal from "sweetalert2";

const title = [
    {
        title: "Title",
        colSpan: "col-span-2",
        justify: "justify-center",
    },
    {
        title: "Image",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "Price",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "Category",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "Description",
        colSpan: "col-span-2",
        justify: "justify-start",
    },
    {
        title: "Status",
        colSpan: "col-span-1",
        justify: "justify-center",
    },
    {
        title: "Action",
        colSpan: "col-span-2",
        justify: "justify-center",
    },
];

interface ListItemsProps {
    setIsEdit: (value: boolean, m_id: string) => void;
    isRender?: boolean;
}
const ListItems: React.FC<ListItemsProps> = ({ setIsEdit, isRender }) => {
    const [list, setList] = useState<any[]>([]);
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const handleDelete = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await deleteFoodAPI(id);
                if (rs.status === 200) {
                    Swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                    );
                } else {
                    Swal.fire("Error!", "Something went wrong", "error");
                }
                fetchData();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "Your file is safe :)", "error");
            }
        });
    };

    const fetchData = async () => {
        const data = {
            availability: params.get("status"),
            title: params.get("title"),
            category: params.get("category"),
            page: params.get("page") || 1,
            limit: 5,
        };
        const rs = await getFoodByParamsAPI(data);
        setList(rs?.data?.data);
    };

    useEffect(() => {
        fetchData();
    }, [params, isRender]);

    useEffect(() => {
        if (list?.length === 0) {
            params.delete("page");
            params.append("page", "1");
            navigate(`?${params.toString()}`);
        }
    }, [list]);
    return (
        <div className="w-full h-[80%] flex flex-col justify-center items-center px-5">
            <div className="grid grid-cols-10 grid-rows-1 w-full px-5">
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
                        (
                            item: {
                                item_id: string;
                                title: string;
                                image: string;
                                price: string;
                                category: string;
                                description: string;
                                availability: number;
                            },
                            index: number
                        ) => {
                            return (
                                <>
                                    <div
                                        key={index}
                                        className=" grid grid-cols-10 grid-rows-1 w-full"
                                    >
                                        <div className="flex justify-center items-center col-span-2">
                                            <p className="text-lg font-semibold">
                                                {item.title}
                                            </p>
                                        </div>
                                        <div className="flex justify-start items-start col-span-1">
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="w-[75px] h-[75px] object-cover rounded-[10px]"
                                            />
                                        </div>
                                        <div className="flex justify-start items-center col-span-1">
                                            <p className="text-sm text-gray-500">
                                                {item.price}
                                            </p>
                                        </div>

                                        <div className="flex justify-start items-center col-span-1">
                                            <p className="text-sm text-gray-500">
                                                {item.category}
                                            </p>
                                        </div>
                                        <div className="flex justify-start items-center col-span-2">
                                            <p className="text-sm text-gray-500">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="flex justify-center items-center col-span-1">
                                            <p className="text-sm text-gray-500">
                                                {item.availability === 1 ? (
                                                    <span className="text-green-500 text-[15px] bg-green-200 p-2 rounded-md">
                                                        Available
                                                    </span>
                                                ) : (
                                                    <span className="text-red-500 text-[15px] bg-red-200 p-2 rounded-md">
                                                        Not Available
                                                    </span>
                                                )}
                                            </p>
                                        </div>

                                        <div className="flex justify-center items-center gap-3 col-span-2">
                                            <div className="flex flex-row justify-between items-center text-[12px] gap-2">
                                                <button className="text-white bg-blue-500 p-2 rounded-md hover:bg-blue-400">
                                                    Add Ingre
                                                </button>
                                                <button className="text-white bg-blue-500 p-2 rounded-md hover:bg-blue-400">
                                                    Nurti
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setIsEdit(
                                                            true,
                                                            item.item_id
                                                        )
                                                    }
                                                    className="text-white bg-blue-500 p-2 rounded-md hover:bg-blue-400"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            item.item_id
                                                        )
                                                    }
                                                    className="text-white bg-red-500 p-2 rounded-md hover:bg-red-400"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                            {/* <FaEye
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
                                            /> */}
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    )}
                </div>
            )}
        </div>
    );
};

export default ListItems;
