import Image from "next/image";

import logoPicture from "../public/assets/easymeal-logo.webp";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 mx-auto flex h-24 w-full flex-row items-center justify-center gap-4 bg-white/60 backdrop-blur-lg md:h-28 md:gap-6 lg:h-32 lg:gap-7 xl:h-36 2xl:h-48 2xl:gap-8">
      <Image
        src={logoPicture}
        alt="EasyMeal Logo"
        className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-16 xl:w-16"
      />
      <h1 className="text-xl font-semibold tracking-wide text-black-800 md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
        EasyMeal Account Deletion
      </h1>
    </header>
  );
}
