import TextFieldComponent from "./TextField";
import StepperComponents from "./Stepper";
import { fetchInformationOrder } from "../../../utils/Order/order.utils";
import { useQuery } from "@tanstack/react-query";
import { IOrder } from "../../../types/order.interface";
import { ICustomer } from "../../../types/customer.interface";
import { useState } from "react";
import FormatDay from "../../../helper/FormatDay.helper";
import FormatCurrency from "../../../helper/FormatCurrency.helper";


interface OrderDetailProps {
    setIsShowDetail: (value: boolean) => void;
    orderID?: number;
    userID?: number;
}
const OrderDetail: React.FC<OrderDetailProps> = ({
    setIsShowDetail,
    orderID,
    userID,
}) => {
  
    const { data, isLoading } = useQuery({
        queryKey: ["fetchOrderInformation"],
        queryFn: () =>
            fetchInformationOrder(orderID as number, userID as number),
    });
 

    return (
        <div
            onClick={(event) => {
                setIsShowDetail(false);
            }}
            className="fixed inset-0 z-40 bg-opacity-65 bg-gray-200 w-screen h-screen p-[100px] flex justify-center items-center"
        >
            <div
                onClick={(event) => {
                    event?.stopPropagation();
                }}
                className="bg-white z-50 w-[100%] h-auto flex flex-col shadow-2xl rounded-md p-5 gap-5"
            >
                <div className="w-full h-full flex flex-row justify-center items-center gap-5 ">
                    <div className="w-1/2 h-full flex flex-col justify-start p-[20px] hover:bg-blue-50 border">
                        <span className="text-[18px] font-bold w-full text-center pb-3">
                            Customer Information
                        </span>
                        <div className="w-full h-[50%] flex flex-col justify-start">
                            <TextFieldComponent
                                label="Full name:"
                                value={data?.customer.fullName || ""}
                            />
                            <TextFieldComponent
                                label="Phone Number:"
                                value={data?.customer.phone || ""}
                            />
                            <TextFieldComponent
                                label="Address:"
                                value={data?.customer.address || "No address"}
                            />
                            <TextFieldComponent
                                label="Email:"
                                value={data?.customer.email || ""}
                            />
                             <TextFieldComponent
                                label="Age:"
                                value={data?.customer.age?.toString() || ""}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 h-full flex flex-col justify-start p-[20px] hover:bg-blue-50 border">
                        <span className="text-[18px] font-bold w-full text-center pb-3">
                            Order Information
                        </span>
                        <div className="w-full h-[50%] flex flex-col justify-start">
                            <TextFieldComponent
                                label="Id Order:"
                                value={data?.order.order_id.toString() || ""}
                            />
                            <TextFieldComponent
                                label="Total:"
                                value={
                                    FormatCurrency(data?.order.total_price) ||
                                    ""
                                }
                            />
                            <TextFieldComponent
                                label="Created at:"
                                value={FormatDay(data?.order.create_at) || ""}
                            />
                            <TextFieldComponent
                                label="Updated at:"
                                value={
                                    FormatDay(data?.order.delivery_time) || ""
                                }
                            />
                            <TextFieldComponent
                                label="Payment method:"
                                value={"Momo"}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full h-[200px] flex flex-row justify-between items-center gap-5 border py-2">
                    <div className="w-[70%] h-full overflow-y-auto flex flex-col justify-start items-center gap-1">
                        {data?.orderItems.map((item, index) => {
                            return (
                                <div className="flex flex-row w-full h-auto py-1 items-center justify-start gap-5 ">
                                    <div className="w-[30%]  flex justify-center items-center">
                                        <img
                                            className="w-[50px] h-[50px] rounded-md"
                                            src={item.image}
                                            alt=""
                                        />
                                    </div>
                                    <span className="w-[30%] text-[18px] font-medium">
                                        {item.title}
                                    </span>
                                    <span className="text-[15px]">
                                        {FormatCurrency(item.price)}
                                    </span>
                                    <span className="text-[15px]">
                                        <span className="text-[10px]">X</span> {item.quantity}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-[30%] h-full flex flex-col justify-start items-start gap-2">
                        <span className="text-[18px] h-[10%] font-bold w-full text-start pb-3">
                            Note:
                        </span>
                        <text className="w-full h-[90%] p-2 border">
                            {data?.order.message}
                        </text>
                    </div>
                </div>
                <div className="w-full h-full bg-gray-50">
                    <StepperComponents status={data?.order.status} />
                </div>
            </div>
            <div
                onClick={() => setIsShowDetail(false)}
                className="text-red-600 cursor-pointer text-[50px] absolute top-5 right-10 hover:text-red-200"
            >
                X
            </div>
        </div>
    );
};

export default OrderDetail;
