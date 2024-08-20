"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import LogoIcon from '../../icons/logo-icon';
// import LogoSmallIcon from '../../icons/logo-sm-icon';
import { cn, Tooltip } from "@nextui-org/react";
import SnapCarLogoIcon from "~/components/icons/snap-car-logo";
import { sidebarMenu } from "~/data/mock";

type LinkItemProps = {
  title: string;
  path: string;
  shouldHighlight: boolean;
  icon: any;
};

const SidebarComponent = () => {
  const pathname = usePathname();
  return (
    <div className="relative h-full items-start rounded-lg bg-black *:flex-col *:text-white">
      <div className="flex h-[inherit] flex-col items-center overflow-y-auto">
        <div className="mt-10 flex items-center justify-center gap-5">
          <div className="justify-center">
            <SnapCarLogoIcon className="lg:hidden 2xl:block" />
            {/* <LogoSmallIcon className='2xl:hidden' /> */}
          </div>
        </div>

        <div className="mt-20 flex w-3/4 flex-col items-center justify-center gap-2 2xl:items-start 2xl:justify-start">
          {sidebarMenu.map((item, index) => {
            const shouldHighlight = item.path === pathname;
            return (
              <LinkItem
                key={index}
                {...item}
                shouldHighlight={shouldHighlight}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const LinkItem = ({ ...props }: LinkItemProps) => {
  return (
    <Link
      key={props.title}
      href={props.path}
      role="button"
      className={cn(
        "rounded-4 flex items-center gap-x-2 rounded-md *:text-white 2xl:w-full 2xl:p-2",
        props.shouldHighlight
          ? "bg-[rgba(81,81,81,0.4)]"
          : "hover:bg-[rgba(255,255,255,0.15)] md:bg-[rgba(255,255,255,0.1)] 2xl:bg-transparent",
      )}
    >
      <Tooltip
        showArrow
        classNames={{ base: "hidden lg:block 2xl:hidden" }}
        placement="right-end"
        shadow="lg"
        className="cursor-pointer p-3"
        content={props.title}
      >
        <div className="flex size-[40px] items-center justify-center">
          {<props.icon size={20} className="text-white" />}
        </div>
      </Tooltip>
      <span className="font-medium lg:hidden 2xl:block">{props.title}</span>
    </Link>
  );
};

export default SidebarComponent;
