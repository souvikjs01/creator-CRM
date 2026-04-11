"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Zap,
  Target,
  Users,
  FileText,
  Plus,
  Trash2,
  Search,
  X,
  Check,
  Info,
  CircleAlert,
  CircleCheck,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ActiveCreator } from "@/lib/actions/creator";
import { addCampaignSchema, CampaignStatus } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import SubmitButton from "../loader/SubmitButton";
import { addCampaignAction } from "@/lib/actions/campaign";
import Link from "next/link";


// ─── Types ────────────────────────────────────────────────────────────────────

interface Deliverable {
  id: string;
  desc: string;
  type: string;
  dueDate: string;
  removing: boolean;
}

interface FormErrors {
  name?: string;
  goal?: string;
  budget?: string;
  startDate?: string;
  endDate?: string;
  creators?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function futureDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function today(): string {
  return new Date().toISOString().split("T")[0];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <span className="flex items-center gap-1 text-xs text-destructive mt-1">
      <CircleAlert size={11} />
      {msg}
    </span>
  );
}

function StepIndicator({
  steps,
  completedSteps,
  currentStep,
}: {
  steps: string[];
  completedSteps: boolean[];
  currentStep: number;
}) {
  return (
    <Card className="mb-6">
      <div className="flex overflow-hidden rounded-lg">
        {steps.map((label, i) => {
          const done = completedSteps[i];
          const active = !done && (i === currentStep || currentStep === -1);
          return (
            <div
              key={i}
              className={cn(
                "flex flex-1 items-center gap-2.5 px-4 py-3 text-xs font-medium transition-colors relative",
                "after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-5 after:w-px after:bg-border last:after:hidden",
                done && "text-emerald-600",
                active && "text-destructive",
                !done && !active && "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors",
                  done && "bg-emerald-50 text-emerald-600",
                  active && "bg-red-50 text-destructive",
                  !done && !active && "bg-muted text-muted-foreground"
                )}
              >
                {done ? <Check size={10} strokeWidth={3} /> : i + 1}
              </div>
              <span className="hidden sm:block">{label}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function CreatorCard({
  creator,
  selected,
  onToggle,
}: {
  creator: ActiveCreator
  selected: boolean
  onToggle: () => void
}) {

  const initials = creator.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      onClick={onToggle}
      className={cn(
        "flex items-center gap-3 rounded-md border-[1.5px] p-3 cursor-pointer transition-all select-none",
        "hover:border-destructive hover:bg-red-50/50",
        selected && "border-destructive bg-red-50 shadow-[0_0_0_1px_hsl(var(--destructive))]"
      )}
    >
      {/* Avatar */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white shadow-sm bg-red-400"
      >
        {initials}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="truncate text-sm font-semibold">{creator.full_name}</p>

        <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11.5px] text-muted-foreground">
          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground/70">
            {creator.platform}
          </span>

          <span>
            {creator.follower_count?.toLocaleString()} · {creator.tier}
          </span>

          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10.5px] font-semibold text-blue-700">
            {creator.engagement_rate}% eng
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <Badge
          variant="outline"
          className="border-emerald-200 bg-emerald-50 text-[9.5px] font-bold uppercase tracking-wide text-emerald-600 px-2 py-0.5"
        >
          Active
        </Badge>

        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] transition-all",
            selected
              ? "border-destructive bg-destructive"
              : "border-border bg-white group-hover:border-destructive"
          )}
        >
          {selected && <Check size={11} color="white" strokeWidth={3} />}
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CreateCampaign({ creators }: { creators: ActiveCreator[] }) {
    const [count, setCount] = useState(0);
    const [creatorSearch, setCreatorSearch] = useState("");
    const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
    const [startDate, setStartDate] = useState("");

    const [lastResult, action] = useActionState(addCampaignAction, undefined);
      const [form, fields] = useForm({
        lastResult,
        onValidate({formData}) {
            return parseWithZod(formData, {
              schema: addCampaignSchema
            })
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput'
      });

    const filteredCreators = creators.filter((c) => {
      const q = creatorSearch.toLowerCase();
      return (
        !q ||
        [
          c.full_name ?? "",
          c.platform ?? "",
          c.tier ?? "",
        ].some((v) => v.toLowerCase().includes(q))
      );
    });
    
    const assignedCreators = creators.filter((c) =>
      selectedCreators.includes(c.id)
    );

    const toggleCreator = (id: string) => {
      setSelectedCreators((prev) =>
        prev.includes(id)
          ? prev.filter((c) => c !== id)
          : [...prev, id]
      );
    };

    function today(): string {
      return new Date().toISOString().split("T")[0];
    }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="mx-auto max-w-190">

        {/* ── Header ── */}
        <div className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <Link href="/dashboard/campaign" className="h-9 w-9 rounded-full shadow-sm flex justify-center items-center hover:border-destructive hover:text-destructive">
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h1 className="text-[22px] font-bold tracking-tight">New Campaign</h1>
              <p className="mt-0.5 text-[13px] text-muted-foreground">Set up a creator marketing campaign</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="shadow-sm">
            Save as Draft
          </Button>
        </div>

        {/* ── Stepper ── */}
        {/* <StepIndicator
          steps={["Details", "Targets", "Creators", "Deliverables"]}
          completedSteps={sectionsDone}
          currentStep={currentStep}
        /> */}

        <form 
          id={form.id}
          action={action}
          onSubmit={form.onSubmit}
          noValidate
        >

          {selectedCreators.map((id) => (
            <input
              key={id}
              type="hidden"
              name="creatorIds"
              value={id}
            />
          ))}

          {/* Section 1 — Campaign Details                              */}
          <Card className="mb-3.5 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-0 pt-5 px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-red-50">
                  <Zap size={15} color="#EF3E35" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[14.5px] font-bold tracking-tight">Campaign Details</p>
                  <p className="text-xs text-muted-foreground">Core information about this campaign</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-7 pb-6 pt-5 space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground after:text-destructive after:content-['_*']">
                    Campaign Name
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="e.g. Summer LA Launch 2026"
                      name={fields.campaign_name.name}
                    />
                    <p className="text-primary text-sm">{fields.campaign_name.errors}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground after:text-destructive after:content-['_*']">
                    Goal
                  </Label>
                  <Input
                    placeholder="Enter campaign goal"
                    name={fields.goal.name}
                  />
                  <p className="text-primary text-sm">{fields.goal.errors}</p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground after:text-destructive after:content-['_*']">
                    Status
                  </Label>
                  <Select
                    name={fields.status.name}
                    key={fields.status.key}
                    defaultValue={CampaignStatus.PLANNED}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={CampaignStatus.PLANNED}>Planned</SelectItem>
                      <SelectItem value={CampaignStatus.ACTIVE}>Active</SelectItem>
                      <SelectItem value={CampaignStatus.CANCELLED}>Cancelled</SelectItem>
                      <SelectItem value={CampaignStatus.COMPLETED}>Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground after:text-destructive after:content-['_*']">
                    Total Budget
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13.5px] text-muted-foreground pointer-events-none">$</span>
                    <Input
                      type="number"
                      min={0}
                      placeholder="0.00"
                      name={fields.budget.name}
                    />
                    <p className="text-primary text-sm">{fields.budget.errors}</p>
                  </div>
                  <p className="text-[11.5px] text-muted-foreground">Total budget across all creators</p>
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground after:text-destructive after:content-['_*']">
                  Campaign Duration
                </Label>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <Input
                    type="date"
                    name={fields.start_date.name}
                    min={today()}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span className="text-center text-sm text-muted-foreground">→</span>
                  <Input
                    type="date"
                    name={fields.end_date.name}
                    min={startDate || today()}
                  />
                </div>
                {/* Error row */}
                <div className="grid grid-cols-[1fr_auto_1fr] gap-2">
                  <p className="text-primary text-sm">{fields.start_date.errors}</p>
                  <div />
                  <p className="text-primary text-sm">{fields.end_date.errors}</p>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Campaign Notes
                </Label>
                <Textarea
                  placeholder="Internal notes, brief, or context for the team…"
                  name={fields.notes.name}
                  maxLength={500}
                  onInput={(e) => setCount(e.currentTarget.value.length)}
                  className="min-h-21 resize-y"
                />
                <p className="text-primary text-sm">{fields.notes.errors}</p>
                <div className="flex items-center justify-between">
                  <p className="text-[11.5px] text-muted-foreground">Visible to the Grangou team only</p>
                   <span
                    className={cn(
                      "font-mono text-[11px]",
                      count > 450 ? "text-orange-500" : "text-muted-foreground"
                    )}
                  >
                    {count}/500
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2 — Performance Targets                          */}
          <Card className="mb-3.5 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-0 pt-5 px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-red-50">
                  <Target size={15} color="#EF3E35" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[14.5px] font-bold tracking-tight">Performance Targets</p>
                  <p className="text-xs text-muted-foreground">Optional goals for tracking ROI and campaign success</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-7 pb-6 pt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label 
                    className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    Target Reach
                  </Label>

                  <Input 
                    type="number" 
                    min={0} 
                    placeholder="e.g. 500,000" 
                    name={fields.total_reach.name}
                  />
                  <p className="text-primary text-sm">{fields.total_reach.errors}</p>
                  <p className="text-[11.5px] text-muted-foreground">Total impressions goal</p>
                </div>

                <div className="space-y-1.5">
                  <Label 
                    className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Target Conversions
                  </Label>
                  
                  <Input 
                    type="number" 
                    min={0} 
                    placeholder="e.g. 1,000" 
                    name={fields.total_conversions.name}
                  />
                  <p className="text-primary text-sm">{fields.total_conversions.errors}</p>
                  <p className="text-[11.5px] text-muted-foreground">Installs or sign-ups</p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Target CPA
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13.5px] text-muted-foreground pointer-events-none">$</span>
                    <Input 
                      type="number" 
                      min={0}  
                      placeholder="0.00" 
                      name={fields.cpa.name}
                      className="pl-6" 
                    />
                    <p className="text-primary text-sm">{fields.cpa.errors}</p>
                  </div>
                  <p className="text-[11.5px] text-muted-foreground">Cost per acquisition</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3 — Assign Creators                              */}
          <Card className="mb-3.5 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-0 pt-5 px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-red-50">
                  <Users size={15} color="#EF3E35" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[14.5px] font-bold tracking-tight">Assign Creators</p>
                  <p className="text-xs text-muted-foreground">Only active creators can be assigned to a campaign</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-7 pb-6 pt-5 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search by name, handle, platform or niche…"
                  value={creatorSearch}
                  onChange={(e) => setCreatorSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Grid */}
              {filteredCreators.length === 0 ? (
                <p className="py-6 text-center text-[13px] text-muted-foreground">
                  No active creators match &ldquo;{creatorSearch}&rdquo;
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {filteredCreators.map((c) => (
                    <CreatorCard
                      key={c.id}
                      creator={c}
                      selected={selectedCreators.includes(c.id)}
                      onToggle={() => toggleCreator(c.id)}
                    />
                  ))}
                </div>
              )}

              {/* Selection summary */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="font-semibold text-destructive">{selectedCreators.length}</span>
                  <span className="text-muted-foreground">
                    creator{selectedCreators.length !== 1 ? "s" : ""} selected
                  </span>
                </div>

                {assignedCreators.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {assignedCreators.map((c) => (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => toggleCreator(c.id)}
                        className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[11.5px] font-medium text-destructive transition-colors hover:bg-red-100"
                      >
                        <div className="h-3.5 w-3.5 rounded-full shrink-0 bg-red-400" />
                        {c.full_name}
                        <X size={10} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 4 — Deliverables                                 */}
          <Card className="mb-3.5 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-0 pt-5 px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-red-50">
                  <FileText size={15} color="#EF3E35" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[14.5px] font-bold tracking-tight">Deliverables</p>
                  <p className="text-xs text-muted-foreground">Define what content each creator needs to produce</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-7 pb-6 pt-5">
              {/* Rows */}
              <div className="space-y-2">
                  <div
                    className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-3 items-center"
                  >
                    <Input
                      placeholder="e.g. 1x Reel featuring menu + 2x Story"
                      type="text"
                      name={fields.deliverables.name}
                    />

                    <Input
                      type="date"
                      defaultValue={startDate}
                      readOnly
                      className="hidden sm:flex bg-muted cursor-not-allowed"
                    />
                  </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Form Footer ── */}
          <div className="flex items-center justify-between pt-5">
            <p className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
              <Info size={13} />
              Fields marked <span className="text-destructive mx-0.5">*</span> are required
            </p>

            <div className="flex justify-end">
              <SubmitButton text="Create Campaign" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}