import { Icon } from "@iconify/react";
import Button from "../buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { memo } from "react";

interface AuthFormLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  linkLabel?: string;
  linkTo: string;
  linkName?: string;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  buttonLabel: string;
}

function AuthFormLayout({
  title,
  subtitle,
  children,
  linkLabel,
  linkTo,
  linkName,
  onSubmit,
  isLoading,
  buttonLabel,
}: AuthFormLayoutProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex items-stretch select-none text-gray-dark antialiased pt-2 md:pt-0">
      <section className="w-full flex flex-col justify-start items-center p-4 sm:p-14 bg-white">
        <form className="w-full max-w-md" onSubmit={onSubmit}>
          {/* Navigation Back Arrow */}
          <div className="mb-8 flex items-center justify-start">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-extra-light text-gray-light transition-colors hover:bg-gray-lightest hover:text-gray-normal cursor-pointer "
              aria-label="Go back"
            >
              <Icon icon="solar:alt-arrow-left-linear" width={20} height={20} />
            </button>
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-2 mb-8 text-left">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-dark">
              {title}
            </h1>
            <p className="text-base text-gray-semi-dark leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Input Stack (children) */}
          <div className="space-y-5">{children}</div>

          {/* Primary Action Button */}
          <div className="pt-5">
            <Button label={buttonLabel} htmlType="submit" loading={isLoading} />
          </div>

          {/* Alternative Account Redirection */}
          <p className="mt-8 text-sm text-gray-light text-center font-semibold">
            {linkLabel}{" "}
            <Link
              to={linkTo}
              className="underline underline-offset-3 hover:opacity-75 transition-opacity text-primary"
            >
              {linkName}
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default memo(AuthFormLayout);
