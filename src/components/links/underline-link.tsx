import * as React from "react";

import cn from "@/type/clsxm";
import UnstyledLink, { UnstyledLinkProps } from "./unstyled-link";

const UnderlineLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn("group transition-all duration-300 ease-in-out")}
      >
        <div
          className={cn(
            "flex items-center gap-2",
            "bg-left-bottom bg-gradient-to-r from-primary-400 to-primary-100 bg-[length:0%_2px]",
            "dark:from-quaternary-400 dark:to-quaternary-100",
            "text-xs",
            "bg-no-repeat group-hover:bg-[length:100%_2px]",
            "transition-all duration-500 ease-out",
            "text-primary-300 dark:text-tertiary-400"
          )}
        >
          {children}
        </div>
      </UnstyledLink>
    );
  }
);

export default UnderlineLink;
