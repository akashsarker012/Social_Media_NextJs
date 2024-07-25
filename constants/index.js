import { IoHelpCircleOutline, IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { FcBusinessman } from "react-icons/fc";


export const sidebarLinks = [
    {
      imgURL: "/assets/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/assets/search.svg",
      route: "/search",
      label: "Search",
    },
    {
      imgURL: "/assets/heart.svg",
      route: "/activity",
      label: "Activity",
    },
    {
      imgURL: "/assets/create.svg",
      route: "/create-thread",
      label: "Create Thread",
    },
    {
      imgURL: "/assets/community.svg",
      route: "/communities",
      label: "Communities",
    },
    {
      imgURL: "/assets/user.svg",
      route: "/profile",
      label: "Profile",
    },
  ];
  
  export const profileTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "replies", label: "Replies", icon: "/assets/members.svg" },
    { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
  ];
  
  export const communityTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
  ];
  export const dropdown = [
    { value: "profile", label: "view profile", icon: <FcBusinessman className="w-5 h-5 mx-1"/> },
    { value: "Setting", label: "Setting", icon: <IoSettingsOutline className="w-5 h-5 mx-1"/> },
    { value: "Team", label: "Team", icon: <AiOutlineTeam className="w-5 h-5 mx-1"/> },
    { value: "Help", label: "Help", icon: <IoHelpCircleOutline className="w-5 h-5 mx-1"/> },
    { value: "Sign Out", label: "Sign Out", icon: <IoLogOutOutline className="w-5 h-5 mx-1"/> },
  ];