import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button from "../../components/buttons/Button";

function BvnSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80dvh] flex-col bg-gray-extra-light px-4">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        {/* Success content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {/* Success icon */}
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-50">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
              <Icon
                icon="solar:check-circle-bold"
                className="h-22 w-22 text-emerald-600"
              />
            </div>
          </div>

          {/* Status badge */}
          <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5">
            <Icon
              icon="solar:check-circle-bold"
              className="h-3.5 w-3.5 text-emerald-600"
            />
            <span className="text-xs font-semibold text-emerald-700">
              Verification complete
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-gray-dark">
            BVN verified
          </h1>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-semi-dark">
            Your identity is confirmed. Return to the dashboard and tap{" "}
            <strong>Fund</strong> to see your virtual account details.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pb-8 pt-6">
          <Button
            label="Go to dashboard"
            htmlType="button"
            onClick={() => navigate("/dashboard", { replace: true })}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(BvnSuccessPage);
