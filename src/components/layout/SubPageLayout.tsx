// src/components/layout/SubPageLayout.tsx
import { memo, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface SubPageLayoutProps {
  title: string;
  children: ReactNode;
}

function SubPageLayout({ title, children }: SubPageLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative mb-8 flex items-center justify-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute left-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-semi-dark hover:bg-gray-extra-light"
        >
          <Icon icon="solar:alt-arrow-left-linear" className="h-6 w-6" />
        </button>

        <h1 className="text-lg font-extrabold tracking-tight text-gray-dark">
          {title}
        </h1>
      </div>

      {children}
    </div>
  );
}

export default memo(SubPageLayout);
