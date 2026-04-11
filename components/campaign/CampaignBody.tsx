import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal } from "lucide-react";
import Link from "next/link";

type Creator = {
  name: string;
  handle: string;
  platform: string;
  reach: string;
};

type TimelineEvent = {
  date: string;
  event: string;
};

type CampaignStatus = "active" | "planned" | "completed" | "paused";

type Campaign = {
  id: number;
  name: string;
  goal: string;
  status: CampaignStatus;
  creators: Creator[];
  budget: number;
  spend: number;
  reach: string;
  conv: number;
  cpa: number;
  roi: string;
  roiDir: "pos" | "neu" | "neg";
  start: string;
  end: string;
  progress: number;
  notes: string;
  timeline: TimelineEvent[];
};


// ─── Mock data ────────────────────────────────────────────────────────────────
const campaigns : Campaign[] = [
  {
    id: 1,
    name: "LA Launch Blitz",
    goal: "Installs",
    status: "active",
    creators: [
      { name: "Tom Wick", handle: "@tommyla", platform: "TikTok", reach: "480K" },
      { name: "Emily Watson", handle: "@emilyinparis", platform: "Instagram", reach: "310K" },
    ],
    budget: 6000,
    spend: 4200,
    reach: "790K",
    conv: 1820,
    cpa: 2.31,
    roi: "+38%",
    roiDir: "pos",
    start: "Mar 10, 2026",
    end: "Apr 15, 2026",
    progress: 70,
    notes:
      "LA-first push targeting Gen Z diners. TikTok skewing 2× better than IG Reels on installs. Consider shifting remaining budget to TikTok.",
    timeline: [
      { date: "Mar 10", event: "Campaign launched" },
      { date: "Mar 22", event: "Mid-point check — on track" },
      { date: "Apr 15", event: "Campaign ends" },
    ],
  },
  {
    id: 2,
    name: "Foodie Fridays",
    goal: "Awareness",
    status: "active",
    creators: [
      { name: "Alex Kar", handle: "@alex01", platform: "Instagram", reach: "190K" },
      { name: "Mark Todd", handle: "@mrktdd", platform: "Instagram", reach: "95K" },
    ],
    budget: 4000,
    spend: 1800,
    reach: "285K",
    conv: 410,
    cpa: 4.39,
    roi: "+12%",
    roiDir: "pos",
    start: "Mar 25, 2026",
    end: "May 2, 2026",
    progress: 30,
    notes:
      "Weekly recurring series — every Friday. Content cadence is on schedule. Need caption approval for Apr 4 drop.",
    timeline: [
      { date: "Mar 25", event: "Series kick-off" },
      { date: "Apr 4", event: "Week 2 post (pending approval)" },
      { date: "May 2", event: "Series wraps" },
    ],
  },
  {
    id: 3,
    name: "Spring Collab Drop",
    goal: "Sign-ups",
    status: "planned",
    creators: [
      { name: "Tom Wick", handle: "@tommyla", platform: "TikTok", reach: "—" },
    ],
    budget: 5500,
    spend: 0,
    reach: "—",
    conv: 0,
    cpa: 0,
    roi: "—",
    roiDir: "neu",
    start: "Apr 20, 2026",
    end: "May 20, 2026",
    progress: 0,
    notes:
      "Restaurant partner collab TBD — pending outreach to 3 LA restaurants. Budget not yet confirmed.",
    timeline: [
      { date: "Apr 10", event: "Contracts signed (target)" },
      { date: "Apr 20", event: "Campaign goes live" },
      { date: "May 20", event: "End date" },
    ],
  },
  {
    id: 4,
    name: "Valentine's Week",
    goal: "Installs",
    status: "completed",
    creators: [
      { name: "Emily Watson", handle: "@emilyinparis", platform: "Instagram", reach: "340K" },
      { name: "Alex Kar", handle: "@alex01", platform: "Instagram", reach: "205K" },
    ],
    budget: 3200,
    spend: 3200,
    reach: "545K",
    conv: 960,
    cpa: 3.33,
    roi: "+27%",
    roiDir: "pos",
    start: "Feb 7, 2026",
    end: "Feb 16, 2026",
    progress: 100,
    notes:
      "Completed. Strong conversion on Reels format. Emily outperformed benchmark by 2.4×. Good reference for future seasonal campaigns.",
    timeline: [
      { date: "Feb 7", event: "Campaign launched" },
      { date: "Feb 14", event: "Valentine's Day peak post" },
      { date: "Feb 16", event: "Campaign completed" },
    ],
  },
];

const TABS = ["all", "active", "planned", "completed"];

const STATUS_CLASSES :  Record<CampaignStatus, string>  = {
  active: "bg-[#E8283A] text-white hover:bg-[#E8283A]",
  planned: "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-50",
  completed: "bg-green-50 text-green-700 border-green-100 hover:bg-green-50",
  paused: "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-50",
};

function StatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <Badge className={STATUS_CLASSES[status] ?? STATUS_CLASSES.planned}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

function SpendProgress({ value }: { value : number }) {
  return (
    <div className="w-24">
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-[#E8283A] transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-[11px] text-muted-foreground mt-1">{value}% spent</p>
    </div>
  );
}

function CampaignSheet({
  campaign,
  open,
  onOpenChange,
}: {
  campaign: Campaign | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-105 sm:max-w-105 overflow-y-auto">
        {campaign && (
          <div className="flex flex-col gap-5 mt-4">
            <SheetHeader>
              <SheetTitle>{campaign.name}</SheetTitle>
              <p className="text-sm text-muted-foreground">
                {campaign.goal} · {campaign.start} → {campaign.end}
              </p>
            </SheetHeader>

            <Separator />

            {/* Performance */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Performance
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { val: campaign.reach, lbl: "Total reach" },
                  { val: campaign.conv > 0 ? campaign.conv.toLocaleString() : "—", lbl: "Conversions" },
                  { val: `$${campaign.spend.toLocaleString()}`, lbl: "Spend to date" },
                  { val: campaign.cpa > 0 ? `$${campaign.cpa.toFixed(2)}` : "—", lbl: "Cost per acq." },
                ].map(({ val, lbl }) => (
                  <div key={lbl} className="bg-muted rounded-lg p-3">
                    <p className="text-lg font-medium">{val}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Creators */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Creators involved
              </p>
              {campaign.creators.map((c) => (
                <div
                  key={c.handle}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.handle} · {c.platform}
                    </p>
                  </div>
                  <p className="text-sm">{c.reach}</p>
                </div>
              ))}
            </div>

            <Separator />

            {/* Timeline */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Timeline
              </p>
              {campaign.timeline.map((t) => (
                <div key={t.date} className="flex gap-3 items-start py-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#E8283A] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm">{t.event}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Notes */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Notes
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{campaign.notes}</p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CampaignBody() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-medium text-soft-black">Campaigns</h1>
          {/* <p className="text-sm text-muted-foreground mt-0.5">
            {campaigns.length} campaigns · {campaigns.filter((c) => c.status === "active").length} active
          </p> */}

          <p className="text-sm text-muted-foreground mt-0.5">
            10 campaigns · 5 active
          </p>
        </div>
        <Link
            href="/dashboard/campaign/create"
            className={buttonVariants()}
        >
          <Plus className="w-4 h-4" />
          New campaign
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "TOTAL CAMPAIGNS", value: "4", sub: "2 active" },
          { label: "TOTAL SPEND", value: "$18,400", sub: "Q2 to date" },
          { label: "AVG CPA", value: "$4.20", sub: "cost per acquisition" },
          { label: "TOTAL REACH", value: "2.4M", sub: "combined impressions" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-muted rounded-lg p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
              {label}
            </p>
            <p className="text-2xl font-medium">{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl bg-background overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Creators</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Reach</TableHead>
              <TableHead>Conv.</TableHead>
              <TableHead>CPA</TableHead>
              <TableHead>ROI</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
                //   key={c.id}
                className="cursor-pointer"
            >
                  <TableCell className="font-medium">name</TableCell>
                  <TableCell>
                    <StatusBadge status="active" />
                  </TableCell>
                  <TableCell className="text-muted-foreground">goal</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="font-normal">
                          name
                        </Badge>
                    </div>
                  </TableCell>
                  <TableCell>$1000</TableCell>
                  <TableCell>reach</TableCell>
                  <TableCell>{"—"}</TableCell>
                  <TableCell>{"—"}</TableCell>
                  <TableCell>
                    roi
                  </TableCell>
                  <TableCell>
                    <SpendProgress value={10} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}