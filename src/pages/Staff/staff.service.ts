import axios from "../../axios";

export const getSumStaffAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: `/staff/getSumStaff`,
        params: data,
    });
};

export const getStaffByIdAPI = async (id: any) => {
    return await axios({
        method: "GET",
        url: `/staff/getStaffById`,
        params: { _id: id },
    });
};

export const getStaffByParamsAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: `/staff/getStaffByParams`,
        params: data,
    });
};

export const getAllStaffAPI = async () => {
    return await axios({
        method: "GET",
        url: "/staff/getAllStaff",
    });
};

export const deleteStaffAPI = async (id: any) => {
    return await axios({
        method: "DELETE",
        url: `/staff/deleteStaff`,
        params: { user_id: id },
    });
};

export const updateStaffAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: "/staff/updateStaff",
        params: data,
    });
};


export const updatePermissionAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: "/staff/updatePermission",
        params: data,
    });
}