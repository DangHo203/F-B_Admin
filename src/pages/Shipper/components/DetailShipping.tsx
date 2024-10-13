import { useEffect, useState } from "react";
import { getOrderByIdAPI } from "../../Order/order.service";
import {
    fetchCustomerById,
    fetchOrder,
    fetchOrderItems,
} from "../../../utils/Order/order.utils";
import { set } from "date-fns";
import { GetTime } from "../../../helper/GetTimeOnDate.helper";
import FormatCurrency from "../../../helper/FormatCurrency.helper";
import MapTilerComponent from "../../test/Map/Map";

interface DetailShippingProps {
    order_id: number;
    setIsOpenDetail: (isOpen: boolean) => void;
    handleComplete: (stage: string) => Promise<boolean>;
}
const DetailShipping: React.FC<DetailShippingProps> = ({
    order_id,
    setIsOpenDetail,
    handleComplete,
}) => {
    const [order, setOrder] = useState<any>(null);
    const [customer, setCustomer] = useState<any>(null);
    const [detailOrder, setDetailOrder] = useState<any>(null);

    const [isStart, setIsStart] = useState(false);

    const handleDelivery = async () => {
        if (isStart) {
            const check = await handleComplete("Delivered");
            if (!check) {
                return;
            }
            setIsStart(false);
        } else {
            setIsStart(true);
        }
    };

    const fetchOrderData = async () => {
        const rs = await fetchOrder(order_id);
        const data = await fetchCustomerById(rs.user_id);
        const detailOrder = await fetchOrderItems(order_id);
        setOrder(rs);
        setCustomer(data);
        setDetailOrder(detailOrder);
    };
    useEffect(() => {
        fetchOrderData();
    }, []);

    return (
        <div
            onClick={() => setIsOpenDetail(false)}
            className={`fixed py-[50px] px-5 inset-0 z-30 w-screen h-screen bg-main-bg bg-opacity-75 flex justify-center items-center`}
        >
            {isStart && (
                <div
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                    className="z-40 fixed inset-0 "
                ></div>
            )}
            <div
                onClick={(event) => {
                    event.stopPropagation();
                }}
                className="w-[90%] h-[80%] z-50 overflow-y-auto scrollbar-hidden  bg-white rounded-xl px-5 "
            >
                <div className="p-5"></div>
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <div className="mb-2">
                    <span className="font-semibold">Order ID:</span> {order_id}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Customer Name:</span>{" "}
                    {customer?.fullName}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Shipping Address:</span>{" "}
                    {order?.address}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Phone number: </span>
                    {customer?.phone}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Order time: </span>
                    {GetTime(order?.delivery_time)}
                </div>

                <table className="w-full border px-2">
                    <thead>
                        <tr>
                            <th className="text-start">Product Name</th>
                            <th className="text-start">Quantity</th>
                            <th className="text-start">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detailOrder?.map((product: any, index: number) => (
                            <tr key={index}>
                                <td>{product.title}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mb-2 ">
                    <span className="text-[30px] font-bold">Total price: </span>
                    <span className="text-[20px] font-medium">
                        {FormatCurrency(order?.total_price)}
                    </span>
                </div>

                <div className="mt-4 gap-2 flex flex-col">
                    {isStart ? (
                        <>
                            <MapTilerComponent />
                            <button
                                onClick={handleDelivery}
                                className="px-4 py-2 w-full bg-green-500 text-white rounded hover:bg-green-700"
                            >
                                Complete Delivery
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleDelivery}
                                className="px-4 py-2 w-full bg-green-500 text-white rounded hover:bg-green-700"
                            >
                                Start Delivery
                            </button>
                            <button
                                onClick={() => setIsOpenDetail(false)}
                                className="px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-700"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DetailShipping;
