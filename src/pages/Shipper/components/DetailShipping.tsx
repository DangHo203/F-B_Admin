interface DetailShippingProps {
    order_id: number;
    setIsOpenDetail: (isOpen: boolean) => void;
}
const DetailShipping: React.FC<DetailShippingProps> = ({
    order_id,
    setIsOpenDetail,
}) => {
    return (
        <div
            onClick={() => setIsOpenDetail(false)}
            className="fixed py-[50px] px-5 inset-0 w-screen h-screen bg-main-bg bg-opacity-75 flex justify-center items-center"
        >
            <div
                onClick={(event) => {
                    event.stopPropagation();
                }}
                className="w-[90%] h-[80%] bg-white rounded-xl px-5"
            >
                <div className="p-5"></div>
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <div className="mb-2">
                    <span className="font-semibold">Order ID:</span> {order_id}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Customer Name:</span> John
                    Doe
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Shipping Address:</span> 123
                    Main St, Anytown, USA
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Phone number: </span>0997755884
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Order Date:</span>{" "}
                    2023-10-01
                </div>

                <div className="mt-4 gap-2 flex flex-col">
                    <button
                        onClick={() => setIsOpenDetail(false)}
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
                </div>
            </div>
        </div>
    );
};
export default DetailShipping;
