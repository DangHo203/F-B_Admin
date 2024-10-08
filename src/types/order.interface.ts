
export interface IOrder {
    order_id: number;
    user_id: number;
    delivery_time?: string;
    status: string;
    total_price: number;
    create_at: string;
    message?: string;
    
}

export interface IOrderItem {
    order_id: number;
    item_id: number;
    quantity: number;
    price: number;
    title:string;
    image:string;
}