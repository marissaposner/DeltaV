import { useNavigation } from "@remix-run/react";
import { classNames } from "~/utils/common";

interface TitleProps {
  title: string;
  className: string;
  ctaTitle?: string;
  ctaType?: string;
  ctaAction?: (param: any) => any;
}

export function Title(props: TitleProps) {
  const { title, className, ctaAction, ctaTitle, ctaType } = props;
  const navigation = useNavigation();

  return (
    <>
      <div
        className={classNames(
          "md:flex md:items-center md:justify-between",
          className
        )}
      >
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
        </div>
        {ctaTitle ? (
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <button
              onClick={ctaAction}
              type={ctaType ? ctaType : "button"}
              className={classNames(
                "ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                navigation.state === "submitting"
                  ? "bg-gray-400 pointer-events-none"
                  : "bg-indigo-600 hover:bg-indigo-700"
              )}
            >
              {navigation.state === "submitting" ? "Saving" : ctaTitle}
            </button>
          </div>
        ) : null}
      </div>
      <hr className="mb-10" />
    </>
  );
}
