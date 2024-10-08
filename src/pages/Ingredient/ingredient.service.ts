import axios from "../../axios";

export const getIngredientAPI = async () => {
    return await axios({
        method: "GET",
        url: "/ingredient/all",
    });
}

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

export const getIngredientByIDAPI = async (id: any) => {
    return await axios({
        method: "GET",
        url: "/ingredient/id",
        params: { i_id: id },
    });
}

export const getIngredientByIdAPI = async (id: any) => {
    return await axios({
        method: "GET",
        url: "/ingredient/menu",
        params: { item_id: id },
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

export const editIngredientAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: "/ingredient",
        params: data,
    });
}


//list Ingredients data

export const addListItemIngredientAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/ingredient/menu",
        params: data,
    });
}

export const updateListItemIngredientAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: "/ingredient/menu",
        params: data,
    });
}

export const deleteAllListItemIngredientAPI = async (data: any) => {
    return await axios({
        method: "DELETE",
        url: "/ingredient/menu/all",
        params: data,
    });
}

export const getListIngredientByIDAPI = async (id: any) => {
    return await axios({
        method: "GET",
        url: "/ingredient/menu",
        params: { item_id: id },
    });
}
