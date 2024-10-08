import { FiLogOut } from "react-icons/fi";
import NavBottom from "./components/NavBottom";
import { useState } from "react";
import ListOrders from "./components/ListOrder";
import Profile from "./components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/user.slice";
interface ShipperProps {}
const Shipper: React.FC<ShipperProps> = ({}) => {
    const [navChoose, setNavChoose] = useState<string>("Home");
    const {id} = useSelector((state: any) => state.userSlice);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <>
            <div className="w-full h-screen rounded-[20px] bg-white flex flex-col">
                <div className="fixed top-0 bg z-50 flex flex-row w-full h-[50px] justify-between items-center px-5">
                    <span className="text-[15px] font-semibold">
                        Welcome shipper!
                    </span>
                    <button onClick={handleLogout} className="ml-auto text-[30px] text-black rounded-md p-2">
                        <FiLogOut />
                    </button>
                </div>
                {navChoose === "Home" && <ListOrders />}
                {navChoose === "Profile" && <Profile id={id}/>}

                <NavBottom setNavChoose={setNavChoose} navchoose={navChoose} />
            </div>
        </>
    );
};
export default Shipper;
