import Button from "@/components/buttons/button";
import Modal from "@/components/core/modal";
import Typography from "@/components/core/typography";
import ButtonLink from "@/components/links/button-links";
import * as React from "react";

type ModalReturnType = {
  openModal: () => void;
};

export default function ExampleModal({
  children,
}: {
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title="Modal Title">
        <Modal.Section>
          <Typography variant="h4" className="text-start">
            Modal Heading
          </Typography>
          <span className="h-[2px] bg-d-100 w-full"> </span>
          <Typography variant="p" className="text-start">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            ex cumque assumenda! Nesciunt reiciendis dolores sit atque incidunt
            debitis repudiandae.
          </Typography>
        </Modal.Section>
        <Modal.Section>
          <div className="flex justify-end gap-2">
            <Button
              variant="primary"
              size="base"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
            <ButtonLink variant="primary" size="base" href="/">
              Continue
            </ButtonLink>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}
