import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "cn"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

type ModalFormProps = {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function ModalForm({
  open,
  setOpen,
  title,
  subtitle,
  children,
  className,
}: ModalFormProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <DialogPrimitive.Popup
          className={cn(
            "fixed top-1/2 left-1/2 z-50 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-card p-6 shadow-2xl border border-border/70 transition duration-150 data-ending-style:opacity-0 data-ending-style:scale-95 data-starting-style:opacity-0 data-starting-style:scale-95",
            className
          )}
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-foreground tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <DialogPrimitive.Close
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-7 rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </Button>
              }
            />
          </div>

          <div>{children}</div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
