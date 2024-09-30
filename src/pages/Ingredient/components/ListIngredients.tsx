import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    deleteIngredientAPI,
    getIngredientByParamsAPI,
} from "../ingredientServices";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const title = [
    {
        title: "ID",
        colSpan: "col-span-2",
        justify: "justify-center",
    },
    {
        title: "Title",
        colSpan: "col-span-3",
        justify: "justify-start",
    },
    {
        title: "Stock",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "Unit",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "Status",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "",
        colSpan: "col-span-2",
        justify: "justify-start",
    },
];

interface ListIngredientsProps {
    setIsEdit: (value: boolean) => void;
    isRender: boolean;
}
const ListIngredients: React.FC<ListIngredientsProps> = ({
    setIsEdit,

    isRender,
}) => {
    const [list, setList] = useState<any[]>([]);
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this ingredient",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await deleteIngredientAPI(id);
                if (rs.status === 200) {
                    toast.success("Delete ingredient success");
                    fetchData();
                } else {
                    toast.error("Delete ingredient fail");
                }
            }
        });
    };

    const fetchData = async () => {
        const data = {
            is_available: params.get("status"),
            search: params.get("title"),
            page: params.get("page") || 1,
            limit: 10,
        };
        const rs = await getIngredientByParamsAPI(data);

        console.log(rs);
        setList(rs?.data?.result);
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
                <div className="w-full h-full grid-rows-10 bg-white rounded-[30px] flex items-center justify-center p-5">
                    <span className="text-red-600 text-[25px] font-medium">
                        No item find
                    </span>
                </div>
            ) : (
                <div className="w-full h-full grid grid-cols-1 grid-rows-10  bg-white rounded-[30px] items-center justify-center p-[30px]">
                    {list?.map(
                        (
                            item: {
                                ingredient_id: string;
                                name: string;
                                stock: string;
                                unit: string;
                                is_available: number;
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
                                                {item.ingredient_id}
                                            </p>
                                        </div>

                                        <div className="flex justify-start items-center col-span-3">
                                            <p className="text-sm text-gray-500">
                                                {item.name}
                                            </p>
                                        </div>

                                        <div className="flex justify-start items-center col-span-1">
                                            <p className="text-sm text-gray-500">
                                                {item.stock}
                                            </p>
                                        </div>
                                        <div className="flex justify-start items-center col-span-1">
                                            <p className="text-sm text-gray-500">
                                                {item.unit}
                                            </p>
                                        </div>

                                        <div className="flex justify-center items-center col-span-1">
                                            <p className="text-sm text-gray-500">
                                                {item.is_available === 1 ? (
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
                                                <button
                                                    onClick={() =>
                                                        setIsEdit(true)
                                                    }
                                                    className="text-white bg-blue-500 p-2 rounded-md hover:bg-blue-400"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            item.ingredient_id
                                                        )
                                                    }
                                                    className="text-white bg-red-500 p-2 rounded-md hover:bg-red-400"
                                                >
                                                    Delete
                                                </button>
                                            </div>
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

export default ListIngredients;
