import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string,
  subtitle?: string,
  textActionButton?: string
  action?: (...args: unknown[]) => void
}

export function ActionAlertDialog({
  open,
  setOpen,
  title = "Confirmar ação?",
  subtitle = "Essa ação não poderá ser desfeita, deseja realmente continuar?",
  textActionButton = "Confirmar",
  action
}: props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {subtitle}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={action}>{textActionButton}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}