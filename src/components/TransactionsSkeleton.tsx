import { memo } from "react";

function TransactionsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <ul className="overflow-hidden rounded-2xl bg-white">
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className={
            "flex items-center gap-3 px-4 py-3.5 " +
            (index !== count - 1 ? "border-b border-gray-lighter" : "")
          }
        >
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-lighter" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3 w-2/3 animate-pulse rounded bg-gray-lighter" />
            <div className="h-2.5 w-1/3 animate-pulse rounded bg-gray-lighter" />
          </div>
          <div className="shrink-0 space-y-2 text-right">
            <div className="ml-auto h-3 w-14 animate-pulse rounded bg-gray-lighter" />
            <div className="ml-auto h-2.5 w-10 animate-pulse rounded bg-gray-lighter" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default memo(TransactionsSkeleton);
