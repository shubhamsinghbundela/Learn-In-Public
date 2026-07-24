import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { ReactNode } from "react";

interface CommonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: ReactNode;
  children: ReactNode;

  leftButton?: ReactNode;
  rightButton?: ReactNode;

  footer?: ReactNode;

  maxWidth?: string;
}

export default function CommonDialog({
  open,
  onOpenChange,

  title,
  children,

  leftButton,
  rightButton,

  footer,

  maxWidth = "sm:max-w-md",
}: CommonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${maxWidth} p-0`}>
        {/* Header */}
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="px-6 py-4">{children}</div>

        {/* Footer */}
        {footer ? (
          footer
        ) : (
          <div className="flex items-center justify-between border-t px-6 py-4">
            {leftButton}
            {rightButton}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
