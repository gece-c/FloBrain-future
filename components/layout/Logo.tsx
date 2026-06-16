import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "h-7 w-7" }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={32}
      height={32}
      className={`shrink-0 rounded-md object-contain ${className}`}
      priority
    />
  );
}
