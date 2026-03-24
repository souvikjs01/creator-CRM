// "use client";

// import { useActionState } from "react";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import SubmitButton from "@/components/loader/SubmitButton";
// import { useForm } from "@conform-to/react";
// import { parseWithZod } from "@conform-to/zod";
// import { 
//   CONTRACT_STATUS, 
//   creatorOnboardingSchema, 
//   NICHES, 
//   PLATFORMS, 
//   TIERS 
// } from "@/lib/zodSchemas";
// import { onboardingAction } from "@/lib/actions/onboard";
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "@/components/ui/select";

// function SectionCard({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="rounded-xl border border-border/50 bg-background overflow-hidden">
//       <div className="px-5 py-3 bg-muted/50 border-b border-border/40 flex items-center gap-2">
//         <span className="w-1.5 h-1.5 rounded-full bg-[#E8272A] shrink-0" />
//         <span className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground">
//           {label}
//         </span>
//       </div>
//       <div className="p-5 space-y-4">{children}</div>
//     </div>
//   );
// }

// function FieldLabel({
//   children,
//   required,
// }: {
//   children: React.ReactNode;
//   required?: boolean;
// }) {
//   return (
//     <Label className="text-xs font-medium text-muted-foreground tracking-wide">
//       {children}
//       {required && <span className="text-[#E8272A] ml-0.5">*</span>}
//     </Label>
//   );
// }

// export default function CreatorOnboardingPage() {
//   const [lastResult, action] = useActionState(onboardingAction, undefined);
//   const [form, fields] = useForm({
//     lastResult,
//     onValidate({formData}) {
//         return parseWithZod(formData, {
//           schema: creatorOnboardingSchema
//         })
//     },
//     shouldValidate: 'onBlur',
//     shouldRevalidate: 'onInput'
//   });
 
//   return (
//     <div className="min-h-screen bg-[#FAFAF9]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//       <GrangouHeader />
//       <main className="max-w-190 mx-auto px-4 sm:px-6 py-8 pb-16">
//         {/* Heading */}
//         <div className="mb-8">
//           <Badge className=" bg-primary">New Creator</Badge>
//           <h1
//             className="text-[26px] text-soft-black font-extrabold tracking-tight mb-1"
//           >
//             Tell us about yourself
//           </h1>
//           <p className="text-sm text-muted-foreground">
//             Fill in the details below to add a new creator to the Creator CRM.
//           </p>
//         </div>
//         <form
//           id={form.id}
//           action={action}
//           onSubmit={form.onSubmit}
//           noValidate
//         >
//           <div className="space-y-4">
//             {/* identity */}
//             <SectionCard label="Identity">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//                 {/* Handle */}
//                 <div className="space-y-1.5">
//                   <FieldLabel required>Handle</FieldLabel>

//                   <div className="flex items-center border border-input rounded-md overflow-hidden h-9 focus-within:ring-neutral-gray">

//                     <span className="px-2.5 h-full flex items-center bg-muted border-r border-border text-xs text-muted-foreground">
//                       @
//                     </span>

//                     <input
//                       className="flex-1 px-3 h-full text-sm bg-background outline-none"
//                       placeholder="username"
//                       name={fields.creator_handle.name}
//                     />

//                   </div>

//                   <p className="text-primary text-sm">{fields.creator_handle.errors}</p>
//                 </div>

//                 {/* Platform */}
//                 <div className="space-y-1.5">
//                   <FieldLabel required>Platform</FieldLabel>

//                   <Select
//                     name={fields.platform.name}
//                     key={fields.platform.key}
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select your platform" />
//                     </SelectTrigger>

//                     <SelectContent>
//                       <SelectItem value={PLATFORMS.INSTAGRAM}>Instagram</SelectItem>
//                       <SelectItem value={PLATFORMS.TIKTOK}>TikTok</SelectItem>
//                       <SelectItem value={PLATFORMS.YOUTUBE}>YouTube</SelectItem>
//                     </SelectContent>
//                   </Select>

//                   <p className="text-primary text-sm">{fields.platform.errors}</p>
//                 </div>

//               </div>
//             </SectionCard>

//             {/* ── Reach & Tier ── */}
//             <SectionCard label="Reach & Tier">
//               <div className="space-y-4">
//                 {/* Tier */}
//                 <div className="space-y-1.5">
//                   <FieldLabel required>Creator tier</FieldLabel>
//                   <Select
//                     name={fields.tier.name}
//                     key={fields.tier.key}
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select your tier" />
//                     </SelectTrigger>

//                     <SelectContent>
//                       <SelectItem value={TIERS.NANO}>Nano (0 - 10K)</SelectItem>
//                       <SelectItem value={TIERS.MICRO}>Micro (10K - 100K)</SelectItem>
//                       <SelectItem value={TIERS.MACRO}>Macro (100K - 1M)</SelectItem>
//                       <SelectItem value={TIERS.MEGA}>Mega (1M+)</SelectItem>
//                     </SelectContent>
//                   </Select>

//                   <p className="text-primary text-sm">{fields.tier.errors}</p>
//                 </div>

//                 {/* Followers + Engagement */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//                   {/* Followers */}
//                   <div className="space-y-1.5">
//                     <FieldLabel required>Follower count</FieldLabel>

//                     <div className="flex items-center border border-input rounded-md overflow-hidden h-9 focus-within:ring-neutral-gray">

//                       <input
//                         type="number"
//                         min={0}
//                         className="flex-1 px-3 h-full text-sm bg-background outline-none"
//                         placeholder="e.g. 45000"
//                         name={fields.follower_count.name}
//                       />

//                       <span className="px-2.5 h-full flex items-center bg-muted border-l border-border text-xs text-muted-foreground">
//                         followers
//                       </span>

//                     </div>

//                     <p className="text-primary text-sm">{fields.follower_count.errors}</p>
//                   </div>

//                   {/* Engagement */}
//                   <div className="space-y-1.5">
//                     <FieldLabel required>Engagement rate</FieldLabel>

//                     <div className="flex items-center border border-input rounded-md overflow-hidden h-9 focus-within:ring-neutral-gray">

//                       <input
//                         type="number"
//                         min={0}
//                         step="0.1"
//                         className="flex-1 px-3 h-full text-sm bg-background outline-none"
//                         placeholder="e.g. 4.2"
//                         name={fields.engagement_rate.name}
//                       />

//                       <span className="px-2.5 h-full flex items-center bg-muted border-l border-border text-xs text-muted-foreground">
//                         %
//                       </span>

//                     </div>

//                     <p className="text-primary text-sm">{fields.engagement_rate.errors}</p>
//                   </div>

//                 </div>
//               </div>
//             </SectionCard>

//             {/* ── Content Niche ── */}
//             <SectionCard label="Content Niche">
//               <div className="space-y-1.5 w-full">
//                 <FieldLabel required>Select your niche</FieldLabel>

//                 <Select
//                   name={fields.niche.name}
//                   key={fields.niche.key}
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select your niche" />
//                   </SelectTrigger>

//                   <SelectContent>
//                     <SelectItem value={NICHES.COLLEGE_LIFE}>College Life</SelectItem>
//                     <SelectItem value={NICHES.DATING}>Dating</SelectItem>
//                     <SelectItem value={NICHES.FITNESS}>Fitness</SelectItem>
//                     <SelectItem value={NICHES.FOOD}>Food</SelectItem>
//                     <SelectItem value={NICHES.GENZ_ENTERTAINMENT}>Gen Z Entertainment</SelectItem>
//                     <SelectItem value={NICHES.LIFE_STYLE}>Lifestyle</SelectItem>
//                     <SelectItem value={NICHES.TRAVEL}>Travel</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 <p className="text-primary text-sm">{fields.niche.errors}</p>
//               </div>
//             </SectionCard>

//             {/* ── Contract & Rate ── */}
//             <SectionCard label="Contract & Rate">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {/* Contract Status */}
//                 <div className="space-y-2 w-full">
//                   <FieldLabel required>Contract status</FieldLabel>
//                   <Select
//                     name={fields.contract_status.name}
//                     key={fields.contract_status.key}
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select contract status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value={CONTRACT_STATUS.ACTIVE}>Active</SelectItem>
//                       <SelectItem value={CONTRACT_STATUS.INACTIVE}>Inactive</SelectItem>
//                       <SelectItem value={CONTRACT_STATUS.NEGOTIATING}>Negotiating</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <p className="text-primary text-sm">{fields.contract_status.errors}</p>
//                 </div>

//                 {/* Rate per post */}
//                 <div className="space-y-1.5 w-full">
//                   <FieldLabel>Rate per post</FieldLabel>
//                   <div className="flex items-center border border-input rounded-md overflow-hidden h-9 w-full">
//                     <span className="px-2.5 h-full flex items-center bg-muted border-r border-border text-xs text-muted-foreground">
//                       $
//                     </span>
//                     <input
//                       type="number"
//                       min={0}
//                       className="flex-1 px-3 h-full text-sm bg-background outline-none"
//                       placeholder="e.g. 500"
//                       name={fields.rate.name}
//                     />
//                   </div>
//                 </div>

//               </div>
//             </SectionCard>

//             {/* ── Notes ── */}
//             <SectionCard label="Notes">
//               <div className="space-y-1.5">
//                 <FieldLabel>Internal notes</FieldLabel>
//                 <Textarea
//                   placeholder="Add a note."
//                   className="resize-y min-h-22.5 text-sm focus-visible:ring-neutral-gray focus-visible:ring-0 focus:outline-none"
//                   name={fields.notes.name}
//                 />
//                 <p className="text-primary text-sm">{fields.notes.errors}</p>
//               </div>
//             </SectionCard>

//             {/* ── Submit ── */}
//             {/* <div className="flex justify-end gap-2.5 pt-1"> */}
//               <SubmitButton text="Submit"/>
//             {/* </div> */}
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// }


// function GrangouHeader() {
//   return (
//     <header className="bg-background border-b border-border/50 px-6 sm:px-8 py-4 flex items-center gap-3">
//       <a href="/" className="flex items-center gap-2.5 no-underline">
//         <div
//           className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
//           style={{ background: "#E8272A" }}
//         >
//           <Image src="/grangou-logo.png" alt='logo' width={84} height={80} className=' rounded-md'/>
//         </div>
//         <span
//           className="text-soft-black font-extrabold tracking-tight leading-none text-3xl"
//           style={{ fontFamily: "'Syne', sans-serif" }}
//         >
//           Grangou
//         </span>
//       </a>
//       <span className="ml-auto text-xs text-muted-foreground">Creator Portal · LA Market</span>
//     </header>
//   );
// }
