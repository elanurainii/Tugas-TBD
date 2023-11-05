import IconButton from "@/components/buttons/icon-button";
import UnstyledLink from "@/components/links/unstyled-link";

import { AiFillMail, AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="px-16 max-md:px-6 h-[20vh] text-center py-10  bg-primary-500">
      <section className="flex justify-center flex-col items-center gap-1">
        <div className="flex gap-2">
          <UnstyledLink href="mailto:elanuraini600@gmail.com">
            <IconButton variant="ghost" icon={AiFillMail} />
          </UnstyledLink>
          <UnstyledLink href="https://github.com/elanurainii">
            <IconButton variant="ghost" icon={AiFillGithub} />
          </UnstyledLink>
        </div>
      </section>
    </footer>
  );
}
