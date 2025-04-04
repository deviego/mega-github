import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-start w-full bg-black">
      <Link
        href="/"
        className="flex items-center gap-2 w-full container mx-auto py-5 px-4"
      >
          <Image
            src="/icons/Github-logo.svg"
            alt="github"
            width={124}
            height={30}
          />{" "}
          <span className="text-grayText font-light text-[16px] leading-[24px]">
            {" "}
            / Profile
          </span>
      </Link>
    </div>
  );
}
