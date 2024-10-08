import axios from "../../axios";
export const changeStatusOrderKitchenAPI = async (params: any) => {
    return await axios({
        method: "PUT",
        url: "/order/status",
        params: params
    })
}
