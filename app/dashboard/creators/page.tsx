import { Button, buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function page() {
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
        {/* {[
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
        ))} */}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2.5 px-6 py-3 border-b border-gray-100 flex-wrap">
        {/* <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, handle, niche..."
            className="pl-8 h-8 text-sm border-gray-200"
          />
        </div> */}

        {/* Tier filters */}
        {/* <div className="flex gap-1.5">
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
        </div> */}

        {/* Status filters */}
        {/* <div className="flex gap-1.5">
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
        </div> */}

        {/* View toggle */}
        {/* <div className="flex border border-gray-200 rounded-md overflow-hidden">
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
        </div> */}
      </div>

      {/* Grid / List */}
      {/* <div className="flex-1 overflow-y-auto p-6">
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
      </div> */}

      {/* Detail Sheet */}
      {/* <Sheet open={selectedId !== null} onOpenChange={(o) => !o && setSelectedId(null)}>
        <SheetContent className="w-[440px] p-0 flex flex-col" side="right">
          <SheetHeader className="px-5 py-4 border-b border-gray-100">
            <SheetTitle className="text-sm font-medium">Creator profile</SheetTitle>
          </SheetHeader>
          {selected && (
            <DetailPanel creator={selected} onEdit={openEdit} onClose={() => setSelectedId(null)} />
          )}
        </SheetContent>
      </Sheet> */}

      {/* Add / Edit Modal */}
      {/* <Dialog open={modalOpen} onOpenChange={setModalOpen}>
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
      </Dialog> */}
    </div>
  )
}
