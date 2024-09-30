import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

interface Ingredients {
    title: string;
    quantityRequired: number;
}
interface FormIngretionProps {
    setIsOpenFormIngre: (value: boolean) => void;
    handleSaveIngretionData?: (data: any) => void;
    list?: Ingredients[];
}

const FormIngredients: React.FC<FormIngretionProps> = ({
    setIsOpenFormIngre,
    handleSaveIngretionData,
    list,
}) => {
    const [listIngredients, setListIngredients] = useState<Ingredients[]>(
        list || []
    );

    const handleAddItem = () => {
        setListIngredients([
            ...listIngredients,
            {
                title: "",
                quantityRequired: 0,
            },
        ]);
    };
    const handleDeleteItem = (index: number) => {
        const newList = [...listIngredients];
        newList.splice(index, 1);
        setListIngredients(newList);
    };

    const handleSave = () => {
        if (handleSaveIngretionData) {
            handleSaveIngretionData(listIngredients);
        }
        setIsOpenFormIngre(false);
    };
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
                    {listIngredients.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-3 grid-rows-1"
                        >
                            <input
                                type="text"
                                value={item.title}
                                onChange={(e) => {
                                    const newList = [...listIngredients];
                                    newList[index].title = e.target.value;
                                    setListIngredients(newList);
                                }}
                            />
                            <input
                                type="number"
                                value={item.quantityRequired}
                                onChange={(e) => {
                                    const newList = [...listIngredients];
                                    newList[index].quantityRequired = Number(
                                        e.target.value
                                    );
                                    setListIngredients(newList);
                                }}
                            />
                            <div className="w-full flex justify-center items-center">
                                <MdDeleteForever
                                    onClick={() => handleDeleteItem(index)}
                                    className="text-red-500 text-[30px] self-center hover:text-red-200"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white p-2 rounded-md h-[10%] "
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default FormIngredients;
