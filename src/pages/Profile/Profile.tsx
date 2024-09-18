//components
import SideBar from "../../components/commons/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format, parseISO, set } from "date-fns";
import Swal from "sweetalert2";
//MUI
import {
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
} from "@mui/material";
//apis
import { getUserByIdAPI, changePassword, editUserAPI } from "./profileService";

export default function Profile() {
    const navigate = useNavigate();
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);
    const _id = useSelector((state: any) => state.userSlice.id);

    const [isChangePassword, setIsChangePassword] = useState(false);
    const [isEditProfile, setIsEditProfile] = useState(false);

    const [oldPassword, setOldPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    //error
    const [isErrorOldPassword, setIsErrorOldPassword] = useState(false);
    const [isErrorNewPassword, setIsErrorNewPassword] = useState(false);
    const [isErrorConfirmPassword, setIsErrorConfirmPassword] = useState(false);
    const [isSamePassword, setIsSamePassword] = useState(false);
    const [isPhoneNumberExist, setIsPhoneNumberExist] = useState(false);
    const [isInvalidPhoneNumber, setIsInvalidPhoneNumber] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("male");
    const [selectedDate, setSelectedDate] = useState(
        new Date("2010-12-31").toISOString().slice(0, 10)
    );

    const resetForm = () => {
        setConfirmPassword("");
        setNewPassword("");
        setOldPassword("");
        setIsErrorConfirmPassword(false);
        setIsErrorNewPassword(false);
        setIsErrorOldPassword(false);
        setIsSamePassword(false);
    };
    const handleChange = (event: any) => {
        setGender(event.target.value);
    };
    const handleChangeDate = (event: any) => {
        setSelectedDate(event.target.value);
    };
    const handleUndo = () => {
        resetForm();
        setIsChangePassword(false);
    };
    const handleChangePassword = async () => {
        if (isChangePassword) {
            ///////////////validate password//////////////////////
            if (isErrorOldPassword) {
                setIsErrorOldPassword(false);
            }

            if (newPassword !== confirmPassword) {
                setIsErrorConfirmPassword(true);
                setConfirmPassword("");
                return;
            } else {
                setIsErrorConfirmPassword(false);
            }

            if (
                newPassword.length < 8 &&
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newPassword) ===
                    false
            ) {
                setConfirmPassword("");
                setIsErrorNewPassword(true);
                return;
            } else {
                setIsErrorNewPassword(false);
            }

            if (oldPassword === newPassword) {
                setConfirmPassword("");
                setIsSamePassword(true);
                return;
            } else {
                setIsSamePassword(false);
            }

            /////////////////////validate password/////////////////////

            const rs = await changePassword({
                email: email,
                oldPassword: oldPassword,
                newPassword: newPassword,
            });
            console.log(rs.status);
            if (rs.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Change password success",
                    showConfirmButton: false,
                    timer: 1000,
                }).then(() => {
                    resetForm();
                    setIsChangePassword(false);
                });
            } else if (rs.status === 401) {
                setIsErrorOldPassword(true);
            }
        } else {
            setIsChangePassword(true);
        }
    };

    const handleEdit = async () => {
        if (!isEditProfile) {
            setIsEditProfile(true);
            return;
        } else {
            if (isPhoneNumberExist) {
                setIsPhoneNumberExist(false);
            }
            if (phone.length !== 10 || !/^\d{10,}$/.test(phone)) {
                setIsInvalidPhoneNumber(true);
                return;
            } else {
                setIsInvalidPhoneNumber(false);
            }
            const data = {
                _id: _id,
                name: name,
                address: address,
                phoneNumber: phone,
                gender: gender === "female" ? "true" : "false",
                birth: selectedDate,
            };
            const rs = await editUserAPI(data);
            console.log("tttt", rs);
            if (rs.data?.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Edit successfully",
                }).then(() => {
                    setIsEditProfile(false);
                    setIsPhoneNumberExist(false);
                });
            } else if (rs?.data?.status === 401) {
                setIsPhoneNumberExist(true);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Edit failed",
                }).then(() => {});
            }
        }
    };

    const fetchUser = async () => {
        const rs = await getUserByIdAPI(_id);

        setName(rs?.data?.data[0]?.name);
        setEmail(rs?.data?.data[0]?.email);
        setPhone(rs?.data?.data[0]?.phoneNumber);
        setAddress(rs?.data?.data[0]?.address);
        setGender(rs?.data?.data[0]?.gender == "1" ? "female" : "male");
        setSelectedDate(
            rs?.data?.data[0]?.birth
                ? format(parseISO(rs?.data?.data[0]?.birth), "yyyy-MM-dd")
                : ""
        );
    };

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
        fetchUser();
        sessionStorage.setItem("active", "1");
    }, []);
    return (
        <div className="w-screen h-screen grid grid-cols-6 grid-rows-12 bg-slate-300">
            {/* sidebar */}
            <SideBar />

            {/* content */}
            <div className="w-full h-full bg-slate-300 col-span-5 row-span-11 p-2 flex justify-center items-center">
                <div className="w-1/2 h-auto bg-white rounded-md">
                    <div className="w-full h-[10%] flex justify-center items-center">
                        <span className="text-[30px] font-bold">Profile</span>
                    </div>
                    <div className="w-full h-[90%] flex justify-center items-center p-5">
                        <div className="w-full h-full flex flex-col justify-start items-start gap-1 ">
                            <div className="w-full h-[40px] flex justify-start items-center gap-3">
                                <span className="text-[15px] font-bold">
                                    Name:
                                </span>
                                <input
                                    type="text"
                                    value={name}
                                    className="border rounded-md"
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={!isEditProfile}
                                />
                            </div>
                            <div className="w-full h-[40px] flex justify-start items-center gap-3">
                                <span className="text-[15px] font-bold">
                                    Email:
                                </span>
                                <input
                                    type="text"
                                    value={email}
                                    className="border rounded-md"
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="w-full h-[40px] flex justify-start items-center gap-3">
                                <span className="text-[15px] font-bold">
                                    Phone:
                                </span>
                                <input
                                    type="text"
                                    value={phone}
                                    className="border rounded-md"
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={!isEditProfile}
                                />
                            </div>
                            {isPhoneNumberExist && (
                                <span className="text-red-500 text-[12px]">
                                    *Phone number already exists
                                </span>
                            )}
                            {isInvalidPhoneNumber && (
                                <span className="text-red-500 text-[10px]">
                                    *Phone number must be exactly 10 digits
                                </span>
                            )}
                            <div className="w-full h-[40px] flex justify-start items-center gap-3">
                                <span className="text-[15px] font-bold">
                                    Address:
                                </span>
                                <input
                                    type="text"
                                    value={address}
                                    className="border rounded-md w-full"
                                    onChange={(e) => setAddress(e.target.value)}
                                    disabled={!isEditProfile}
                                />
                            </div>
                            <FormControl disabled={!isEditProfile}>
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup
                                    defaultValue="male"
                                    name="radio-buttons-group"
                                    value={gender}
                                    onChange={handleChange}
                                    row
                                >
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                </RadioGroup>
                            </FormControl>

                            <div className="w-full h-[40px] flex  flex-row justify-start items-center gap-3">
                                <span className="text-[15px] font-bold">
                                    BirthDay
                                </span>
                                <input
                                    type="date"
                                    min={new Date("1980-01-01")
                                        .toISOString()
                                        .slice(0, 10)}
                                    max={new Date("2010-12-31")
                                        .toISOString()
                                        .slice(0, 10)}
                                    className=" border rounded-md"
                                    value={selectedDate}
                                    onChange={(e) => handleChangeDate(e)}
                                    form="yyyy"
                                    disabled={!isEditProfile}
                                />
                            </div>

                            {isChangePassword && (
                                <div className="w-full h-[40px] flex flex-row justify-start items-center gap-2">
                                    <span className="text-[15px] font-bold w-2/6">
                                        Old Password:
                                    </span>
                                    <input
                                        value={oldPassword}
                                        onChange={(e) =>
                                            setOldPassword(e.target.value)
                                        }
                                        type="password"
                                        className="border rounded-md w-4/6"
                                    />
                                </div>
                            )}
                            {isErrorOldPassword && (
                                <span className="text-red-500 text-[12px]">
                                    *Old password is incorrect
                                </span>
                            )}
                            {isChangePassword && (
                                <div className="w-full h-[40px] flex flex-row justify-start items-center gap-2">
                                    <span className="text-[15px] font-bold w-2/6">
                                        New Password:
                                    </span>
                                    <input
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        type="password"
                                        className="border rounded-md w-4/6"
                                    />
                                </div>
                            )}
                            {isErrorNewPassword && (
                                <span className="text-red-500 text-[10px]">
                                    *Password must contain at least 8
                                    characters, including uppercase, lowercase
                                    letters and numbers
                                </span>
                            )}
                            {isSamePassword && (
                                <span className="text-red-500 text-[10px]">
                                    *New password must be different from old
                                    password
                                </span>
                            )}
                            {isChangePassword && (
                                <div className="w-full h-[40px] flex flex-row justify-start items-center gap-2">
                                    <span className="w-2/6 text-[15px] font-bold">
                                        Confirm Password:
                                    </span>
                                    <input
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleChangePassword();
                                            }
                                        }}
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        type="password"
                                        className="border rounded-md w-4/6"
                                    />
                                </div>
                            )}
                            {isErrorConfirmPassword && (
                                <span className="text-red-500 text-[12px]">
                                    *Confirm password is not match
                                </span>
                            )}
                            {!isChangePassword && (
                                <button
                                    onClick={handleEdit}
                                    className="w-full h-[40px] mt-2 bg-blue-500 flex justify-center items-center rounded-xl text-white hover:bg-blue-300"
                                >
                                    <span className="text-[15px] font-bold">
                                        {isEditProfile
                                            ? "Save"
                                            : "Edit Profile"}
                                    </span>
                                </button>
                            )}
                            {!isEditProfile && (
                                <>
                                    <button
                                        onClick={handleChangePassword}
                                        className="w-full h-[40px] bg-blue-500 flex justify-center items-center rounded-xl text-white hover:bg-blue-300"
                                    >
                                        <span className="text-[15px] font-bold">
                                            {isChangePassword
                                                ? "Save"
                                                : "Change Password"}
                                        </span>
                                    </button>
                                    {isChangePassword && (
                                        <button
                                            onClick={handleUndo}
                                            className="w-full h-[40px] bg-gray-500 flex justify-center items-center rounded-xl text-white hover:bg-blue-300"
                                        >
                                            <span className="text-[15px] font-bold">
                                                Undo
                                            </span>
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
