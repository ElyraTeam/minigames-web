'use client';

import * as React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      `
        fixed inset-0 z-99998 bg-black/60
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=open]:animate-in data-[state=open]:fade-in-0
      `,
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps extends DialogPrimitive.DialogContentProps {
  closeClassName?: string;
  hideCloseButton?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, closeClassName, hideCloseButton, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        `
          bg-background fixed top-[50%] left-[50%] z-99999 grid w-fit
          translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border p-6
          pt-16 shadow-lg duration-200
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=closed]:zoom-out-95
          data-[state=open]:animate-in data-[state=open]:fade-in-0
          data-[state=open]:zoom-in-95
        `,
        className
      )}
      {...props}
    >
      {children}
      {!hideCloseButton && (
        <DialogPrimitive.Close
          className={cn(
            `
              absolute top-4 right-4 rounded-sm opacity-70 transition-all
              outline-none
              hover:text-danger hover:opacity-100
              disabled:pointer-events-none
            `,
            closeClassName
          )}
        >
          <IoCloseCircleOutline className="size-9" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
        flex flex-col space-y-1.5 text-center
        sm:text-left
      `,
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
        flex flex-col-reverse
        sm:flex-row sm:justify-end sm:space-x-2
      `,
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg leading-none font-semibold tracking-tight',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
