import { memo, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

type TitleSize = "sm" | "md" | "lg" | "xl";

interface SubPageLayoutProps {
  title: string;
  titleSize?: TitleSize;
  children: ReactNode;
}

const titleSizeMap: Record<TitleSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

function SubPageLayout({
  title,
  titleSize = "lg",
  children,
}: SubPageLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="fixed inset-x-0 top-0 z-20 bg-gray-extra-light">
        <div className="relative mx-auto flex h-14 max-w-md items-center justify-center px-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="absolute left-4 flex cursor-pointer items-center justify-center rounded-full bg-gray-extra-light text-gray-semi-dark "
          >
            <Icon icon="solar:alt-arrow-left-linear" width={20} height={20} />
          </button>

          <h1
            className={
              "font-extrabold tracking-tight text-gray-dark " +
              titleSizeMap[titleSize]
            }
          >
            {title}
          </h1>
        </div>
      </div>

      <div className="pt-12">{children}</div>
    </div>
  );
}

export default memo(SubPageLayout);
