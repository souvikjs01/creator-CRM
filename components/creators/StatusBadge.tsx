"use client";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { updateCreatorStatus } from "@/lib/actions/creator";

const statuses = ["active", "negotiating", "inactive"] as const;

export function StatusBadge({ id, status }: { id: string; status: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge className="cursor-pointer capitalize">{status}</Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {statuses.map((s) => (
          <DropdownMenuItem key={s} onClick={() => updateCreatorStatus(id, s)} className="capitalize">
            {s}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}