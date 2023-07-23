import { useEffect, useState } from "react";
import MultipleListItem from "./MultipleListItem";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
interface MultipleListProps {
  options: Array<object>;
  name: string;
  className: string;
  clickEvent?: (event: any) => any;
  clickIconEvent?: (event: any) => any;
  showIcon?: boolean;
  hideValue?: boolean;
}

export default function MultipleList(props: MultipleListProps) {
  const {
    options,
    className,
    clickEvent,
    clickIconEvent,
    name,
    showIcon,
    hideValue,
  } = props;
  const [checkedItems, setCheckedItems] = useState(new Map());

  const handleCheckChange = (event) => {
    const itemId = event.target.value;
    const newCheckedItems = new Map(checkedItems);

    if (checkedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.set(itemId, []);
    }

    setCheckedItems(newCheckedItems);
  };

  useEffect(() => {
    if (clickEvent) clickEvent(checkedItems);
  }, [checkedItems, clickEvent]);

  return (
    <fieldset className={className}>
      <legend className="sr-only">Tokens</legend>
      <div className="space-y-5">
        {options && Array.isArray(options) && options.length > 0
          ? options.map((item, index) => (
              <MultipleListItem
                key={item.value + "-" + index}
                item={item}
                index={index}
                handleCheckChange={handleCheckChange}
                handleIconClick={clickIconEvent}
                name={name}
                showIcon={showIcon}
                hideValue={hideValue}
                checkedItems={checkedItems}
              />
            ))
          : null}
      </div>
    </fieldset>
  );
}
