"use client"
import { Search, X } from 'lucide-react'
import { Input } from '../ui/input'

type Tier = "all" | "Nano" | "Micro" | "Macro" | "Mega"
type Status = "Active" | "Negotiating" | "Inactive"

interface CreatorsFiltersProps {
    search: string
    tierFilter: Tier
    statusFilter: string
    onSearchChange: (value: string) => void
    onTierChange: (value: Tier) => void
    onStatusChange: (value: string) => void
}

export default function CreatorsFilters({
    search,
    tierFilter,
    statusFilter,
    onSearchChange,
    onTierChange,
    onStatusChange,
}: CreatorsFiltersProps) {
    const hasActiveFilters = search || tierFilter !== "all" || statusFilter

    return (
        <div className="flex items-center gap-2.5 px-6 py-6 border-b border-gray-100 flex-wrap">
            <div className="relative flex-1 min-w-50">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by name, handle, niche..."
                    className="pl-8 h-8 text-sm border-gray-200"
                />
                {search && (
                    <button
                        onClick={() => onSearchChange("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X size={13} />
                    </button>
                )}
            </div>

            {/* Tier filters */}
            <div className="flex gap-1.5">
                {(["all", "Nano", "Micro", "Macro", "Mega"] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => onTierChange(t)}
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
                        onClick={() => onStatusChange(statusFilter === s ? "" : s)}
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

            {/* Clear all filters */}
            {hasActiveFilters && (
                <button
                    onClick={() => {
                        onSearchChange("")
                        onTierChange("all")
                        onStatusChange("")
                    }}
                    className="px-3 py-1 text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
                >
                    Clear all
                </button>
            )}
        </div>
    )
}