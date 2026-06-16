import type { ReactNode } from "react";

type GridContainerProps = {
  children: ReactNode;
  className?: string;
};

export function GridContainer({ children, className = "" }: GridContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-4 md:px-6 lg:px-8 ${className}`}>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-8 md:gap-5 lg:grid-cols-12 lg:gap-6">{children}</div>
    </div>
  );
}
