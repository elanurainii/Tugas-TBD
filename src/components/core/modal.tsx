import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import cn from "@/type/clsxm";
import { ExtractProps } from "@/type/helper";

type ModalProps = {
  className?: string;
  children: React.ReactNode;

  modalContainerClassName?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: React.ReactNode;
  titleClassName?: string;
} & Omit<ExtractProps<typeof Dialog>, "onClose" | "unmount">;

export function ModalRoot({
  className,
  children,
  modalContainerClassName,
  open,
  setOpen,
  title,
  titleClassName,
  ...rest
}: ModalProps) {
  const containerRef = React.createRef<HTMLDivElement>();

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className={cn("fixed inset-0 z-9999 overflow-y-auto", className)}
        {...rest}
        onClose={setOpen}
        initialFocus={containerRef}
      >
        <div
          className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
          ref={containerRef}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={cn(
                "align inline-block transform rounded-lg bg-white  shadow-xl transition-all align-middle",
                "max-w-xl",
                modalContainerClassName
              )}
            >
              <div className="w-full">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function Section({
  className,
  children,
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex w-full flex-col px-6 py-3", className)}>
      {children}
    </div>
  );
}

const Modal = Object.assign(ModalRoot, { Section });
export default Modal;
