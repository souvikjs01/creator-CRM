"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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


export default function CampaignFilters() {
    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");
    const [goalFilter, setGoalFilter] = useState("");
    const [platformFilter, setPlatformFilter] = useState("");
  
    // const filtered = campaigns.filter((c) => {
    //   if (activeTab !== "all" && c.status !== activeTab) return false;
    //   if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    //   if (goalFilter && goalFilter !== "all" && c.goal !== goalFilter) return false;
    //   if (platformFilter && platformFilter !== "all" &&
    //     !c.creators.some((cr) => cr.platform === platformFilter)) return false;
    //   return true;
    // });
  
  return (
    <>
        {/* Tabs */}
        <div className="flex border-b">
            {TABS.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                        ? "text-[#E8283A] border-[#E8283A] font-medium"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-2.5 flex-wrap">
            <Input
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48"                
            />
            <Select onValueChange={setGoalFilter}>
                <SelectTrigger className="w-36">
                    <SelectValue placeholder="All goals" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All goals</SelectItem>
                    <SelectItem value="Installs">Installs</SelectItem>
                    <SelectItem value="Sign-ups">Sign-ups</SelectItem>
                    <SelectItem value="Awareness">Awareness</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="All platforms" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All platforms</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-36">
                    <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="month">This month</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="q2">Q2 2026</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </>
  )
}
