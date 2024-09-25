import axios from "../../axios";

export const changePassword = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/user/changePassword`,
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

export const editUserAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/staff/updateProfile`,
        params: data,
    });
};

export const uploadImageAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: `/staff/uploadImage`,
        data: data,
    });
}
