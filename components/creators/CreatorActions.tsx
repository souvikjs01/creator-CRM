'use client'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";

export default function CreatorActions({id}: {id: string}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/creators/${id}/edit`}>
            <Pencil className="size-4 mr-2" /> Edit Creator
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/creators/${id}/remove`}>
            <Trash className="size-4 mr-2" /> Delete Creator
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
            <Link href={`/dashboard/creators/${id}/status`}>
              <CheckCircle className="size-4 mr-2" /> Change Status
            </Link>
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
