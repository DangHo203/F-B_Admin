import {getAllStaffAPI} from "../../pages/Staff/staff.service";
export async function getAllStaff() {
    const res = await getAllStaffAPI();
    console.log(res?.data);
    return res?.data.data;
}