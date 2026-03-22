"use client"

import { cn } from '@/lib/utils';
import { 
    HomeIcon, 
    PenSquare, 
    User, 
    BarChart3,
    Calendar
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const links = [
    {
        id: 0,
        name: "Dashboard",
        href: "/dashboard",
        icon: HomeIcon,
    },
    {
        id: 1,
        name: "Creator Profile",
        href: "/dashboard/profile",
        icon: User,
    },
    {
        id: 2,
        name: "Campaign",
        href: "/dashboard/campaign",
        icon: BarChart3,
    },
    {
        id: 3,
        name: "Post",
        href: "/dashboard/post",
        icon: PenSquare,
    },
    {
        id: 4,
        name: "Content Calendar",
        href: "/dashboard/calendar",
        icon: Calendar,
    },

];

export default function DashboardLinks() {
    const pathname = usePathname();
    // console.log(pathname)
    
  return (
    <>
        {links.map((link) => (
            <Link
                className={cn(
                    pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                )}
                href={link.href}
                key={link.id}
            >
                <link.icon className="size-4" />
                {link.name}
            </Link>
      ))}
    </>
  )
}
