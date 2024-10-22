import {
    getOdersByParamsAPI,
    getSumOrdersAPI,
    getOrderByIdAPI,
    getOrderItemsAPI,
    getOrdersByIdOrderAPI,
} from "../../pages/Order/order.service";

import { getCustomerByIdAPI } from "../../pages/Customer/customer.service";

import { IOrder, IOrderItem } from "../../types/order.interface";
import { ICustomer } from "../../types/customer.interface";

export const getHistoryOrders = async (data: any): Promise<IOrder[]> => {
    const rs = await getOdersByParamsAPI({
        ...data,
        history: 1,
    });
    return rs?.data?.result;
};
export const getOrdersByParams = async (data: any): Promise<IOrder[]> => {
    const rs = await getOdersByParamsAPI(data);
    return rs?.data?.result;
};
export const getSumHistoryOrders = async (data: any): Promise<any> => {
    const rs = await getSumOrdersAPI({
        ...data,
        history: 1,
    });
    return rs?.data?.result[0].Sum;
};
export const getSumOrders = async (data: any): Promise<any> => {
    const rs = await getSumOrdersAPI(data);

    return rs?.data?.result[0].Sum;
};

export const fetchOrder = async (orderID: number) => {
    const rs = await getOrdersByIdOrderAPI(orderID);
    console.log(rs);
    return rs?.data?.result[0];
};

export const fetchCustomerById = async (userID: number): Promise<ICustomer> => {
    const rs = await getCustomerByIdAPI(userID);

    return rs?.data?.data[0];
};

export const fetchOrderItems = async (
    orderID: number
): Promise<IOrderItem[]> => {
    const rs = await getOrderItemsAPI(orderID);
    return rs?.data?.result;
};

export const fetchInformationOrder = async (
    orderID: number,
    userID: number
) => {
    const order = await fetchOrder(orderID);
    const customer = await fetchCustomerById(userID);
    const orderItems = await fetchOrderItems(orderID);
    return {
        order,
        customer,
        orderItems,
    };
};
