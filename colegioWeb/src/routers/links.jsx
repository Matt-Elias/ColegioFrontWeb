import { IoMdChatboxes } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { SiHtmlacademy } from "react-icons/si";
import { IoTimerSharp } from "react-icons/io5";
import { FaUserCog } from "react-icons/fa";

const adminLinks = [
    {label: "Chats", icon: <IoMdChatboxes />, to: "/chats" },
    {label: "Eventos", icon: <MdEventNote />, to: "/Eventos"},
    {label: "GradosGrupos", icon: <MdGroups />, to: "/Grados"},
    {label: "Materias", icon: <FaBookBookmark /> , to: "/Materias"},
    {label: "Niveles", icon: <SiHtmlacademy />, to: "/Niveles"},
    {label: "Periodos", icon: <IoTimerSharp />, to: "/Periodos"},
    {label: "Usuarios", icon: <FaUserCog />, to: "/Usuarios"}
];

export {adminLinks};
