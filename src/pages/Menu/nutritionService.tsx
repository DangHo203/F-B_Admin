import axios from "../../axios";

export const getNutritionByIdAPI = async (id: any) => {
    return await axios({
        method: "GET",
        url: "/nutrition/" + id,
    });
};
