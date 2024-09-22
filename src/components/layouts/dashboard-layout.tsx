import { cn } from "@nextui-org/react";

type DashboardLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  sideComponent?: React.ReactNode;
  sideComponentClassName?: string;
  bodyClassName?: string;
  topComponent?: React.ReactNode;
};

export default function DashboardLayout({
  className,
  sideComponent,
  topComponent,
  sideComponentClassName,
  bodyClassName,
  children,
  ...props
}: DashboardLayoutProps) {
  return (
    <div className={cn("flex lg:h-screen", className)} {...props}>
      <div
        className={cn(
          "hidden p-3 pr-0 lg:block lg:!w-[100px] 2xl:!w-[300px]",
          sideComponentClassName,
        )}
      >
        {sideComponent}
      </div>
      {/* <div className={cn('lg:hidden', topComponentClassName)}>{topComponent}</div> */}
      <div
        className={cn(
          // 'flex flex-col py-3 lg:h-max lg:overflow-y-auto !flex-1 w-screen lg:w-auto',
          "flex h-screen w-screen !flex-1 flex-col overflow-y-auto py-3 lg:w-auto",

          bodyClassName,
        )}
      >
        {topComponent}
        {children}
      </div>
    </div>
  );
}
