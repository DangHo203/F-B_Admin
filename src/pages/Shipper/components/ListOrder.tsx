import OrderCard from "./OrderCard";

interface ListOrdersProps {

}

const orders = [
    {
        order_id: 1,
        time: "2021-09-01 12:00:00",     
    },
    {
        order_id: 1,
        time: "2021-09-01 12:00:00",   
    },
    {
        order_id: 1,
        time: "2021-09-01 12:00:00",   
    },
    {
        order_id: 1,
        time: "2021-09-01 12:00:00",   
    },
    
    
]
const ListOrders: React.FC<ListOrdersProps> = ({
}) => {
    return (
        <div className="bg-main-bg w-full h-full px-5 pt-[50px] flex flex-col justify-start items-start overflow-y-auto gap-2">

            <div className="w-full justify-start items-start ">
                <span className="text-[25px] font-bold">Your orders</span>
            </div>
            <div className="overflow-y-auto scrollbar-hidden flex flex-col h-[80%] w-full gap-2">
                {orders.map((order, index) => {
                    return (
                        <OrderCard order_id={order.order_id} time={order.time}/>
                    )
                })}
            </div>
            
        </div>
    )
}
export default ListOrders;