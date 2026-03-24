"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, LayoutGrid, List, Plus, Pencil, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tier = "Nano" | "Micro" | "Macro" | "Mega";
type Status = "Active" | "Negotiating" | "Inactive";
type Platform = "Instagram" | "TikTok" | "YouTube";

interface Creator {
  id: number;
  name: string;
  handle: string;
  niche: string;
  tier: Tier;
  ig: number;
  tt: number;
  yt: number;
  eng: number;
  status: Status;
  rate: string;
  email: string;
  rep: string;
  start: string;
  end: string;
  notes: string;
  platforms: Platform[];
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SEED_CREATORS: Creator[] = [
  {
    id: 1,
    name: "Aisha Patel",
    handle: "@aishaeats",
    niche: "Food",
    tier: "Micro",
    ig: 82000,
    tt: 45000,
    yt: 0,
    eng: 6.8,
    status: "Active",
    rate: "$1,800 flat",
    email: "aisha@mgmt.co",
    rep: "Riya Kapoor",
    start: "2026-01-15",
    end: "2026-06-15",
    notes:
      "Very responsive. Loves restaurant collabs. Avoid brand deals with meat products — she's vegetarian.",
    platforms: ["Instagram", "TikTok"],
  },
  {
    id: 2,
    name: "Jake Rivera",
    handle: "@jakevibes",
    niche: "Gen Z entertainment",
    tier: "Macro",
    ig: 310000,
    tt: 520000,
    yt: 95000,
    eng: 3.2,
    status: "Active",
    rate: "$5,000 flat + rev share",
    email: "jake@talentco.com",
    rep: "Marcus Lee",
    start: "2025-11-01",
    end: "2026-05-01",
    notes:
      "Very professional. Best performance on TikTok. Likes gaming and sneaker brands.",
    platforms: ["Instagram", "TikTok", "YouTube"],
  },
  {
    id: 3,
    name: "Mei Lin",
    handle: "@meilifestyle",
    niche: "Lifestyle",
    tier: "Micro",
    ig: 67000,
    tt: 0,
    yt: 23000,
    eng: 5.1,
    status: "Negotiating",
    rate: "Gifting + $800",
    email: "mei.lin@gmail.com",
    rep: "",
    start: "",
    end: "",
    notes:
      "First collab. Async comms preferred. Very aesthetic feed — great for visual brands.",
    platforms: ["Instagram", "YouTube"],
  },
  {
    id: 4,
    name: "Tyler Brooks",
    handle: "@tyleroncampus",
    niche: "College life",
    tier: "Nano",
    ig: 8200,
    tt: 14500,
    yt: 0,
    eng: 9.4,
    status: "Active",
    rate: "$400 flat",
    email: "tyler@college.edu",
    rep: "",
    start: "2026-02-01",
    end: "2026-08-01",
    notes:
      "Extremely high engagement for his size. College audience 18-22. Great for back-to-school.",
    platforms: ["Instagram", "TikTok"],
  },
  {
    id: 5,
    name: "Sofia Morales",
    handle: "@sofiadates",
    niche: "Dating",
    tier: "Micro",
    ig: 45000,
    tt: 88000,
    yt: 0,
    eng: 7.3,
    status: "Active",
    rate: "$1,200 flat",
    email: "sofia@rep.com",
    rep: "Carlos M.",
    start: "2026-01-01",
    end: "2026-07-01",
    notes:
      "Very engaging storytelling style. Best for apps, lifestyle, and fashion.",
    platforms: ["Instagram", "TikTok"],
  },
  {
    id: 6,
    name: "Dev Anand",
    handle: "@devtechlife",
    niche: "Tech",
    tier: "Macro",
    ig: 0,
    tt: 0,
    yt: 420000,
    eng: 2.8,
    status: "Inactive",
    rate: "Rev share",
    email: "dev@creator.io",
    rep: "",
    start: "2025-06-01",
    end: "2025-12-01",
    notes: "Contract ended. Good for tech B2B. Might renew Q3 2026.",
    platforms: ["YouTube"],
  },
  {
    id: 7,
    name: "Zara Ahmed",
    handle: "@zarafashion",
    niche: "Fashion",
    tier: "Mega",
    ig: 1200000,
    tt: 880000,
    yt: 0,
    eng: 1.9,
    status: "Active",
    rate: "$18,000 + gifting",
    email: "",
    rep: "Talent Agency LA",
    start: "2026-03-01",
    end: "2026-09-01",
    notes:
      "Always communicate through rep. Lead time 3 weeks for content. Top performer for fashion drops.",
    platforms: ["Instagram", "TikTok"],
  },
  {
    id: 8,
    name: "Nate Okafor",
    handle: "@nategenz",
    niche: "Gen Z entertainment",
    tier: "Micro",
    ig: 55000,
    tt: 120000,
    yt: 18000,
    eng: 5.6,
    status: "Negotiating",
    rate: "TBD",
    email: "nate@email.com",
    rep: "",
    start: "",
    end: "",
    notes:
      "Viral potential — two videos hit 2M+ views. Negotiate usage rights upfront.",
    platforms: ["Instagram", "TikTok", "YouTube"],
  },
];

const NICHES = [
  "Food",
  "Lifestyle",
  "College life",
  "Dating",
  "Gen Z entertainment",
  "Fashion",
  "Tech",
  "Fitness",
  "Travel",
  "Beauty",
  "Gaming",
  "Finance",
];

const AVATAR_COLORS = [
  { bg: "#DBEAFE", color: "#1D4ED8" },
  { bg: "#DCFCE7", color: "#15803D" },
  { bg: "#FEF9C3", color: "#A16207" },
  { bg: "#FCE7F3", color: "#9D174D" },
  { bg: "#EDE9FE", color: "#6D28D9" },
  { bg: "#CCFBF1", color: "#0F766E" },
  { bg: "#FFEDD5", color: "#C2410C" },
  { bg: "#FEE2E2", color: "#B91C1C" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (!n || n === 0) return "—";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return String(n);
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function totalFollowers(c: Creator): number {
  return (c.ig || 0) + (c.tt || 0) + (c.yt || 0);
}

function colorFor(id: number) {
  return AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];
}

const TIER_STYLES: Record<Tier, string> = {
  Nano: "bg-green-100 text-green-800 border-0",
  Micro: "bg-blue-100 text-blue-800 border-0",
  Macro: "bg-amber-100 text-amber-800 border-0",
  Mega: "bg-red-100 text-red-800 border-0",
};

const STATUS_STYLES: Record<Status, string> = {
  Active: "bg-green-100 text-green-800 border-0",
  Negotiating: "bg-amber-100 text-amber-800 border-0",
  Inactive: "bg-gray-100 text-gray-600 border-0",
};

// ─── Empty form state ─────────────────────────────────────────────────────────

function emptyForm(): Omit<Creator, "id"> {
  return {
    name: "",
    handle: "",
    niche: "Food",
    tier: "Micro",
    ig: 0,
    tt: 0,
    yt: 0,
    eng: 0,
    status: "Active",
    rate: "",
    email: "",
    rep: "",
    start: "",
    end: "",
    notes: "",
    platforms: [],
  };
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>(SEED_CREATORS);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<Tier | "all">("all");
  const [statusFilter, setStatusFilter] = useState<Status | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Creator, "id">>(emptyForm());

  // ── Derived ──────────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    return creators.filter((c) => {
      if (tierFilter !== "all" && c.tier !== tierFilter) return false;
      if (statusFilter && c.status !== statusFilter) return false;
      const q = search.toLowerCase();
      if (
        q &&
        !c.name.toLowerCase().includes(q) &&
        !c.handle.toLowerCase().includes(q) &&
        !c.niche.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [creators, search, tierFilter, statusFilter]);

  const selected = creators.find((c) => c.id === selectedId) ?? null;

  const stats = useMemo(() => {
    const avgEng =
      creators.length > 0
        ? (creators.reduce((s, c) => s + c.eng, 0) / creators.length).toFixed(1)
        : "0";
    const totalReach = creators.reduce((s, c) => s + totalFollowers(c), 0);
    return {
      total: creators.length,
      active: creators.filter((c) => c.status === "Active").length,
      avgEng,
      reach: fmt(totalReach),
    };
  }, [creators]);

  // ── Handlers ─────────────────────────────────────────────────────────────────

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm());
    setModalOpen(true);
  }

  function openEdit() {
    if (!selected) return;
    setEditingId(selected.id);
    setForm({ ...selected });
    setModalOpen(true);
  }

  function saveCreator() {
    if (!form.name.trim()) return;
    if (editingId !== null) {
      setCreators((prev) =>
        prev.map((c) => (c.id === editingId ? { ...form, id: editingId } : c))
      );
      setSelectedId(editingId);
    } else {
      const newId = Math.max(...creators.map((c) => c.id)) + 1;
      setCreators((prev) => [...prev, { ...form, id: newId }]);
    }
    setModalOpen(false);
  }

  function togglePlatform(p: Platform) {
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(p)
        ? f.platforms.filter((x) => x !== p)
        : [...f.platforms, p],
    }));
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h1 className="text-lg font-medium text-gray-900">
            Creator Profiles
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {filtered.length} creator{filtered.length !== 1 ? "s" : ""} ·{" "}
            {stats.active} active
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-[#E8272A] hover:bg-[#c81e21] text-white text-sm h-9 px-4 gap-1.5"
        >
          <Plus size={14} /> Add creator
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 px-6 py-4 border-b border-gray-100">
        {[
          { label: "Total creators", value: stats.total, sub: "in roster" },
          { label: "Active contracts", value: stats.active, sub: "currently live" },
          { label: "Avg engagement", value: stats.avgEng + "%", sub: "across all" },
          { label: "Total reach", value: stats.reach, sub: "combined followers" },
        ].map((s) => (
          <div key={s.label} className="bg-gray-50 rounded-lg px-3 py-2.5">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
              {s.label}
            </div>
            <div className="text-xl font-medium text-gray-900">{s.value}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2.5 px-6 py-3 border-b border-gray-100 flex-wrap">
        <div className="relative flex-1 min-w-50">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, handle, niche..."
            className="pl-8 h-8 text-sm border-gray-200"
          />
        </div>

        {/* Tier filters */}
        <div className="flex gap-1.5">
          {(["all", "Nano", "Micro", "Macro", "Mega"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                tierFilter === t
                  ? "bg-[#E8272A] border-[#E8272A] text-white"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>

        {/* Status filters */}
        <div className="flex gap-1.5">
          {(["Active", "Negotiating", "Inactive"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? null : s)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                statusFilter === s
                  ? "bg-[#E8272A] border-[#E8272A] text-white"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex border border-gray-200 rounded-md overflow-hidden">
          <button
            onClick={() => setView("grid")}
            className={`p-1.5 ${view === "grid" ? "bg-gray-100" : "bg-white"}`}
          >
            <LayoutGrid size={14} className="text-gray-600" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-1.5 ${view === "list" ? "bg-gray-100" : "bg-white"}`}
          >
            <List size={14} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Grid / List */}
      <div className="flex-1 overflow-y-auto p-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No creators match your filters
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((c) => (
              <CreatorCard
                key={c.id}
                creator={c}
                selected={selectedId === c.id}
                onClick={() => setSelectedId(c.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {filtered.map((c) => (
              <CreatorRow
                key={c.id}
                creator={c}
                selected={selectedId === c.id}
                onClick={() => setSelectedId(c.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Sheet */}
      <Sheet open={selectedId !== null} onOpenChange={(o) => !o && setSelectedId(null)}>
        <SheetContent className="w-110 p-0 flex flex-col" side="right">
          <SheetHeader className="px-5 py-4 border-b border-gray-100">
            <SheetTitle className="text-sm font-medium">Creator profile</SheetTitle>
          </SheetHeader>
          {selected && (
            <DetailPanel creator={selected} onEdit={openEdit} onClose={() => setSelectedId(null)} />
          )}
        </SheetContent>
      </Sheet>

      {/* Add / Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-medium">
              {editingId ? "Edit creator" : "Add creator"}
            </DialogTitle>
          </DialogHeader>
          <CreatorForm
            form={form}
            setForm={setForm}
            togglePlatform={togglePlatform}
          />
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="text-sm">
              Cancel
            </Button>
            <Button
              onClick={saveCreator}
              className="bg-[#E8272A] hover:bg-[#c81e21] text-white text-sm"
            >
              Save creator
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Creator Card ─────────────────────────────────────────────────────────────

function CreatorCard({
  creator: c,
  selected,
  onClick,
}: {
  creator: Creator;
  selected: boolean;
  onClick: () => void;
}) {
  const col = colorFor(c.id);
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border p-4 cursor-pointer transition-all ${
        selected ? "border-[#E8272A]" : "border-gray-100 hover:border-gray-200"
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0"
          style={{ background: col.bg, color: col.color }}
        >
          {initials(c.name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">{c.name}</div>
          <div className="text-xs text-gray-400 mt-0.5 truncate">
            {c.handle} · {c.niche}
          </div>
        </div>
        <Badge className={`text-[10px] shrink-0 ${TIER_STYLES[c.tier]}`}>{c.tier}</Badge>
      </div>

      <div className="grid grid-cols-3 gap-2 py-2.5 border-t border-b border-gray-100 mb-2.5">
        {[
          { val: fmt(totalFollowers(c)), lbl: "Reach" },
          { val: c.eng + "%", lbl: "Engagement" },
          { val: c.rate.split(" ")[0], lbl: "Rate" },
        ].map((s) => (
          <div key={s.lbl} className="text-center">
            <div className="text-xs font-medium text-gray-800">{s.val}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{s.lbl}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {c.platforms.map((p) => (
            <span
              key={p}
              className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded"
            >
              {p === "Instagram" ? "IG" : p === "TikTok" ? "TT" : "YT"}
            </span>
          ))}
        </div>
        <Badge className={`text-[10px] ${STATUS_STYLES[c.status]}`}>{c.status}</Badge>
      </div>
    </div>
  );
}

// ─── Creator Row ──────────────────────────────────────────────────────────────

function CreatorRow({
  creator: c,
  selected,
  onClick,
}: {
  creator: Creator;
  selected: boolean;
  onClick: () => void;
}) {
  const col = colorFor(c.id);
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
        selected ? "border-[#E8272A]" : "border-gray-100 hover:border-gray-200"
      }`}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
        style={{ background: col.bg, color: col.color }}
      >
        {initials(c.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900">{c.name}</div>
        <div className="text-xs text-gray-400">{c.handle}</div>
      </div>
      <div className="text-xs text-gray-500 w-28 hidden sm:block">{c.niche}</div>
      <Badge className={`text-[10px] hidden md:inline-flex ${TIER_STYLES[c.tier]}`}>{c.tier}</Badge>
      <div className="text-xs text-gray-600 w-16 text-right hidden lg:block">{fmt(totalFollowers(c))}</div>
      <div className="text-xs text-gray-600 w-14 text-right hidden lg:block">{c.eng}%</div>
      <Badge className={`text-[10px] ${STATUS_STYLES[c.status]}`}>{c.status}</Badge>
    </div>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function DetailPanel({
  creator: c,
  onEdit,
  onClose,
}: {
  creator: Creator;
  onEdit: () => void;
  onClose: () => void;
}) {
  const col = colorFor(c.id);
  const platforms = [
    c.ig && { name: "Instagram", abbr: "IG", val: fmt(c.ig) },
    c.tt && { name: "TikTok", abbr: "TT", val: fmt(c.tt) },
    c.yt && { name: "YouTube", abbr: "YT", val: fmt(c.yt) },
  ].filter(Boolean) as { name: string; abbr: string; val: string }[];

  return (
    <>
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Avatar row */}
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-medium shrink-0"
            style={{ background: col.bg, color: col.color }}
          >
            {initials(c.name)}
          </div>
          <div>
            <div className="text-base font-medium text-gray-900">{c.name}</div>
            <div className="text-sm text-gray-500 mt-0.5">
              {c.handle} · {c.niche}
            </div>
            <div className="flex gap-1.5 mt-1.5">
              <Badge className={`text-[10px] ${TIER_STYLES[c.tier]}`}>{c.tier}</Badge>
              <Badge className={`text-[10px] ${STATUS_STYLES[c.status]}`}>{c.status}</Badge>
            </div>
          </div>
        </div>

        {/* Platform reach */}
        <div>
          <SectionLabel>Platform reach</SectionLabel>
          <div className="flex gap-2">
            {platforms.length > 0 ? (
              platforms.map((p) => (
                <div key={p.name} className="flex-1 bg-gray-50 rounded-lg p-2.5">
                  <div className="text-[10px] text-gray-400 mb-1">
                    {p.abbr} {p.name}
                  </div>
                  <div className="text-sm font-medium text-gray-900">{p.val}</div>
                  <div className="text-[10px] text-gray-400">followers</div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400">No platforms added</p>
            )}
          </div>
        </div>

        {/* Performance */}
        <div>
          <SectionLabel>Performance</SectionLabel>
          <div className="grid grid-cols-2 gap-2">
            <DetailItem label="Avg engagement rate" value={c.eng + "%"} />
            <DetailItem label="Total reach" value={fmt(totalFollowers(c))} />
          </div>
        </div>

        {/* Contract */}
        <div>
          <SectionLabel>Contract & rate</SectionLabel>
          <div className="grid grid-cols-2 gap-2">
            <DetailItem label="Rate / deal" value={c.rate || "—"} />
            <DetailItem label="Status" value={c.status} />
            <DetailItem label="Start date" value={c.start || "—"} />
            <DetailItem label="End date" value={c.end || "—"} />
          </div>
        </div>

        {/* Contact */}
        <div>
          <SectionLabel>Contact info</SectionLabel>
          <div className="grid grid-cols-2 gap-2">
            <DetailItem label="Email" value={c.email || "—"} small />
            <DetailItem label="Rep / agent" value={c.rep || "Direct"} />
          </div>
        </div>

        {/* Notes */}
        {c.notes && (
          <div>
            <SectionLabel>Notes</SectionLabel>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 leading-relaxed">
              {c.notes}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 px-5 py-4 border-t border-gray-100">
        <Button variant="outline" onClick={onEdit} className="flex-1 text-sm h-9 gap-1.5">
          <Pencil size={13} /> Edit profile
        </Button>
        <Button className="flex-1 bg-[#E8272A] hover:bg-[#c81e21] text-white text-sm h-9">
          Message creator
        </Button>
      </div>
    </>
  );
}

// ─── Creator Form ─────────────────────────────────────────────────────────────

function CreatorForm({
  form,
  setForm,
  togglePlatform,
}: {
  form: Omit<Creator, "id">;
  setForm: React.Dispatch<React.SetStateAction<Omit<Creator, "id">>>;
  togglePlatform: (p: Platform) => void;
}) {
  const set = (field: keyof Omit<Creator, "id">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="space-y-4 py-2">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-gray-600 mb-1.5 block">Full name</Label>
          <Input value={form.name} onChange={set("name")} placeholder="e.g. Priya Sharma" className="h-9 text-sm" />
        </div>
        <div>
          <Label className="text-xs text-gray-600 mb-1.5 block">Primary handle</Label>
          <Input value={form.handle} onChange={set("handle")} placeholder="@username" className="h-9 text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-gray-600 mb-1.5 block">Niche / category</Label>
          <Select value={form.niche} onValueChange={(v) => setForm((f) => ({ ...f, niche: v }))}>
            <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>{NICHES.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-gray-600 mb-1.5 block">Tier</Label>
          <Select value={form.tier} onValueChange={(v) => setForm((f) => ({ ...f, tier: v as Tier }))}>
            <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {(["Nano", "Micro", "Macro", "Mega"] as Tier[]).map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Platforms */}
      <div className="border border-gray-100 rounded-lg p-3 space-y-2.5">
        <div className="text-xs font-medium text-gray-500 mb-1">Platforms & followers</div>
        {([
          { key: "Instagram" as Platform, field: "ig" as const },
          { key: "TikTok" as Platform, field: "tt" as const },
          { key: "YouTube" as Platform, field: "yt" as const },
        ]).map(({ key, field }) => (
          <div key={key} className="flex items-center gap-3">
            <Checkbox
              checked={form.platforms.includes(key)}
              onCheckedChange={() => togglePlatform(key)}
              id={`plat-${key}`}
            />
            <label htmlFor={`plat-${key}`} className="text-sm text-gray-700 w-20 cursor-pointer">{key}</label>
            <Input
              value={form[field] || ""}
              onChange={(e) => setForm((f) => ({ ...f, [field]: parseInt(e.target.value) || 0 }))}
              placeholder="Followers"
              className="h-8 text-sm ml-auto w-32"
              type="number"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-gray-600 mb-1.5 block">Avg engagement (%)</Label>
          <Input value={form.eng || ""} onChange={(e) => setForm((f) => ({ ...f, eng: parseFloat(e.target.value) || 0 }))} placeholder="e.g. 4.2" className="h-9 text-sm" type="number" step="0.1" />
        </div>
        <div>
          <Label className="text-xs text-gray-600 mb-1.5 block">Contract status</Label>
          <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v as Status }))}>
            <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {(["Active", "Negotiating", "Inactive"] as Status[]).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-gray-600 mb-1.5 block">Contract start</Label>
          <Input value={form.start} onChange={set("start")} type="date" className="h-9 text-sm" />
        </div>
        <div>
          <Label className="text-xs text-gray-600 mb-1.5 block">Contract end</Label>
          <Input value={form.end} onChange={set("end")} type="date" className="h-9 text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-gray-600 mb-1.5 block">Rate / deal type</Label>
          <Input value={form.rate} onChange={set("rate")} placeholder="e.g. $2,500 flat fee" className="h-9 text-sm" />
        </div>
        <div>
          <Label className="text-xs text-gray-600 mb-1.5 block">Email</Label>
          <Input value={form.email} onChange={set("email")} placeholder="creator@email.com" className="h-9 text-sm" type="email" />
        </div>
      </div>

      <div>
        <Label className="text-xs text-gray-600 mb-1.5 block">Rep / agent (optional)</Label>
        <Input value={form.rep} onChange={set("rep")} placeholder="Agent or manager name" className="h-9 text-sm" />
      </div>

      <div>
        <Label className="text-xs text-gray-600 mb-1.5 block">Notes</Label>
        <Textarea value={form.notes} onChange={set("notes")} placeholder="Personality notes, content preferences, collab feedback..." className="text-sm min-h-17.5" />
      </div>
    </div>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-2">
      {children}
    </div>
  );
}

function DetailItem({
  label,
  value,
  small,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="bg-gray-50 rounded-lg px-3 py-2.5">
      <div className="text-[10px] text-gray-400 mb-1">{label}</div>
      <div className={`font-medium text-gray-900 ${small ? "text-xs break-all" : "text-sm"}`}>
        {value}
      </div>
    </div>
  );
}