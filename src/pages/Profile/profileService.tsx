import axios from "../../axios";

export const changePassword = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/user/changePassword`,
        params: data,
    });
}

export const getAllUserAPI = async () => {
    return await axios({
        method: "GET",
        url: "/user/getUser",
    });
};

export const getUserByIdAPI = async (id: string) => {
    return await axios({
        method: "GET",
        url: "/user/getUserById",
        params: { _id: id },
    });
}

export const deleteUserAPI = async (id: string) => {
    return await axios({
        method: "DELETE",
        url: `/user/deleteUser`,
        params: { _id: id },
    });
};
export const editUserAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/user/updateUser`,
        params: data,
    });
};
export const checkPhoneNumberAPI = async (phoneNumber: String) => {
    return await axios({
        method: "POST",
        url: `/user/checkPhoneNumber`,
        params: {
            phoneNumber: phoneNumber,
        },
    });
};
export const getSumUserAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: `/user/getSumUser`,
        params: data,
    });
};

export const getCustomerByParamsAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: `/user/getUsersByParams`,
        params: data,
    });
};
export const updateStatusAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: `/user/status`,
        params: data,
    });
};
