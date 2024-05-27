import { ComponentProps, PropsWithChildren } from "react";

export function Button({
  className,
  children,
  ...rest
}: PropsWithChildren<ComponentProps<"button">>) {
  return (
    <button
      className={`bg-[#70C1B3] border-none mt-4 py-2 px-4 rounded-lg ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
