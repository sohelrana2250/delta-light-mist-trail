import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Modal({
  open,
  title,
  description,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40" />
        <Dialog.Content className="fixed inset-x-4 top-20 z-50 mx-auto max-h-[80vh] max-w-md overflow-y-auto rounded-3xl bg-surface p-5 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Dialog.Title className="text-lg font-extrabold">{title}</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">{description}</Dialog.Description>
            </div>
            <Dialog.Close className="grid size-10 shrink-0 place-items-center rounded-full bg-chip" aria-label="বন্ধ করুন">
              <X className="size-4" />
            </Dialog.Close>
          </div>
          <div className="mt-5">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
