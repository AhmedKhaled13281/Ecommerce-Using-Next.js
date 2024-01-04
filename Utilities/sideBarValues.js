import { AiOutlineHome } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { RxBorderWidth } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";

export const sideBarValues = [
    {
        path : "/AdminDashboard",
        icon : AiOutlineHome,
        title : "Dashboard"
    },
    {
        path : "/Products",
        icon : FiShoppingBag,
        title : "Products"
    },
    {
        path : '/Categories',
        icon : TbCategory,
        title : 'Categories'
    },
    {
        path : '/Orders',
        icon : RxBorderWidth,
        title : 'Orders'
    },
    {
        path : '/Settings',
        icon : IoSettingsOutline,
        title : 'Settings'
    }
]