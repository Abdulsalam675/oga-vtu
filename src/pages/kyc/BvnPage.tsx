import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import SubPageLayout from "../../components/layout/SubPageLayout";
import Button from "../../components/buttons/Button";
import { useUser } from "../../context/UserContext";
import { bvnSchema } from "../../schemas/authSchemas";

function BvnPage() {
  const navigate = useNavigate();
  const { patchUser } = useUser();

  const [formData, setFormData] = useState({ bvn: "", dateOfBirth: "" });
  const [errors, setErrors] = useState({ bvn: "", dateOfBirth: "" });
  const [isLoading, setIsLoading] = useState(false);

  const canSubmit =
    formData.bvn.length === 11 && formData.dateOfBirth.length > 0;

  function handleBvnChange(value: string) {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    setFormData((prev) => ({ ...prev, bvn: cleaned }));
    setErrors((prev) => ({ ...prev, bvn: "" }));
  }

  function handleDateChange(value: string) {
    setFormData((prev) => ({ ...prev, dateOfBirth: value }));
    setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
  }

  function handleVerify() {
    if (isLoading) return;

    const result = bvnSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        bvn: fieldErrors.bvn?.[0] ?? "",
        dateOfBirth: fieldErrors.dateOfBirth?.[0] ?? "",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      patchUser({ BvnVerified: true });
      setIsLoading(false);
      navigate("/dashboard/bvn/success", { replace: true });
    }, 1500);
  }

  return (
    <SubPageLayout title="Verify BVN" titleSize="sm">
      <div className="space-y-7">
        <p className="text-sm leading-relaxed text-gray-semi-dark">
          Enter your BVN and date of birth to complete verification.
        </p>

        {/* Name match warning */}
        <div className="flex gap-3 rounded-2xl bg-amber-50 px-4 py-3.5">
          <Icon
            icon="solar:danger-triangle-bold"
            className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
          />
          <div>
            <p className="text-xs font-semibold text-amber-900">
              Make sure your names match
            </p>
            <p className="mt-1 text-xs leading-relaxed text-amber-800">
              The name on your BVN must match your registered OGA profile name.
              Contact support if you need to change your name.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* BVN */}
          <div>
            <label
              htmlFor="bvn"
              className="mb-2 block text-xs font-semibold text-gray-dark"
            >
              BVN number
            </label>
            <div className="relative">
              <Icon
                icon="solar:card-linear"
                width={22}
                height={22}
                className="pointer-events-none absolute left-4 top-1/2  -translate-y-1/2 text-gray-light"
              />
              <input
                id="bvn"
                name="bvn"
                type="tel"
                inputMode="numeric"
                placeholder="Enter your 11-digit BVN"
                value={formData.bvn}
                maxLength={11}
                autoComplete="off"
                onChange={(e) => handleBvnChange(e.target.value)}
                className={
                  "w-full rounded-full bg-gray-lightest py-3.5 pl-12 pr-16 text-base placeholder:text-sm font-medium tracking-wider text-gray-semi-dark outline-none transition-all placeholder:tracking-normal placeholder:text-gray-light border " +
                  (errors.bvn
                    ? "border-error"
                    : "border-transparent focus:border-primary")
                }
              />
              {formData.bvn.length > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semin text-gray-normal">
                  {formData.bvn.length}/11
                </span>
              )}
            </div>
            {errors.bvn && (
              <p className="mt-1.5 text-xs text-error">{errors.bvn}</p>
            )}
          </div>

          {/* Date of birth */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="mb-2 block text-xs font-medium text-gray-dark"
            >
              Date of birth
            </label>
            <div className="relative">
              <Icon
                icon="solar:calendar-linear"
                width={22}
                height={22}
                className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-light"
              />

              {!formData.dateOfBirth && (
                <span className="pointer-events-none absolute left-12 top-1/2 z-10 -translate-y-1/2 text-sm text-gray-light">
                  DD / MM / YYYY
                </span>
              )}

              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => handleDateChange(e.target.value)}
                className={
                  "w-full appearance-none rounded-full bg-gray-lightest py-3.5 pl-12 pr-4 text-base placeholder:text-sm font-medium outline-none transition-all border [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 " +
                  (formData.dateOfBirth
                    ? "text-gray-semi-dark"
                    : "text-transparent") +
                  " " +
                  (errors.dateOfBirth
                    ? "border-error"
                    : "border-transparent focus:border-primary")
                }
              />
            </div>
            {errors.dateOfBirth && (
              <p className="mt-1.5 text-xs text-error">{errors.dateOfBirth}</p>
            )}
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-start gap-2.5">
          <Icon
            icon="solar:lock-keyhole-linear"
            className="mt-0.5 h-4 w-4 shrink-0 text-gray-light"
          />
          <p className="text-xs leading-relaxed text-gray-light">
            Your information is used only to verify your identity.
          </p>
        </div>

        {/* CTA */}
        <Button
          label={isLoading ? "Verifying..." : "Verify BVN"}
          htmlType="button"
          disabled={!canSubmit || isLoading}
          onClick={handleVerify}
        />
      </div>
    </SubPageLayout>
  );
}

export default memo(BvnPage);
