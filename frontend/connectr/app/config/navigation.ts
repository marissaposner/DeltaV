import {
    Cog6ToothIcon,
    HomeIcon,
    UsersIcon,
  } from "@heroicons/react/24/outline";

export const NAVIGATION_MENU = [
    { name: "Actions", href: "#", icon: HomeIcon, current: true },
    { name: "Endpoints", href: "#", icon: UsersIcon, current: false },
  ];

  export const TEAMS_LIST = [
    { id: 1, name: "Get Started", href: "#", initial: "H", current: false, icon: Cog6ToothIcon },
    { id: 2, name: "Settings", href: "#", initial: "T", current: false, icon: Cog6ToothIcon },
  ];