interface InputTextProps {
  name: string;
  placeholder: string;
  clickEvent?: (param: any) => void;
  inputType?: string;
}

export default function InputText(props: InputTextProps) {
  const { name, clickEvent, placeholder, inputType } = props;

  return (
    <input
      id={name}
      name={name}
      onKeyUp={(e) => {
        if (clickEvent) clickEvent(e.target.value);
      }}
      type={inputType ? inputType : "text"}
      placeholder={placeholder}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  );
}
