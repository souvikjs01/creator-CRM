import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import SubmitButton from "@/components/loader/SubmitButton";
import { deleteCreatorById } from "@/lib/actions/creator";
import { AlertTriangle, UserX } from "lucide-react";
import { cn } from "@/lib/utils";

type Params = Promise<{ creatorId: string }>;

export default async function page({ params }: { params: Params }) {
  const { creatorId } = await params;

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen bg-background">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-125 h-125 rounded-full bg-[#E8272A]/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md px-4">
        {/* Floating icon above card */}
        <div className="flex justify-center -mb-px relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#E8272A]/20 rounded-full blur-xl scale-150" />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#E8272A]/10 border border-[#E8272A]/30 shadow-lg shadow-[#E8272A]/10">
              <UserX className="w-7 h-7 text-[#E8272A]" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <Card className="border border-white/6 bg-card/80 backdrop-blur-sm shadow-2xl shadow-black/40 overflow-hidden">
          {/* Top danger stripe */}
          <div className="h-px w-full bg-linear-to-r from-transparent via-[#E8272A]/60 to-transparent" />

          <CardHeader className="pt-8 pb-3 text-center">
            <CardTitle className="text-xl font-semibold tracking-tight text-foreground">
              Delete Creator
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm leading-relaxed mt-1.5">
              This action is permanent and cannot be undone. All data associated
              with this creator — campaigns, content, and analytics — will be
              erased.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-5">
            {/* Warning callout */}
            <div className="flex gap-3 items-start rounded-lg border border-[#E8272A]/20 bg-[#E8272A]/5 px-4 py-3">
              <AlertTriangle
                className="w-4 h-4 text-[#E8272A] mt-0.5 shrink-0"
                strokeWidth={2}
              />
              <p className="text-xs text-[#E8272A]/80 leading-relaxed">
                Creator ID{" "}
                <span className="font-mono font-semibold text-[#E8272A]">
                  #{creatorId.slice(0, 8)}…
                </span>{" "}
                will be permanently removed from your workspace.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex items-center gap-3 px-6 pb-7">
            <Link
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex-1 border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              )}
              href="/dashboard/creators"
            >
              Cancel
            </Link>

            <form
              className="flex-1"
              action={async () => {
                "use server";
                await deleteCreatorById(creatorId);
              }}
            >
              <SubmitButton
                text="Delete Creator"
              />
            </form>
          </CardFooter>

          {/* Bottom fade */}
          <div className="h-px w-full bg-linear-to-r from-transparent via-white/4 to-transparent" />
        </Card>

        {/* Subtle helper text */}
        <p className="text-center text-xs text-muted-foreground/40 mt-4">
          Changed your mind?{" "}
          <Link
            href="/dashboard/creators"
            className="text-muted-foreground/60 hover:text-muted-foreground underline-offset-2 hover:underline transition-colors"
          >
            Go back to Creators
          </Link>
        </p>
      </div>
    </div>
  );
}