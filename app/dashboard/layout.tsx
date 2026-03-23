import DashboardLinks from "@/components/dashboard/DashboardLinks";
import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
    Sheet, 
    SheetContent, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger 
} from "@/components/ui/sheet";
import requiredUser from "@/hooks/requiredUser";
import { signOutAction } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { Menu, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// async function getUserData(id: string) {
//     const supabase = await createClient()

//     const { data: creator } = await supabase.from("creators")
//         .select("handle, platform, tier, niche, follower_count, engagement_rate, contract_status, rate, notes, full_name")
//         .eq("id", id)
//         .single()

//     if (!creator?.handle || !creator?.platform || !creator?.tier || !creator?.niche || !creator?.follower_count || !creator?.engagement_rate || !creator?.contract_status || !creator.rate || !creator?.notes || !creator?.full_name) {
//         redirect("/onboarding")
//     }
// }

export default async function layout({children}: { children: React.ReactNode}) {
  const user = await requiredUser();
  
  return (
    <>
      <div className="grid min-h-screen w-full md:gird-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex flex-col max-h-screen h-full gap-2">
            <div className="h-14 flex items-center border-b px-4 lg:h-15 lg:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/grangou-logo.png" alt="Logo" height={26} width={26} className=" rounded-md" />
                <p className="text-2xl font-bold text-soft-black">
                  Grangou
                </p>
              </Link>
            </div>
            <div className="flex-1"> {/** all the entrire space */}
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-15 lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <Menu className="size-5" />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>
                            Dashboard
                        </SheetTitle>
                    </SheetHeader>
                    <nav className="grid gap-2 mt-10">
                        <DashboardLinks />
                    </nav>
                </SheetContent>
            </Sheet>

            <div className="flex items-center ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full"
                    variant="outline"
                    size="icon"
                  >
                    <User2 />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{`${user.user_metadata.firstname} ${user.user_metadata.lastname}`}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form
                      className="w-full"
                      action={async () => {
                        "use server";
                        await signOutAction();
                      }}
                    >
                      <button className="w-full text-left">Log out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
