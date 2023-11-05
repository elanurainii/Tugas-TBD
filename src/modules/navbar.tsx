import { clsx } from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Howl } from "howler";
import Typography from "@/components/core/typography";

import { CiDark, CiSun } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

type userProps = {
  user: string;
};

export default function Navbar({ user }: userProps) {
  // const { setTheme, theme } = useTheme();
  // const [mounted, setMounted] = useState<boolean>(false);
  // const [sound] = useState(new Howl({ src: ["/click.wav"] }));
  // //----- Start Region Dark Mode -----//
  // const toggleTheme = () => {
  //   setTheme(theme === "dark" ? "light" : "dark");
  //   sound.play();
  // };
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) {
  //   return null;
  // }
  //----- End Region Dark Mode -----//
  return (
    <main
      className={clsx(
        "px-16 max-md:px-6 sticky top-0 z-10",
        "bg-primary-500",
        "dark:bg-quaternary-300 shadow-md"
      )}
    >
      <section>
        <div className="flex justify-end gap-2 items-center py-4">
          <FaRegUserCircle className="text-typography-100 dark:text-typography-800 text-lg translate-y-[2px]" />
          <Typography variant="p">{user}</Typography>
          {/* <button
            onClick={toggleTheme}
            className={clsx(
              "px-2.5 py-2 text-lg rounded-md hover:bg-primary-300 text-typography-100 ",
              "dark:hover:bg-tertiary-300 dark:text-typography-800",
              "transition-all duration-200 ease-in"
            )}
          >
            {theme === "dark" ? <CiSun /> : <CiDark />}
          </button> */}
        </div>
      </section>
    </main>
  );
}
