import IconContainer from "./icon-container";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface StatCardProps {
  title: string
  value: number
  subtitle: string
  icon: React.ReactNode
  iconContainerClassName: string
  isLoading?: boolean
}

export default function StatCard({ title, value, subtitle, icon, iconContainerClassName, isLoading }: StatCardProps) {
  return (
    <Card className="rounded-2xl border-border/80 shadow-xs">
      <CardContent className="flex items-center gap-4 p-5">
        <IconContainer
          icon={icon}
          colors={iconContainerClassName}
        />
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-muted-foreground">
            {title}
          </p>
          {isLoading ? (
            <Skeleton className="my-1 h-7 w-12" />
          ) : (
            <p className="text-2xl font-bold tracking-tight text-foreground">
              {value}
            </p>
          )}
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  )
}