import IconButton from "@/components/buttons/icon-button";
import { useRouter } from "next/router";

import { AiFillEdit } from "react-icons/ai";

type EditButtonProps = {
  id: string;
};

export default function EditButton({ id }: EditButtonProps) {
  const router = useRouter();
  return (
    <main>
      <IconButton
        icon={AiFillEdit}
        size="sm"
        onClick={() => {
          router.push(`/dashboard/update/${id}`);
        }}
      />
    </main>
  );
}
