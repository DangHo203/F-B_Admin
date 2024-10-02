import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

//api
import { getIngredientAPI } from "../../Ingredient/ingredientServices";
import { set } from "date-fns";

import { IIngredients } from "../../../types/Menu";

interface FormIngretionProps {
    setIsOpenFormIngre: (value: boolean) => void;
    handleSaveIngretionData?: (data: any) => void;
    list?: IIngredients[];
    item_id?: string;
}

const FormIngredients: React.FC<FormIngretionProps> = ({
    setIsOpenFormIngre,
    handleSaveIngretionData,
    list,
    item_id,
}) => {
    const [listIngredients, setListIngredients] = useState<IIngredients[]>(
        list || []
    );

    const [isAdd, setIsAdd] = useState(false);
    const [titleAdd, setTitleAdd] = useState("");
    const [idAdd, setIdAdd] = useState("");
    const [quantityAdd, setQuantityAdd] = useState(0);

    const handleAddItem = () => {
        setIsAdd(!isAdd);
        setTitleAdd("");
        setQuantityAdd(1);
        // if (listIngredients[0]?.title === "") {
        //     return;
        // }
        // setListIngredients([
        //     {
        //         title: "",
        //         quantityRequired: 1,
        //     },
        //     ...listIngredients,
        // ]);
    };
    const handleDeleteItem = (index: number) => {
        const newList = [...listIngredients];
        newList.splice(index, 1);
        setListIngredients(newList);
    };

    const handleSave = () => {
        if (isAdd) {
            //validate
            if (titleAdd === "" || quantityAdd === 0) {
                setIsAdd(!isAdd);
                return;
            }
            let itemExisted = false;
            listIngredients.forEach((item) => {
                if (item.name === titleAdd) {
                    itemExisted = true;
                }
            });
            if (itemExisted) {
                toast.error("This item is already existed");
                return;
            }
            //

            setListIngredients([
                ...listIngredients,
                {
                    name: titleAdd,
                    item_id: Number(item_id),
                    quantity_required: quantityAdd,
                    ingredient_id: Number(idAdd),
                },
            ]);
            setTitleAdd("");
            setQuantityAdd(1);
            setIsAdd(!isAdd);
            return;
        }

        if (handleSaveIngretionData) {
            handleSaveIngretionData(listIngredients);
        }
        setIsOpenFormIngre(false);
    };

    //list Ingredients data
    const fetchData = async () => {
        const rs = await getIngredientAPI();
        return rs?.data?.result;
    };
    const { data, error, isLoading } = useQuery({
        queryKey: ["ingredients"],
        queryFn: fetchData,
    });

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="fixed inset-0 z-50 bg-opacity-50 bg-white w-screen h-screen p-[100px] flex justify-center items-center">
            <div className=" relative bg-white w-1/2 h-full flex gap-3 flex-col shadow-2xl rounded-md p-5">
                <div
                    onClick={() => setIsOpenFormIngre(false)}
                    className="hover:text-red-500 absolute top-5 right-5 text-[30px] text-red font-bold cursor-pointer"
                >
                    X
                </div>
                <span className="text-[30px] font-bold h-[10%] self-center ">
                    Ingredients Information
                </span>

                <div className="grid grid-cols-3 grid-rows-1 px-[50px] text-[20px] font-bold">
                    <span>Title</span>
                    <span>Quantity Required</span>
                    <div
                        onClick={handleAddItem}
                        className="text-[15px] flex flex-row items-center justify-center hover:text-blue-500 cursor-pointer"
                    >
                        <IoAddOutline className="text-[30px]" /> Add item
                    </div>
                </div>
                <div className="h-[80%] w-full overflow-y-auto px-[50px] gap-2">
                    {isAdd && (
                        <div className="grid grid-cols-2 grid-rows-1 sticky top-0 gap-2">
                            <select
                                onChange={(e) => {
                                    setTitleAdd(
                                        e.target.selectedOptions[0].text
                                    );
                                    console.log(
                                        e.target.selectedOptions[0].text
                                    );
                                    setIdAdd(e.target.value);
                                }}
                                value={idAdd}
                                className="border border-blue-300 p-2 rounded-xl"
                            >
                                {data?.map(
                                    (
                                        item: {
                                            name: string;
                                            ingredient_id: string;
                                        },
                                        index: number
                                    ) => (
                                        <option
                                            key={index}
                                            value={item.ingredient_id}
                                        >
                                            {item.name}
                                        </option>
                                    )
                                )}
                            </select>
                            <input
                                type="number"
                                min={0}
                                value={quantityAdd}
                                onChange={(e) => {
                                    setQuantityAdd(Number(e.target.value));
                                }}
                                className="border border-blue-300 p-2 rounded-xl"
                                placeholder="Quantity"
                            />
                        </div>
                    )}
                    {listIngredients?.map((item, index) => {
                        console.log("hiii",item);
                        return (
                            <>
                                <div
                                    key={index}
                                    className="grid grid-cols-3 grid-rows-1 gap-2 my-2"
                                >
                                    <select
                                        value={item.name}
                                        onChange={(e) => {
                                            const newList = [
                                                ...listIngredients,
                                            ];
                                            newList[index].name =
                                                e.target.value;
                                            setListIngredients(newList);
                                        }}
                                        className="border p-2 rounded-xl"
                                    >
                                        {data?.map(
                                            (
                                                item: {
                                                    name: string;
                                                },
                                                index: number
                                            ) => (
                                                <option
                                                    key={index}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    <input
                                        type="number"
                                        min={0}
                                        value={item.quantity_required}
                                        onChange={(e) => {
                                            const newList = [
                                                ...listIngredients,
                                            ];
                                            newList[index].quantity_required =
                                                Number(e.target.value);
                                            setListIngredients(newList);
                                        }}
                                        className="p-2 rounded-xl border"
                                    />
                                    <div className="w-full flex justify-center items-center">
                                        <MdDeleteForever
                                            onClick={() =>
                                                handleDeleteItem(index)
                                            }
                                            className="text-red-500 text-[30px] self-center hover:text-red-200"
                                        />
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>

                <button
                    onClick={handleSave}
                    className={
                        isAdd
                            ? "bg-red-500 text-white p-2 rounded-md h-[10%] "
                            : "bg-blue-500 text-white p-2 rounded-md h-[10%] "
                    }
                >
                    {isAdd ? "Confirm" : "Save"}
                </button>
            </div>
        </div>
    );
};

export default FormIngredients;
