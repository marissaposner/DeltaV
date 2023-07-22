import { Switch } from "@headlessui/react";
import { useState } from "react";
import { classNames } from "~/utils/common";

interface SwitchGroupButtonList {
  item: object;
  className: string;
  clickEvent: (param: any) => void;
  enable: boolean;
}

export default function SwitchGroupButton({
  item,
  className,
  clickEvent,
  enable,
}: SwitchGroupButtonList) {
  // const [selected, setSelected] = useState(plans[0]);
  const [enabled, setEnabled] = useState(enable);

  return (
    <Switch.Group
      as="div"
      className={classNames(className, "flex items-center justify-between")}
    >
      <span className="flex flex-grow flex-col">
        <Switch.Label
          as="span"
          className="text-sm leading-6 text-gray-900"
          passive
        >
          {item.name}
        </Switch.Label>
        {/* <Switch.Description as="span" className="text-sm text-gray-500">
          Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
        </Switch.Description> */}
      </span>
      <Switch
        checked={enabled}
        onChange={(e) => {
          setEnabled(e);
          clickEvent(item.value, enabled);
        }}
        className={classNames(
          enabled ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </Switch.Group>
  );
}
