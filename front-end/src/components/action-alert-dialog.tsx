import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CheckCircle2, TriangleAlert } from "lucide-react"
import React from "react"
import { cn } from "cn"

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  subtitle?: string
  textActionButton?: string
  action?: (...args: unknown[]) => void
  variant?: "destructive" | "success"
}

export function ActionAlertDialog({
  open,
  setOpen,
  title = "Confirmar ação?",
  subtitle = "Essa ação não poderá ser desfeita, deseja realmente continuar?",
  textActionButton = "Confirmar",
  action,
  variant = "destructive",
}: Props) {
  const isSuccess = variant === "success"

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-full max-w-md rounded-2xl p-6 sm:max-w-105">
        <div className="flex items-start gap-3.5">
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl border",
              isSuccess
                ? "border-emerald-200/80 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-400"
                : "border-red-200/80 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400"
            )}
          >
            {isSuccess ? (
              <CheckCircle2 className="size-5" />
            ) : (
              <TriangleAlert className="size-5" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <AlertDialogTitle className="text-base font-bold text-foreground tracking-tight">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed">
              {subtitle}
            </AlertDialogDescription>
          </div>
        </div>
        <AlertDialogFooter className="mt-6 flex flex-row items-center justify-end gap-3 sm:space-x-0">
          <AlertDialogCancel className="flex-1 rounded-xl h-10 text-sm font-medium border-border/80 hover:bg-muted">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={action}
            className={cn(
              "flex-1 rounded-xl h-10 text-sm font-medium shadow-sm text-white",
              isSuccess
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-red-600 hover:bg-red-700"
            )}
          >
            {textActionButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
