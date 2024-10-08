import { useState } from "react";
import DetailShipping from "./DetailShipping";

interface OrderCardProps {
    order_id: number;
    time: string;
}
const OrderCard: React.FC<OrderCardProps> = ({ order_id, time }) => {
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    
    return (
        <>
        {
            isOpenDetail && (
                <DetailShipping order_id={order_id} setIsOpenDetail={setIsOpenDetail}/>
            )
        }
            <div onClick={()=>setIsOpenDetail(true)} className="text-[20px] px-5 flex flex-row justify-around rounded-[30px] items-center w-full min-h-[150px] h-[150px] bg-blue-200 text-black">
                <span>#{order_id}</span>
                <span className="text-[15px] font-light">{time}</span>
            </div>
        </>
    );
};
export default OrderCard;
