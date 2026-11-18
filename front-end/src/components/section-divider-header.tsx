import { Separator } from "./ui/separator";

export function SectionDividerHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="shrink-0 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {title}
      </h2>
      <Separator className="flex-1" />
    </div>
  )
}