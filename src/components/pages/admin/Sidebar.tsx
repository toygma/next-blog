"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  FileText,
  LayoutDashboard,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="fixed right-32">
          <Button variant="outline" className="md:hidden m-4">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <DashboardSidebar closeSheet={() => setIsOpen(false)} pathname={pathname} />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-full w-[250px] border-r bg-background">
        <DashboardSidebar pathname={pathname} />
      </div>
    </div>
  );
};

export default Sidebar;

function DashboardSidebar({
  closeSheet,
  pathname,
}: {
  closeSheet?: () => void;
  pathname: string;
}) {
  const links = [
    {
      href: "/admin/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/create",
      label: "Create",
      icon: FileText,
    },
    {
      href: "/admin/comments",
      label: "Comments",
      icon: MessageCircle,
    },
  ];

  return (
    <div className="min-h-full px-4 py-6 dark:bg-[#18181B]">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Link href={"/"}>
          <span className="text-xl font-bold">Toygma Admin Panel</span>
        </Link>
      </div>
      <nav className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link href={href} key={href}>
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                pathname === href ? "bg-muted" : ""
              }`}
              onClick={closeSheet}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
