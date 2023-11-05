import cn from "@/type/clsxm";
import * as React from "react";

const TypographyVariant = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "small2",
  "blockquote",
  "code",
  "lead",
  "large",
  "small",
  "muted",
] as const;

const TypographyColor = [
  "default",
  "muted",
  "danger",
  "black",
  "gradient",
] as const;

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  color?: (typeof TypographyColor)[number];
  variant?: (typeof TypographyVariant)[number];
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

type TypographyComponent = <T extends React.ElementType = "p">(
  props: TypographyProps<T>
) => React.ReactElement | null;

// @ts-ignore
const Typography: TypographyComponent = React.forwardRef(
  <T extends React.ElementType = "p">(
    {
      as,
      children,
      className,
      color = "default",
      variant = "p",
      ...rest
    }: TypographyProps<T>,
    ref?: React.ComponentPropsWithRef<T>["ref"]
  ) => {
    const Component = as || "p";
    return (
      <Component
        ref={ref}
        className={cn(
          [
            variant === "h1" && [
              "scroll-m-20 text-4xl font-[600] tracking-tight max-md:text-3xl",
            ],
            variant === "h2" && [
              "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ",
            ],
            variant === "h3" && [
              "scroll-m-20 text-2xl font-semibold tracking-tight",
            ],
            variant === "h4" && [
              "scroll-m-20 pb-2 text-lg font-[500] tracking-tight",
            ],
            variant === "p" && [
              "leading-none text-base font-[400] max-xs:text-sm",
            ],
            variant === "blockquote" && ["mt-6 border-l-2 pl-6 italic"],
            variant === "code" && [
              "relative w-fit rounded bg-brand-200 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
            ],
            variant === "large" && ["text-lg font-semibold"],
            variant === "lead" && ["text-xl"],
            variant === "small" && [
              "text-sm font-[400] leading-none max-sm:text-xs",
            ],
            variant === "small2" && [
              "text-[16px] font-[400] leading-8 max-sm:text-xs text-typography-200 dark:text-typography-800",
            ],
            variant === "muted" && ["text-sm text-typography-500"],
          ],
          [
            color === "default" && [
              "text-typography-100 dark:text-typography-800",
            ],
            color === "gradient" && [
              "bg-gradient-to-r from-primary-400 to-primary-100 bg-clip-text text-transparent dark:from-tertiary-400 dark:to-tertiary-300",
            ],
            color === "muted" && [
              "text-typography-300 dark:text-typography-600 leading-[16px]",
            ],
            color === "danger" && ["text-d-200"],
            color === "black" && ["text-typography-800"],
          ],

          "transition-colors duration-200",
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Typography;
