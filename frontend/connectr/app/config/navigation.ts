import {
    Cog6ToothIcon,
    LightBulbIcon,
    ArrowTrendingUpIcon,
    CommandLineIcon,
  } from "@heroicons/react/24/outline";

export const NAVIGATION_MENU = [
    { name: "Actions", href: "#", icon: ArrowTrendingUpIcon, current: true },
    { name: "Endpoints", href: "#", icon: CommandLineIcon, current: false },
  ];

  export const TEAMS_LIST = [
    { id: 1, name: "Get Started", href: "#", initial: "H", current: false, icon: LightBulbIcon },
    { id: 2, name: "Settings", href: "#", initial: "T", current: false, icon: Cog6ToothIcon },
  ];