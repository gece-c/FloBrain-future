import Image from "next/image";

import { LOGO_PUBLIC_PATH } from "@/lib/brand/constants";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "h-7 w-7" }: LogoProps) {
  return (
    <Image
      src={LOGO_PUBLIC_PATH}
      alt=""
      width={32}
      height={32}
      className={`logo-mark block shrink-0 object-contain object-center ${className}`}
      priority
    />
  );
}
