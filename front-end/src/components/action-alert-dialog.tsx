import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { TriangleAlert } from "lucide-react"
import React from "react"

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  subtitle?: string
  textActionButton?: string
  action?: (...args: unknown[]) => void
}

export function ActionAlertDialog({
  open,
  setOpen,
  title = "Confirmar ação?",
  subtitle = "Essa ação não poderá ser desfeita, deseja realmente continuar?",
  textActionButton = "Confirmar",
  action,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-full max-w-md rounded-2xl p-6 sm:max-w-105">
        <div className="flex items-start gap-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-200/80 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400">
            <TriangleAlert className="size-5" />
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
            className="flex-1 rounded-xl h-10 text-sm font-medium bg-red-600 text-white hover:bg-red-700 shadow-sm"
          >
            {textActionButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}