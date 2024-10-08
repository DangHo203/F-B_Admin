import axios from "../../axios";

export const getNutritionByIdAPI = async (id: any) => {
    return await axios({
        method: "GET",
        url: "/nutrition",
        params: { item_id: id },
    });
};

export const addNutritionAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/nutrition",
        params:data,
    });
}

export const updateNutritionAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: "/nutrition",
        params: data,
    });
}

