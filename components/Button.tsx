import { twMerge } from "tailwind-merge";
import { ComponentProps, PropsWithChildren } from "react";

export function Button({
  className,
  children,
  ...rest
}: PropsWithChildren<ComponentProps<"button">>) {
  return (
    <button
      className={twMerge("bg-[#70C1B3] mt-4 py-2 px-4 rounded-lg", className)}
      {...rest}
    >
      {children}
    </button>
  );
}
