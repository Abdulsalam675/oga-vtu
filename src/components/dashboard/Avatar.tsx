import { memo } from "react";
import { Icon } from "@iconify/react";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  name?: string;
  profilePicture?: string;
  size?: AvatarSize;
  editable?: boolean;
  onEditClick?: () => void;
}

const sizeMap: Record<
  AvatarSize,
  { box: string; text: string; icon: string; pen: string }
> = {
  sm: {
    box: "h-10 w-10 text-sm",
    text: "text-sm",
    icon: "h-5 w-5",
    pen: "h-6 w-6",
  },
  md: {
    box: "h-14 w-14 text-lg",
    text: "text-lg",
    icon: "h-6 w-6",
    pen: "h-7 w-7",
  },
  lg: {
    box: "h-17 w-17 text-xl",
    text: "text-xl",
    icon: "h-7 w-7",
    pen: "h-7 w-7",
  },
  xl: {
    box: "h-24 w-24 text-3xl",
    text: "text-3xl",
    icon: "h-10 w-10",
    pen: "h-8 w-8",
  },
};

function Avatar({
  name,
  profilePicture,
  size = "md",
  editable = false,
  onEditClick,
}: AvatarProps) {
  const styles = sizeMap[size];
  const initial = name?.trim().charAt(0).toUpperCase() || null;

  return (
    <div className="relative inline-flex">
      {profilePicture ? (
        <img
          src={profilePicture}
          alt={name || "Profile"}
          className={`shrink-0 rounded-full object-cover font-extrabold ${styles.box}`}
        />
      ) : (
        <div
          className={`flex shrink-0 items-center justify-center rounded-full bg-primary/15 font-extrabold text-primary ${styles.box}`}
        >
          {initial ? (
            <span className={styles.text}>{initial}</span>
          ) : (
            <Icon icon="solar:user-bold" className={styles.icon} />
          )}
        </div>
      )}

      {editable && (
        <button
          type="button"
          onClick={onEditClick}
          aria-label="Change profile photo"
          className={`absolute bottom-0 right-0 flex cursor-pointer items-center justify-center rounded-full bg-primary text-white ${styles.pen}`}
        >
          <Icon icon="solar:pen-bold" className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export default memo(Avatar);
