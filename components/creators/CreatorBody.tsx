import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { 
    LayoutGrid, 
    List, 
    Plus, 
    Search 
} from "lucide-react";
import CreatorList from "./CreatorList";

export default function CreatorBody() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-lg font-medium text-soft-black">
                    Creator Profiles
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                    10 creator ·{" "} 5 active
                </p>
            </div>
            <Link
            href="/dashboard/creators/create"
            className={buttonVariants()}
            >
            <Plus size={14} /> Add creator
            </Link>
        </div>

      {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 px-6 py-4 border-b border-gray-100">
            {[
            { label: "Total creators", value: 8, sub: "in roster" },
            { label: "Active contracts", value: 5, sub: "currently live" },
            { label: "Avg engagement", value: 5.3 + "%", sub: "across all" },
            { label: "Total reach", value: 10000, sub: "combined followers" },
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
        {/* <div className="flex items-center gap-2.5 px-6 py-3 border-b border-gray-100 flex-wrap">
            <div className="relative flex-1 min-w-50">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, handle, niche..."
                className="pl-8 h-8 text-sm border-gray-200"
            />
            </div>

            Tier filters
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

            Status filters
            <div className="flex gap-1.5">
            {(["Active", "Negotiating", "Inactive"] as const).map((s) => (
                <button
                key={s}
                onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
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

            View toggle
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
        </div> */}

        <CreatorList />
    </div>
  )
}
