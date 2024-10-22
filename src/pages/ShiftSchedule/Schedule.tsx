//components
import SideBar from "../../components/commons/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShiftSchedulerCalendar from "./components/ShiftSchedulerCalendar";
import { IShift, IStaff } from "../../types/schedule.interface";
import "./css/calendar.css";
import FormAdd from "./components/FormAdd";

import { getShift } from "../../utils/Shift/shift.utils";
import { deleteShiftAPI } from "./schedule.service";
import { toast } from "react-toastify";

export default function Schedule() {
    const navigate = useNavigate();
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);

    const [shifts, setShifts] = useState<IShift[]>([]);
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
    const [list, setList] = useState<IShift[]>([]);

    const fetchShifts = async () => {
        const rs = await getShift();
        const rs2 = rs?.data.map((item: any) => {
            return {
                id: item.id,
                staffId: item.staffId,
                staffName: item.staffName,
                start: new Date(item.start),
                end: new Date(item.end),
                title: item.title,
            };
        });
        setList(rs2);
    };
    useEffect(() => {
        fetchShifts();
    }, [shifts]);

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
        sessionStorage.setItem("active", "1");
    }, []);

    const handleDeleteShift = async (shiftId: number) => {
       
        const response = await deleteShiftAPI(shiftId);
        if (response.status === 200) {
            fetchShifts();
            toast("Delete shift successfully", { type: "success" });
        } else {
            console.error("Failed to delete shift");
        }
    };

    return (
        <div className="w-screen h-screen grid grid-cols-6 grid-rows-12 bg-main-bg">
            {/* sidebar */}
            <SideBar />

            {/* content */}
            {isOpenForm && (
                <FormAdd
                    setOpenForm={setIsOpenForm}
                    shifts={shifts}
                    setShifts={setShifts}
                />  
            )}
            <div
                onClick={() => setIsOpenForm(true)}
                className=" cursor-pointer fixed flex items-center justify-center top-5 right-5 w-[200px] h-[50px] bg-sidebar rounded-xl hover:bg-blue-700 bg"
            >
                <span className="text-white">Add new schedule</span>
            </div>
            <div className="w-full h-full bg-main-bg col-span-5 row-span-12 flex items-center justify-center p-5">
                <ShiftSchedulerCalendar handleDeleteShift={handleDeleteShift} shifts={list} />
            </div>
        </div>
    );
}
