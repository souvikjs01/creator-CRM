"use client";

import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import SubmitButton from "@/components/loader/SubmitButton";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import {
  CONTRACT_STATUS,
  creatorSchema,
  editCreatorSchema,
  NICHES,
  PLATFORMS,
  TIERS,
} from "@/lib/zodSchemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, PencilLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { Creator, editCreatorAction } from "@/lib/actions/creator";

// ─── Sub-components (identical pattern to CreatorForm) ───────────────────────

function SectionCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-background overflow-hidden">
      <div className="px-5 py-3 bg-muted/50 border-b border-border/40 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E8272A] shrink-0" />
        <span className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <Label className="text-xs font-medium text-muted-foreground tracking-wide">
      {children}
      {required && <span className="text-[#E8272A] ml-0.5">*</span>}
    </Label>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EditCreatorForm({ creator }: {creator: Creator}) {
  const [lastResult, action] = useActionState(editCreatorAction ,undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: editCreatorSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="min-h-screen">
      <main className="max-w-190 mx-auto px-4 sm:px-6 py-8 pb-16">

        {/* ── Back nav ── */}
        <div className="mb-6">
          <Link
            href="/dashboard/creators"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1.5 text-muted-foreground hover:text-foreground -ml-2 pl-2"
            )}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Creators
          </Link>
        </div>

        {/* ── Heading ── */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge className="bg-primary">Edit Creator</Badge>
              <span className="text-xs text-muted-foreground font-mono">
                #{creator.id.slice(0, 8)}…
              </span>
            </div>
            <h1 className="text-[26px] text-soft-black font-extrabold tracking-tight mb-1 flex items-center gap-2.5">
              <PencilLine className="w-6 h-6 text-primary shrink-0" strokeWidth={2} />
              Update creator details
            </h1>
            <p className="text-sm text-muted-foreground">
              Edit the fields below and save to update{" "}
              <span className="text-foreground font-medium">
                @{creator.handle}
              </span>
              's profile.
            </p>
          </div>
        </div>

        {/* ── Form ── */}
        <form
          id={form.id}
          action={action}
          onSubmit={form.onSubmit}
          noValidate
        >
            <input type="hidden" name="id" value={creator.id} />
          <div className="space-y-4">
            {/* ── Identity ── */}
            <SectionCard label="Identity">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Full name */}
                <div className="space-y-1.5">
                  <FieldLabel required>Full Name</FieldLabel>
                  <input
                    className="w-full border border-input rounded-md h-9 px-3 text-sm bg-background outline-none focus:ring-1 focus:ring-[#E8272A]/40"
                    placeholder="e.g. Alex Rivera"
                    name={fields.full_name.name}
                    defaultValue={creator.full_name}
                  />
                  <p className="text-primary text-sm">{fields.full_name.errors}</p>
                </div>

                {/* Handle */}
                <div className="space-y-1.5">
                  <FieldLabel required>Handle</FieldLabel>
                  <div className="flex items-center border border-input rounded-md overflow-hidden h-9 focus-within:ring-1 focus-within:ring-[#E8272A]/40">
                    <span className="px-2.5 h-full flex items-center bg-muted border-r border-border text-xs text-muted-foreground">
                      @
                    </span>
                    <input
                      className="flex-1 px-3 h-full text-sm bg-background outline-none"
                      placeholder="username"
                      name={fields.creator_handle.name}
                      defaultValue={creator.handle}
                    />
                  </div>
                  <p className="text-primary text-sm">{fields.creator_handle.errors}</p>
                </div>

                {/* Platform */}
                <div className="space-y-1.5">
                  <FieldLabel required>Platform</FieldLabel>
                  <Select
                    name={fields.platform.name}
                    key={fields.platform.key}
                    defaultValue={creator.platform}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={PLATFORMS.INSTAGRAM}>Instagram</SelectItem>
                      <SelectItem value={PLATFORMS.TIKTOK}>TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-primary text-sm">{fields.platform.errors}</p>
                </div>

              </div>
            </SectionCard>

            {/* ── Reach & Tier ── */}
            <SectionCard label="Reach & Tier">
              <div className="space-y-4">

                {/* Tier */}
                <div className="space-y-1.5">
                  <FieldLabel required>Creator tier</FieldLabel>
                  <Select
                    name={fields.tier.name}
                    key={fields.tier.key}
                    defaultValue={creator.tier}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TIERS.NANO}>Nano (0 – 10K)</SelectItem>
                      <SelectItem value={TIERS.MICRO}>Micro (10K – 100K)</SelectItem>
                      <SelectItem value={TIERS.MACRO}>Macro (100K – 1M)</SelectItem>
                      <SelectItem value={TIERS.MEGA}>Mega (1M+)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-primary text-sm">{fields.tier.errors}</p>
                </div>

                {/* Followers + Engagement */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Followers */}
                  <div className="space-y-1.5">
                    <FieldLabel required>Follower count</FieldLabel>
                    <div className="flex items-center border border-input rounded-md overflow-hidden h-9 focus-within:ring-1 focus-within:ring-[#E8272A]/40">
                      <input
                        type="number"
                        min={0}
                        className="flex-1 px-3 h-full text-sm bg-background outline-none"
                        placeholder="e.g. 45000"
                        name={fields.follower_count.name}
                        defaultValue={creator.follower_count}
                      />
                      <span className="px-2.5 h-full flex items-center bg-muted border-l border-border text-xs text-muted-foreground">
                        followers
                      </span>
                    </div>
                    <p className="text-primary text-sm">{fields.follower_count.errors}</p>
                  </div>

                  {/* Engagement */}
                  <div className="space-y-1.5">
                    <FieldLabel required>Engagement rate</FieldLabel>
                    <div className="flex items-center border border-input rounded-md overflow-hidden h-9 focus-within:ring-1 focus-within:ring-[#E8272A]/40">
                      <input
                        type="number"
                        min={0}
                        step="0.1"
                        className="flex-1 px-3 h-full text-sm bg-background outline-none"
                        placeholder="e.g. 4.2"
                        name={fields.engagement_rate.name}
                        defaultValue={creator.engagement_rate}
                      />
                      <span className="px-2.5 h-full flex items-center bg-muted border-l border-border text-xs text-muted-foreground">
                        %
                      </span>
                    </div>
                    <p className="text-primary text-sm">{fields.engagement_rate.errors}</p>
                  </div>

                </div>
              </div>
            </SectionCard>

            {/* ── Content Niche ── */}
            <SectionCard label="Content Niche">
              <div className="space-y-1.5 w-full">
                <FieldLabel required>Select your niche</FieldLabel>
                <Select
                  name={fields.niche.name}
                  key={fields.niche.key}
                  defaultValue={creator.niche}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NICHES.COLLEGE_LIFE}>College Life</SelectItem>
                    <SelectItem value={NICHES.DATING}>Dating</SelectItem>
                    <SelectItem value={NICHES.FITNESS}>Fitness</SelectItem>
                    <SelectItem value={NICHES.FOOD}>Food</SelectItem>
                    <SelectItem value={NICHES.GENZ_ENTERTAINMENT}>Gen Z Entertainment</SelectItem>
                    <SelectItem value={NICHES.LIFE_STYLE}>Lifestyle</SelectItem>
                    <SelectItem value={NICHES.TRAVEL}>Travel</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-primary text-sm">{fields.niche.errors}</p>
              </div>
            </SectionCard>

            {/* ── Contract & Rate ── */}
            <SectionCard label="Contract & Rate">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Contract Status */}
                <div className="space-y-2 w-full">
                  <FieldLabel required>Contract status</FieldLabel>
                  <Select
                    name={fields.contract_status.name}
                    key={fields.contract_status.key}
                    defaultValue={creator.contract_status}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select contract status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={CONTRACT_STATUS.ACTIVE}>Active</SelectItem>
                      <SelectItem value={CONTRACT_STATUS.INACTIVE}>Inactive</SelectItem>
                      <SelectItem value={CONTRACT_STATUS.NEGOTIATING}>Negotiating</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-primary text-sm">{fields.contract_status.errors}</p>
                </div>

                {/* Rate per post */}
                <div className="space-y-1.5 w-full">
                  <FieldLabel>Rate per post</FieldLabel>
                  <div className="flex items-center border border-input rounded-md overflow-hidden h-9 w-full focus-within:ring-1 focus-within:ring-[#E8272A]/40">
                    <span className="px-2.5 h-full flex items-center bg-muted border-r border-border text-xs text-muted-foreground">
                      $
                    </span>
                    <input
                      type="number"
                      min={0}
                      className="flex-1 px-3 h-full text-sm bg-background outline-none"
                      placeholder="e.g. 500"
                      name={fields.rate.name}
                      defaultValue={creator.rate ?? ""}
                    />
                  </div>
                </div>

              </div>
            </SectionCard>

            {/* ── Notes ── */}
            <SectionCard label="Notes">
              <div className="space-y-1.5">
                <FieldLabel>Internal notes</FieldLabel>
                <Textarea
                  placeholder="Add a note."
                  className="resize-y min-h-22.5 text-sm focus-visible:ring-0 focus:outline-none"
                  name={fields.notes.name}
                  defaultValue={creator.notes ?? ""}
                />
                <p className="text-primary text-sm">{fields.notes.errors}</p>
              </div>
            </SectionCard>

            {/* ── Footer: unsaved changes indicator + actions ── */}
            <div className="flex items-center justify-between gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 ml-auto">
                <Link
                  href="/dashboard/creators"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "border-border/60 text-muted-foreground hover:text-foreground"
                  )}
                >
                  Discard
                </Link>
                <SubmitButton text="Save changes" />
              </div>
            </div>

          </div>
        </form>
      </main>
    </div>
  );
}