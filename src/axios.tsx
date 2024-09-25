import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:5000/api",
});

instance.interceptors.request.use(
    function (config) {
        const localStorage = window.localStorage.getItem("persist:test");

        const { token } = JSON.parse(localStorage?.toString() || "{}");

        if (token !== "") {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        if (error?.response?.status === 403) {
            window.localStorage.removeItem("persist:test");
            window.location.href = "/login";
        }   
        return error?.response?.data;
    }
);

export default instance;
