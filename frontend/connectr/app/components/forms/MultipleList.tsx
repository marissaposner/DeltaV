import { useEffect, useState } from "react";

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
  className: string;
  clickEvent?: (event: any) => any;
}

export default function MultipleList(props: MultipleListProps) {
  const { options, className, clickEvent } = props;
  const [checkedItems, setCheckedItems] = useState(new Set());

  const handleCheckChange = (event) => {
    const itemId = event.target.value;
    const newCheckedItems = new Set(checkedItems);

    if (checkedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
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
        {options
          ? options.map((item, index) => (
              <div className="relative flex items-start" key={index}>
                <div className="flex h-6 items-center">
                  <input
                    id={"listItem" + index}
                    aria-describedby="comments-description"
                    name="options"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    value={item.value}
                    checked={checkedItems.has(item.value)}
                    onChange={handleCheckChange}
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor={"listItem" + index}
                    className="font-medium text-gray-900"
                  >
                    {item.name}
                  </label>{" "}
                  <span
                    id={"listItem" + index + "-description"}
                    className="text-gray-500"
                  >
                    <span className="sr-only">{item.name} </span>
                    {item.value}
                  </span>
                </div>
              </div>
            ))
          : null}
      </div>
    </fieldset>
  );
}
