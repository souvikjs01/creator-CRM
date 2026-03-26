"use client";

import { Badge } from "@/components/ui/badge";
import { 
    Button, 
    buttonVariants 
} from "@/components/ui/button";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs";
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import {
  Instagram,
  Youtube,
  ExternalLink,
  Mail,
  Phone,
  MessageCircle,
  Users,
  Heart,
  FileText,
  Edit,
  Star,
  Calendar,
  DollarSign,
  Package,
  Clock,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Trash2,
} from "lucide-react";
import { Creator } from "@/lib/actions/creator";
import { TikTokIcon } from "./TiktokIcon";
import Link from "next/link";
import { cn, formatFollower } from "@/lib/utils";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const creator = {
  id: "cr_001",
  name: "Maya Chen",
  handle: "@mayachen",
  avatar: "https://i.pravatar.cc/150?img=47",
  bio: "LA-based Gen-Z creator documenting fusion cuisine, honest restaurant reviews, and home cook experiments for a Gen Z audience.",
  niche: "Food",
  tier: "Micro",
  contractStatus: "Active",
  preferredComms: "Email",
  email: "maya@talentco.agency",
  phone: "+1 (212) 555-0182",
  rep: {
    name: "Jordan Ellis",
    agency: "TalentCo Agency",
    email: "jordan@talentco.agency",
  },
  platform: {
    name: "Instagram",
    handle: "@mayachen",
    url: "https://instagram.com/mayachen",
    followers: 84200,
    engagementRate: 4.7,
    avgLikes: 3120,
    avgComments: 278,
    avgShares: 412,
  },
  contract: {
    start: "Jan 15, 2025",
    end: "Dec 31, 2025",
    value: "$18,400",
    type: "Flat Fee",
    deliverables: [
      "2× Instagram Reels / month",
      "1× Carousel post / month",
      "Story mentions (4× / month)",
    ],
  },
  engagementHistory: [
    { month: "Aug", rate: 4.1, likes: 2800, comments: 210 },
    { month: "Sep", rate: 4.5, likes: 3050, comments: 240 },
    { month: "Oct", rate: 4.3, likes: 2950, comments: 225 },
    { month: "Nov", rate: 5.1, likes: 3600, comments: 310 },
    { month: "Dec", rate: 4.9, likes: 3400, comments: 295 },
    { month: "Jan", rate: 4.7, likes: 3120, comments: 278 },
  ],
  followerGrowth: [
    { month: "Aug", followers: 76000 },
    { month: "Sep", followers: 78200 },
    { month: "Oct", followers: 79800 },
    { month: "Nov", followers: 81500 },
    { month: "Dec", followers: 83100 },
    { month: "Jan", followers: 84200 },
  ],
  campaigns: [
    { name: "Grub Hub Fall Drop", status: "Completed", date: "Oct 2024", result: "+12% reach" },
    { name: "Oat Milk NYC Launch", status: "Completed", date: "Nov 2024", result: "3× story taps" },
    { name: "Winter Feast Collab", status: "Active", date: "Jan 2025", result: "In progress" },
  ],
  notes: `Maya is incredibly professional — always delivers on time and never needs more than one round of revisions. She responds best to detailed creative briefs but appreciates latitude on execution style.

Great personality match for food-adjacent brands targeting 18–28 demographic. Past collab feedback from Oat Milk NYC was outstanding — she drove 3× the estimated story taps.

Note: She won't promote alcohol, fast food chains, or content involving filters that alter body image.`,
};

// ─── Chart configs ────────────────────────────────────────────────────────────

const engagementConfig = {
  rate: { label: "Engagement %", color: "#E8272A" },
} satisfies ChartConfig;

const likesCommentsConfig = {
  likes: { label: "Likes", color: "#E8272A" },
  comments: { label: "Comments", color: "#6b7280" },
} satisfies ChartConfig;

const followerConfig = {
  followers: { label: "Followers", color: "#E8272A" },
} satisfies ChartConfig;

const radialData = [
  { name: "Industry Avg", value: 3.0, fill: "#27272a" },
  { name: "Maya", value: 4.7, fill: "#E8272A" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────



const tierStyle: Record<string, string> = {
  Nano: "bg-zinc-700 text-zinc-300",
  Micro: "bg-blue-950 text-blue-300 border-blue-800/40",
  Macro: "bg-purple-950 text-purple-300 border-purple-800/40",
  Mega: "bg-amber-950 text-amber-300 border-amber-800/40",
};

const statusStyle: Record<string, string> = {
  Active: "bg-emerald-950 text-emerald-400 border-emerald-800/40",
  Inactive: "bg-zinc-800 text-zinc-400",
  Negotiating: "bg-yellow-950 text-yellow-400 border-yellow-800/40",
};

const campaignStyle: Record<string, string> = {
  Active: "bg-emerald-950 text-emerald-400 border-emerald-800",
  Completed: "bg-zinc-800/60 text-zinc-400 border-zinc-700",
};

function getPlatformUrl(platform: string, handle: string) {
  switch (platform) {
    case "instagram":
      return `https://instagram.com/${handle}`

    case "youtube":
      return `https://youtube.com/@${handle}`

    case "tiktok":
      return `https://tiktok.com/@${handle}`

    default:
      return "#"
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreatorProfilePage({creatorData}: {creatorData: Creator}) {
  const { platform, contract, engagementHistory, followerGrowth } = creator;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <header className="sticky top-0 z-10 border-b flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-zinc-500">
          <span>Creators</span>
          <ChevronRight size={13} />
          <span className="text-soft-black font-medium">{creatorData.full_name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className={cn(
                buttonVariants({ variant: "outline" }),
                "border-white/10 bg-white/5 hover:bg-white/10 gap-1.5 text-xs h-8"
            )}
          >
            <Edit size={12} /> Edit
          </Link>

          <Link 
            href="/"
            className={cn(
                buttonVariants({ variant: "outline" }),
                "border-white/10 bg-white/5 hover:bg-white/10 gap-1.5 text-xs h-8"
            )}
          >
            <Trash2 size={12} /> Delete
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-5">
        {/* ── Hero ── */}
        <Card className="overflow-hidden">
          <CardContent className="pt-5 pb-5">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {/* Avatar */}
              <div className="relative shrink-0">
                <Avatar className="h-17 w-17 ring-2 ring-[#E8272A]/30">
                  <AvatarImage/>
                  <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                    {creatorData.full_name[0]}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Identity */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold tracking-tight">{creatorData.full_name}</h1>
                  <Badge className="text-[10px] font-semibold px-2 py-0.5 rounded-full border">
                    {creatorData.tier}
                  </Badge>
                  <Badge className="text-[10px] font-semibold px-2 py-0.5 rounded-full border">
                    {creatorData.contract_status}
                  </Badge>
                </div>

                {/* Platform + niche */}
                <div className="flex items-center gap-2 mb-2.5">
                  {
                    creatorData.platform === "instagram" ? (
                        <Instagram size={13} className="text-pink-400 shrink-0" />
                    ) : creatorData.platform === "youtube" ? (
                        <Youtube size={13} className="text-red-500 shrink-0" />
                    ) : creatorData.platform === "tiktok" ? (
                        <TikTokIcon className="text-black shrink-0 h-4 w-4" />
                    ) : null
                  }
                  <a href={getPlatformUrl(creatorData.platform, creatorData.handle)} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-[#E8272A] transition-colors flex items-center gap-1">
                    {platform.handle} <ExternalLink size={11} />
                  </a>
                  <span className="text-zinc-700">·</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#E8272A]/10 text-[#E8272A] border border-[#E8272A]/20 font-medium">
                    {creatorData.niche}
                  </span>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">{creator.bio}</p>
              </div>

              {/* Key numbers */}
              <div className="flex sm:flex-col gap-5 sm:gap-2 sm:items-end shrink-0">
                <div className="text-right">
                  <p className="text-2xl font-bold tabular-nums">{formatFollower(creatorData.follower_count)}</p>
                  <p className="text-zinc-500 text-xs">Followers</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold tabular-nums text-[#E8272A]">{creatorData.engagement_rate}%</p>
                  <p className="text-zinc-500 text-xs">Engagement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Stat pills ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Avg Likes", value: formatFollower(platform.avgLikes), icon: Heart, color: "text-rose-400" },
            { label: "Avg Comments", value: String(platform.avgComments), icon: MessageSquare, color: "text-blue-400" },
            { label: "Contract Value", value: contract.value, icon: DollarSign, color: "text-emerald-400" },
            { label: "Contract End", value: contract.end, icon: Calendar, color: "text-amber-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <CardContent className="pt-4 pb-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Icon size={14} className={color} />
                </div>
                <div>
                  <p className="text-[11px] text-zinc-500">{label}</p>
                  <p className="text-sm font-bold mt-0.5">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Charts: Engagement trend + Radial gauge ── */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Engagement rate area */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-0 pt-4 px-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp size={13} className="text-[#E8272A]" />
                Engagement Rate — 6 months
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-2">
              <ChartContainer config={engagementConfig} className="h-40 w-full">
                <AreaChart data={engagementHistory} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E8272A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#E8272A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#ffffff08" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false} domain={[3.5, 6]} tickFormatter={(v) => `${v}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="rate" stroke="#E8272A" strokeWidth={2} fill="url(#engGrad)"
                    dot={{ fill: "#E8272A", r: 3 }} activeDot={{ r: 5, fill: "#E8272A" }} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Radial gauge vs industry */}
          <Card className="flex flex-col">
            <CardHeader className="pb-0 pt-4 px-4">
              <CardTitle className="text-sm font-semibold">vs Industry Avg</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 flex-1 flex flex-col items-center justify-center">
              <ChartContainer config={{ maya: { color: "#E8272A" }, avg: { color: "#27272a" } }} className="h-32.5 w-full">
                <RadialBarChart innerRadius={38} outerRadius={68} data={radialData} startAngle={180} endAngle={0} cx="50%" cy="78%">
                  <PolarAngleAxis type="number" domain={[0, 7]} tick={false} />
                  <RadialBar dataKey="value" cornerRadius={4} background={{ fill: "#1a1a1a" }} />
                </RadialBarChart>
              </ChartContainer>
              <div className="flex gap-4 text-xs -mt-1">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#E8272A]" />
                  <span className="text-zinc-400">Maya <span className="text-white font-semibold">4.7%</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-zinc-600" />
                  <span className="text-zinc-400">Avg <span className="text-white font-semibold">3.0%</span></span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Charts: Likes/Comments bar + Follower growth ── */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Likes & Comments */}
          <Card>
            <CardHeader className="pb-0 pt-4 px-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Heart size={13} className="text-[#E8272A]" />
                Likes & Comments — 6 months
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-2">
              <ChartContainer config={likesCommentsConfig} className="h-37.5 w-full">
                <BarChart data={engagementHistory} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={2}>
                  <CartesianGrid vertical={false} stroke="#ffffff08" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="likes" fill="#E8272A" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="comments" fill="#6b7280" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Follower growth */}
          <Card>
            <CardHeader className="pb-0 pt-4 px-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Users size={13} className="text-[#E8272A]" />
                Follower Growth — 6 months
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-2">
              <ChartContainer config={followerConfig} className="h-37.5 w-full">
                <AreaChart data={followerGrowth} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E8272A" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#E8272A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#ffffff08" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false}
                    domain={[70000, 90000]} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="followers" stroke="#E8272A" strokeWidth={2} fill="url(#fGrad)"
                    dot={false} activeDot={{ r: 4, fill: "#E8272A" }} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* ── Tabs: Contact / Contract / Campaigns / Notes ── */}
        <Tabs defaultValue="contact" className="space-y-4">
          <TabsList className="p-1 gap-1">
            {["contact", "contract", "campaigns", "notes"].map((t) => (
              <TabsTrigger key={t} value={t}
                className="capitalize text-xs data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-none text-zinc-400 transition-colors rounded">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Contact */}
          <TabsContent value="contact">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-semibold">Direct Contact</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  {[
                    { icon: Mail, label: "Email", value: creatorData.email, href: `mailto:${creatorData.email}` },
                    { icon: Phone, label: "Phone", value: creator.phone, href: `tel:${creator.phone}` },
                    { icon: MessageCircle, label: "Preferred Comms", value: "email" },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                        <Icon size={13} className="text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-[11px] text-zinc-500">{label}</p>
                        {href
                          ? <a href={href} className="text-sm text-[#E8272A] hover:underline">{value}</a>
                          : <p className="text-sm">{value}</p>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-semibold">Rep / Agent</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 ring-1 ring-white/10">
                      <AvatarFallback className="bg-zinc-800 text-sm font-bold">{creator.rep.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{creator.rep.name}</p>
                      <p className="text-xs text-zinc-500">{creator.rep.agency}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                      <Mail size={13} className="text-zinc-400" />
                    </div>
                    <a href={`mailto:${creator.rep.email}`} className="text-sm text-[#E8272A] hover:underline">
                      {creator.rep.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contract */}
          <TabsContent value="contract">
            <div className="grid md:grid-cols-2 gap-4">
              <Card >
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-semibold">Contract Details</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-2">
                  {[
                    { label: "Status", value: creator.contractStatus, badge: true },
                    { label: "Type", value: contract.type },
                    { label: "Start Date", value: contract.start },
                    { label: "End Date", value: contract.end },
                    { label: "Total Value", value: contract.value },
                  ].map(({ label, value, badge }) => (
                    <div key={label} className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0">
                      <span className="text-xs text-zinc-500">{label}</span>
                      {badge
                        ? <Badge className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusStyle[value]}`}>{value}</Badge>
                        : <span className="text-sm font-medium">{value}</span>}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Package size={13} className="text-primary" /> Deliverables
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-2.5">
                  {contract.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#E8272A] shrink-0" />
                      <span className="text-sm text-zinc-500">{d}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Campaigns */}
          <TabsContent value="campaigns">
            <Card>
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold">Campaign History</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-2">
                {creator.campaigns.map((c, i) => (
                  <div key={i} className="flex items-center justify-between py-3 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-md flex items-center justify-center">
                        <Star size={12} className="text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-xs">{c.date} · {c.result}</p>
                      </div>
                    </div>
                    <Badge className="text-[10px] font-semibold px-2 py-0.5 rounded-full border">
                      {c.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes */}
          <TabsContent value="notes">
            <Card>
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <FileText size={13} className="text-[#E8272A]" /> Internal Notes
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white text-xs gap-1 h-7">
                    <Edit size={11} /> Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="bg-[#0A0A0A] rounded-lg p-4 border border-white/5">
                  <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{creatorData.notes}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-zinc-600 text-xs">
                  <Clock size={11} />
                  <span>Last updated Jan 20, 2025</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}