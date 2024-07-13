"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Newsop, CompleteNewsop } from "@/lib/db/schema/newsops";
import Modal from "@/components/shared/Modal";

import { useOptimisticNewsops } from "@/app/(app)/newsops/useOptimisticNewsops";
import { Button } from "@/components/ui/button";
import NewsopForm from "./NewsopForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (newsop?: Newsop) => void;

export default function NewsopList({
  newsops,
   
}: {
  newsops: CompleteNewsop[];
   
}) {
  const { optimisticNewsops, addOptimisticNewsop } = useOptimisticNewsops(
    newsops,
     
  );
  const [open, setOpen] = useState(false);
  const [activeNewsop, setActiveNewsop] = useState<Newsop | null>(null);
  const openModal = (newsop?: Newsop) => {
    setOpen(true);
    newsop ? setActiveNewsop(newsop) : setActiveNewsop(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeNewsop ? "Edit Newsop" : "Create Newsop"}
      >
        <NewsopForm
          newsop={activeNewsop}
          addOptimistic={addOptimisticNewsop}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticNewsops.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticNewsops.map((newsop) => (
            <Newsop
              newsop={newsop}
              key={newsop.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Newsop = ({
  newsop,
  openModal,
}: {
  newsop: CompleteNewsop;
  openModal: TOpenModal;
}) => {
  const optimistic = newsop.id === "optimistic";
  const deleting = newsop.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("newsops")
    ? pathname
    : pathname + "/newsops/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{newsop.id}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + newsop.id }>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No newsops
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new newsop.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Newsops </Button>
      </div>
    </div>
  );
};
