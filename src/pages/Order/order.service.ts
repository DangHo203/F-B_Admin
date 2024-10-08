import axios from "../../axios";
import { getSumHistoryOrders } from '../../utils/Order/order.utils';

export const getOdersByParamsAPI = async (params: any) => {
    return await axios({
        method: "GET",
        url: "/order",
        params,
    })
}
export const getHistoryOrdersAPI = async (params: any) => {
    return await axios({
        method: "GET",
        url: "/order",
        params: {
            ...params,
            history: 1
        }
    })
}
export const getSumHistoryOrdersAPI = async (params: any) => {
    return await axios({
        method: "GET",
        url: "/order/sum",
        params: {
            ...params,
            history: 1
        }
    })
}
export const getSumOrdersAPI = async (params: any) => {
    return await axios({
        method: "GET",
        url: "/order/sum",
        params,
    })
}

export const getOrderByIdAPI = async (id: number) => {
    return await axios({
        method: "GET",
        url: `/order/id`,
        params: {
            order_id: id
        }
    })
} 

export const getOrderItemsAPI = async (id: number) => {
    return await axios({
        method: "GET",
        url: `/order/items`,
        params: {
            order_id: id
        }
    })
}

export const changeStatusOrderAPI = async (params: any) => {
    return await axios({
        method: "PUT",
        url: "/order/status",
        params: params
    })
}
export const cancelOrderAPI = async (params: any) => {
    return await axios({
        method: "PUT",
        url: "/order/cancel",
        params: params
    })
}
