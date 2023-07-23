interface InputTextAreaProps {
  name: string;
  placeholder: string;
  clickEvent?: (param: any) => void;
  value?: string;
  readOnly?: boolean;
  rows?: number;
}

export default function InputTextArea(props: InputTextAreaProps) {
  const { name, clickEvent, placeholder, value, readOnly, rows } = props;

  return (
    <textarea
      id={name}
      name={name}
      onKeyUp={(e) => {
        if (clickEvent) clickEvent(e.target.value);
      }}
      readOnly={readOnly ? readOnly : false}
      rows={rows}
      placeholder={placeholder}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      defaultValue={value}
    />
  );
}
