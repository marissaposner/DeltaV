import {
    Cog6ToothIcon,
    LightBulbIcon,
    ArrowTrendingUpIcon,
    CommandLineIcon,
  } from "@heroicons/react/24/outline";
import { AppRouting } from "~/utils/routes";

export const NAVIGATION_MENU = [
    { name: "Endpoints", icon: CommandLineIcon, current: true, href: AppRouting.ENDPOINTS },
    { name: "Actions", icon: ArrowTrendingUpIcon, current: false, href: AppRouting.ACTIONS },
  ];

  export const TEAMS_LIST = [
    { id: 1, name: "Get Started", href: "#", initial: "H", current: false, icon: LightBulbIcon },
    { id: 2, name: "Settings", href: "#", initial: "T", current: false, icon: Cog6ToothIcon },
  ];