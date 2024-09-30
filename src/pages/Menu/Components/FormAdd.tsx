import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Input from "../../../components/commons/Input";
import { useEffect, useState } from "react";
import SelectInput from "../../../components/commons/Select";
import { SelectChangeEvent } from "@mui/material/Select";
import FormNutrition from "./FormNutrition";
import FormIngredients from "./FormIngredients";

interface FormAddProps {
    setIsAdd: (value: boolean) => void;
}
interface Ingredients {
    title: string;
    quantityRequired: number;
}

const list = [
    {
        title: "Sugar",
        quantityRequired: 1,
    },
    {
        title: "Salt",
        quantityRequired: 2,
    },
    {
        title: "Pepper",
        quantityRequired: 3,
    },
    {
        title: "Chilli",
        quantityRequired: 4,
    },
    {
        title: "Soy Sauce",
        quantityRequired: 5,
    },
    {
        title: "Fish Sauce",
        quantityRequired: 6,
    },
    {
        title: "Oyster Sauce",
        quantityRequired: 7,
    },
    {
        title: "Vinegar",
        quantityRequired: 8,
    },
    {
        title: "Garlic",
        quantityRequired: 9,
    },
    {
        title: "Onion",
        quantityRequired: 10,
    },
    {
        title: "Tomato",
        quantityRequired: 11,
    },
    {
        title: "Cucumber",
        quantityRequired: 12,
    },
    {
        title: "Carrot",
        quantityRequired: 13,
    },
    {
        title: "Beef",
        quantityRequired: 14,
    },
    {
        title: "Chicken",
        quantityRequired: 15,
    },
];

const FormAdd: React.FC<FormAddProps> = ({ setIsAdd }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(
        "https://images.ctfassets.net/kugm9fp9ib18/3aHPaEUU9HKYSVj1CTng58/d6750b97344c1dc31bdd09312d74ea5b/menu-default-image_220606_web.png"
    );

    const [isOpenFormNutri, setIsOpenFormNutri] = useState(false);
    const [isOpenFormIng, setIsOpenFormIng] = useState(false);

    const [nutriData, setNutriData] = useState(null);
    const [ingData, setIngData] = useState(null);

    //validation
    const [error, setError] = useState({
        title: "",
        price: "",
        category: "",
        description: "",
    });

    function validateData(): boolean {
        const newError = {
            title: title === "" ? "Title is required" : "",
            price: price === "" ? "Price is required" : "",
            category: category === "" ? "Category is required" : "",
            description: description === "" ? "Description is required" : "",
        };
    
        setError(newError);
    
        // Check if there are any errors
        const hasError = Object.values(newError).some((errorMsg) => errorMsg !== "");
        return !hasError; 
    }

    const handleAdd = () => {
        if (validateData()) {
            const data = {
                title: title,
                price: price,
                category: category,
                description: description,
                image: image,           
            };
            console.log(data);
        }
    };
    const handleChangeCategory = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };
    const handeOpenFormNutri = () => {
        setIsOpenFormNutri(true);
    };
    const handleOpenFormIng = () => {
        setIsOpenFormIng(true);
    };

    const handleSaveNutritionData = (data: any) => {
        setNutriData(data);
    };
    const handleSaveIngredientData = (data: any) => {
        setIngData(data);
    };
    //image
    const [selectedImage, setSelectedImage] = useState(null);
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/") && file.size < 5000000) {
            setSelectedImage(file);
        } else {
            alert("File không hợp lệ. Chỉ chấp nhận ảnh nhỏ hơn 5MB.");
        }
    };
    const handleChangeImage = () => {
        const input = document.getElementById("image");
        input?.click();
    };
    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(selectedImage);
            }
        };
    }, [selectedImage]);

    return (
        <div className="fixed inset-0 z-40 bg-opacity-50 bg-white w-screen h-screen p-[100px] flex justify-center items-baseline">
            {isOpenFormNutri && (
                <FormNutrition
                    handleSaveNutritionData={handleSaveNutritionData}
                    setIsOpenFormNutri={setIsOpenFormNutri}
                />
            )}
            {isOpenFormIng && (
                <FormIngredients
                    list={list}
                    handleSaveIngretionData={handleSaveIngredientData}
                    setIsOpenFormIngre={setIsOpenFormIng}
                />
            )}

            <div className="bg-white w-full h-auto flex flex-row shadow-2xl rounded-md p-5">
                <div className="w-1/2 h-auto p-[75px] flex flex-col justify-center items-center gap-2">
                    {selectedImage && (
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Avatar Preview"
                            className="rounded-[10px] w-[300px] h-[300px] object-cover"
                        />
                    )}
                    {selectedImage === null && (
                        <img
                            src={image}
                            alt="Avatar"
                            className="rounded-[10px] w-[300px] h-[300px] object-cover"
                        />
                    )}
                    <span
                        onClick={handleChangeImage}
                        className="text-blue-500 text-[15px]"
                    >
                        Change image
                    </span>
                    <input
                        onChange={handleFileChange}
                        id="image"
                        type="file"
                        className="hidden"
                    />
                </div>
                <div className="w-1/2 h-full flex flex-col gap-3 justify-center items-start pr-[30px]">
                    <span className="text-[30px] font-bold self-center">
                        Add Menu Item
                    </span>
                    <Input
                        value={title}
                        onChange={setTitle}
                        placeholder="Item title"
                        type="text"
                        label="Title"
                        error={error.title ? true : false}
                        errorMesage={error.title}
                    />
                    <Input
                        value={price}
                        onChange={setPrice}
                        placeholder="Item price"
                        type="number"
                        label="Price"
                        error={error.price ? true : false}
                        errorMesage={error.title}
                    />
                    <SelectInput
                        value={category}
                        onChange={handleChangeCategory}
                        label="Category"
                        listItems={["Food", "Beverage", "Special"]}
                        id={error.category ? true : false}
                    />
                    <Input
                        value={description}
                        onChange={setDescription}
                        placeholder="Item description"
                        type="text"
                        label="Description"
                        multiline
                        error={error.description ? true : false}
                        errorMesage={error.title}
                    />

                    <div className="flex flex-row justify-center items-center gap-2 w-full">
                        <button
                            onClick={handleOpenFormIng}
                            className="bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-400"
                        >
                            Add Ingredients
                        </button>
                        <button
                            onClick={handeOpenFormNutri}
                            className="bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-400"
                        >
                            Add Nutrition
                        </button>
                    </div>
                    <button
                        onClick={handleAdd}
                        className="bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-400"
                    >
                        Confirm
                    </button>
                </div>
            </div>
            <div
                onClick={() => setIsAdd(false)}
                className="text-red-600 text-[50px] absolute top-5 right-10 hover:text-red-200"
            >
                X
            </div>
        </div>
    );
};
export default FormAdd;
