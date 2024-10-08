import path from "../utils/path";
import React from "react";

import {
    LiaChalkboardSolid,
    LiaAlgolia,
    LiaUserTieSolid,
    LiaUser,
    LiaClipboardListSolid,
    LiaBoxSolid,
    LiaLuggageCartSolid,
    LiaUsersCogSolid,
    LiaHistorySolid ,
    LiaBellSolid 
} from "react-icons/lia";

export const sideBarItems = [
    {
        id: 1,
        name: "Dashboard",
        link: path.home,
        icon: React.createElement(LiaChalkboardSolid),
    },
    {
        id: 2,
        name: "Staff",
        link: path.staff,
        icon: React.createElement(LiaUserTieSolid),
    },
    {
        id: 3,
        name: "Customer",
        link: path.customer,
        icon: React.createElement(LiaUser),
    },
    {
        id: 4,
        name: "Menu",
        link: path.menu,
        icon: React.createElement(LiaClipboardListSolid),
    },
    {
        id: 5,
        name: "Ingredient",
        link: path.ingredient,
        icon: React.createElement(LiaBoxSolid),
    },
    {
        id: 6,
        name: "Order",
        link: path.order,
        icon: React.createElement(LiaLuggageCartSolid),
    },

    {
        id: 7,
        name: "History",
        link: path.history,
        icon: React.createElement(LiaHistorySolid),
    },

    {
        id: 8,
        name: "Kitchen",
        link: path.kitchen,
        icon: React.createElement(LiaAlgolia),
    },
    {
        id: 9,
        name: "Notification",
        link: path.notification,
        icon: React.createElement(LiaBellSolid ),
    },
    {
        id: 10,
        name: "Profile",
        link: path.profile,
        icon: React.createElement(LiaUsersCogSolid),
    },
];
