import axios from "../../axios";


export const getIngredientByParamsAPI = async (params: any) => {
    return await axios({
        method: "GET",
        url: "/ingredient",
        params,
    });
}

export const getSumIngredientAPI = async (params: any) => {
    return await axios({
        method: "GET",
        url: "/ingredient/sum",
        params,
    });
}

export const getIngredientByIdAPI = async (id: any) => {
    return await axios({
        method: "GET",
        url: "/ingredient/" + id,
    });
}

export const addIngredientAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/ingredient",
        params: data,
    });
}
export const deleteIngredientAPI = async (id: any) => {
    return await axios({
        method: "DELETE",
        url: "/ingredient",
        params: { i_id: id },
    });
}
