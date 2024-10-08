import axios from "../../axios";

export const loginAPI = async (email: String, password: String) => {
    return await axios({
        method: "POST",
        url: "/user/login",
        params: {
            email,
            password,
        },
    });
};

export const registerAPI = async (data: Object) => {
    return await axios({
        method: "POST",
        url: "/user/register",
        params: data,
    });
};

export const getNewToken = async (id: string) => {
    return await axios({
        method: "GET",
        url: "/user/token",
        params: {
            _id: id,
        },
    });
};
