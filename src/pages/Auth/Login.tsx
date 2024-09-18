import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { loginAPI } from "./authServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import path from "../../ultils/path";

//redux
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";

import swal from "sweetalert2";

export default function Login() {
    const navigate = useNavigate();
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        const rs: AxiosResponse<any> = await loginAPI(username.trim(), password.trim());
        console.log("hi",rs);
        const { status } = rs;
        console.log(status);
        if (rs?.status === 200) {
            dispatch(
                login({
                    token: rs?.data?.data.token,
                    id: rs?.data?.data.user._id,
                })
            );

            swal.fire({
                icon: "success",
                title: "Login success",
            }).then(() => {
                navigate(path.home);
            });
        } else if (status === 400) {
            swal.fire({
                icon: "error",
                title: "Login failed",
                text: "Email is not exist",
            });
        } else if (status === 401) {
            swal.fire({
                icon: "error",
                title: "Login failed",
                text: "Password is incorrect",
            });
        } else if (status === 402) {
            swal.fire({
                icon: "error",
                title: "Login failed",
                text: "You are not allowed to login",
            });
        } 
    };

    useEffect(() => {
        if (isLogin) {
            navigate(path.home);
        }
    }, []);

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-300">
            <div className="rounded-[30px] px-[50px] w-1/3 h-1/2 bg-white flex flex-col justify-center items-center gap-5">
                <span className="text-[30px] font-bold">Login</span>

                <div className="w-full flex flex-col justify-start">
                    <span>Email</span>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        type="text"
                        placeholder="Enter your Username"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="w-full flex flex-col justify-start">
                    <span>Password</span>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="Password"
                        type="password"
                        placeholder="Enter your Password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                    />
                </div>
                <div
                    onClick={handleSubmit}
                    className="text-white hover:bg-blue-200 w-1/2 h-[50px] bg-blue-500 flex justify-center items-center rounded-md"
                >
                    Login
                </div>
                <span>
                    Doesn't have an account,{" "}
                    <a href={path.register} className=" font-bold">
                        Register
                    </a>{" "}
                </span>
            </div>
        </div>
    );
}
