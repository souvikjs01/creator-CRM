import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Plus } from "lucide-react";
import { getAllCreators } from "@/lib/actions/creator";
import { formatFollower } from "@/lib/utils";
import CreatorsClientWrapper from "./CreatorsClients";



export default async function CreatorBody() {
    const creatorData = await getAllCreators(); 
    const stats = creatorData.reduce(
        (acc, creator) => {
            acc.totalFollowers += creator.follower_count ?? 0
            acc.totalEngagement += creator.engagement_rate ?? 0

            if (creator.contract_status === "active") {
                acc.activeCreators++
            }

            return acc
        },
        {
            totalFollowers: 0,
            totalEngagement: 0,
            activeCreators: 0
        }
    )

    const averageEngagement =
        creatorData.length > 0
        ? (stats.totalEngagement / creatorData.length).toFixed(2)
        : 0

        const totalFollowers = stats.totalFollowers
    const activeCreatorsCount = stats.activeCreators

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-lg font-medium text-soft-black">
                    Creator Profiles
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                    {creatorData.length} creator ·{" "} {activeCreatorsCount} active
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
            { label: "Total creators", value: creatorData.length, sub: "in roster" },
            { label: "Active contracts", value: activeCreatorsCount, sub: "currently live" },
            { label: "Avg engagement", value: averageEngagement + "%", sub: "across all" },
            { label: "Total reach", value: formatFollower(totalFollowers), sub: "combined followers" },
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

        <CreatorsClientWrapper creatorData={creatorData}/>
    </div>
  )
}
