import { useEffect, useState } from "react";
import Input from "../../../components/commons/Input";

interface FormNutritionProps {
    setIsOpenFormNutri: (value: boolean) => void;
    handleSaveNutritionData?: (data: any) => void;
    data?: any;
    id?: string;
    caloriesProps?: string;
    proteinProps?: string;
    fatProps?: string;
    carbohydrateProps?: string;
}

const FormNutrition: React.FC<FormNutritionProps> = ({
    setIsOpenFormNutri,
    handleSaveNutritionData,
    id,
    caloriesProps,
    proteinProps,
    fatProps,
    carbohydrateProps,
    data,
}) => {
    const [calories, setCalories] = useState(caloriesProps || "");
    const [protein, setProtein] = useState(proteinProps || "");
    const [fat, setFat] = useState(fatProps || "");
    const [carbohydrate, setCarbohydrate] = useState(carbohydrateProps || "");

    const handleSave = () => {
        if (handleSaveNutritionData) {
            handleSaveNutritionData({
                nutritional_info_id:data.nutritional_info_id,
                calories,
                proteins:protein,
                fats:fat,
                carbs:carbohydrate,
            });
        }
        setIsOpenFormNutri(false);
    };

    useEffect(() => {
        if (data) {
            setCalories(data.calories);
            setProtein(data.proteins);
            setFat(data.fats);
            setCarbohydrate(data.carbs);
        }
        if (id) {
            //get data
        }
    }, []);
    return (
        <div className="fixed inset-0 z-50 bg-opacity-50 bg-white w-screen h-screen p-[100px] flex justify-center items-center">
            <div className=" relative bg-white w-1/2 h-auto flex gap-3 flex-col shadow-2xl rounded-md p-5">
                <div
                    onClick={() => setIsOpenFormNutri(false)}
                    className="hover:text-red-500 cursor-pointer absolute top-0 right-5 text-[30px] text-red font-bold"
                >
                    X
                </div>

                <span className="text-[20px] font-bold">Nutrition</span>
                <Input
                    value={calories}
                    onChange={setCalories}
                    placeholder="kcal"
                    type="number"
                    label="Calories"
                    error={false}
                />
                <Input
                    value={protein}
                    onChange={setProtein}
                    placeholder="gram"
                    type="number"
                    label="Protein"
                    error={false}
                />
                <Input
                    value={fat}
                    onChange={setFat}
                    placeholder="gram"
                    type="number"
                    label="Fat"
                    error={false}
                />
                <Input
                    value={carbohydrate}
                    onChange={setCarbohydrate}
                    placeholder="gram"
                    type="number"
                    label="Carbohydrate"
                    error={false}
                />
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white p-2 rounded-md"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default FormNutrition;
