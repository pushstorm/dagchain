import Image from "next/image";

const Logo = ({
  className,
  light,
}: {
  className?: string;
  light?: boolean;
}) => {
  return (
    <Image
      src={light ? "/logo/logo-white.png" : "/logo/logo.webp"}
      width={150}
      height={150}
      alt={"Dag-Chain Logo"}
      className={`size-auto ${className}`}
      loading="eager"
    />
  );
};

export default Logo;
