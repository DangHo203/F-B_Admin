import axios from "../../axios";

export const getFoodByIdAPI = async (id: any) => {

}

export const getFoodByParamsAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: "/menu",
        params: data,
    });
}

export const getSumFoodAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: "/menu/sum",
        params: data,
    });
}

export const updateFoodAPI = async (data: any) => {

}

export const deleteFoodAPI = async (id: any) => {

}