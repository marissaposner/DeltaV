import { classNames } from "~/utils/common";

interface TitleProps {
  title: string;
  className: string;
  ctaTitle?: string;
  ctaAction?: (param: any) => any;
}

export function Title(props: TitleProps) {
  const { title, className, ctaAction, ctaTitle } = props;

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
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {ctaTitle}
            </button>
          </div>
        ) : null}
      </div>
      <hr className="mb-10" />
    </>
  );
}
