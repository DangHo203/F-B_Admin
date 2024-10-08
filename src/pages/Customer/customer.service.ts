import axios from "../../axios";

export const getCustomerByIdAPI = async (id: number) => {
    return await axios({
        method: "GET",
        url: `/user/getCustomerById`,
        params: {_id: id },
    });
};
export const getSumCustomerAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: "/user/getSumCustomer",
        params: data,
    });
};
export const getCustomerByParamsAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: "/user/getCustomerByParams",
        params: data,
    });
};
export const changeStatusCustomerAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/user/status",
        params: data,
    });
};
