import clsx from "clsx";
import get from "lodash.get";
import * as React from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { IconType } from "react-icons";
import Typography from "../core/typography";

export type InputProps = {
  label?: string | null;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: React.HTMLInputTypeAttribute;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
  leftIcon?: IconType | string;
  leftIconLabel?: IconType | string;
  rightNode?: React.ReactNode;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<"input">;

export default function Input({
  label,
  placeholder = " ",
  helperText,
  id,
  type = "text",
  disabled,
  readOnly = false,
  hideError = false,
  validation,
  leftIcon: LeftIcon,
  leftIconLabel: LeftIconLabel,
  rightNode,
  containerClassName,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);
  return (
    <div className={containerClassName}>
      {label && (
        <div className="bg-d-600 flex w-fit px-3 py-1 border border-d-600 rounded-t-lg gap-2 items-center dark:bg-n-300 dark:border-n-200">
          {LeftIconLabel && <LeftIconLabel className="text-color-100" />}
          <Typography as="label" variant="p" className="block" htmlFor={id}>
            {label}
          </Typography>
        </div>
      )}
      <div className={clsx("relative")}>
        {LeftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {typeof LeftIcon === "string" ? (
              <Typography variant="p">{LeftIcon}</Typography>
            ) : (
              <LeftIcon className="text-d-600 dark:text-color-100" />
            )}
          </div>
        )}
        <input
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          readOnly={readOnly}
          disabled={disabled}
          className={clsx(
            "flex w-full  shadow-sm dark:bg-slate-700",
            label ? "rounded-tr-lg rounded-bl-lg rounded-br-lg" : "rounded-lg",
            "py-2 px-2",
            "border-gray-300",
            (readOnly || disabled) &&
              "cursor-not-allowed border-gray-300 bg-d-400 focus:border-gray-300 focus:ring-0 dark:bg-gray-400",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            LeftIcon && "pl-9",
            rightNode && "pr-10"
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />
        {rightNode && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-d-600 dark:text-color-100">
            {rightNode}
          </div>
        )}
      </div>
      {helperText && (
        <Typography variant="small" className="mt-2">
          {helperText}
        </Typography>
      )}
      {!hideError && error && (
        <Typography variant="small" color="danger" className="mt-2">
          {error?.message?.toString()}
        </Typography>
      )}
    </div>
  );
}
