"use client"
import { useState, useMemo } from "react"
import { Creator } from "@/lib/actions/creator"
import CreatorsFilters from "./CreatorsFilters"
import CreatorList from "./CreatorList"

type Tier = "all" | "Nano" | "Micro" | "Macro" | "Mega"

interface CreatorsClientWrapperProps {
    creatorData: Creator[]
}

export default function CreatorsClientWrapper({ creatorData }: CreatorsClientWrapperProps) {
    const [search, setSearch] = useState("")
    const [tierFilter, setTierFilter] = useState<Tier>("all")
    const [statusFilter, setStatusFilter] = useState("")

    const filteredCreators = useMemo(() => {
        return creatorData.filter((creator) => {
            // Search: match name, handle, or niche (case-insensitive)
            if (search.trim()) {
                const q = search.trim().toLowerCase()
                const matchesName = creator.full_name?.toLowerCase().includes(q)
                const matchesHandle = creator.handle?.toLowerCase().includes(q)
                const matchesNiche = creator.niche?.toLowerCase().includes(q)
                if (!matchesName && !matchesHandle && !matchesNiche) return false
            }

            // Tier filter
            if (tierFilter !== "all") {
                if (creator.tier?.toLowerCase() !== tierFilter.toLowerCase()) return false
            }

            // Status filter
            if (statusFilter) {
                if (creator.contract_status?.toLowerCase() !== statusFilter.toLowerCase()) return false
            }

            return true
        })
    }, [creatorData, search, tierFilter, statusFilter])

    return (
        <>
            <CreatorsFilters
                search={search}
                tierFilter={tierFilter}
                statusFilter={statusFilter}
                onSearchChange={setSearch}
                onTierChange={setTierFilter}
                onStatusChange={setStatusFilter}
            />
            <CreatorList creatorData={filteredCreators} />

            {/* Empty filtered state */}
            {filteredCreators.length === 0 && creatorData.length > 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-sm font-medium text-gray-500">No creators match your filters</p>
                    <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
                    <button
                        onClick={() => {
                            setSearch("")
                            setTierFilter("all")
                            setStatusFilter("")
                        }}
                        className="mt-3 text-xs text-[#E8272A] hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </>
    )
}