import axios from "../../axios";
import { deleteUserAPI } from '../Profile/profileService';

export const getSumStaffAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: `/staff/getSumStaff`,
        params: data,
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
        url: "/staff/getStaff",
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
}