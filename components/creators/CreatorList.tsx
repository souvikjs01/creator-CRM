import { getAllCreators } from "@/lib/actions/creator"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/table";
import { dateFormat } from "@/lib/utils";
import { Badge } from "../ui/badge";
import CreatorActions from "./CreatorActions";
import Link from "next/link";
import { StatusBadge } from "./StatusBadge";


export default async function CreatorList() {
    const creatorData = await getAllCreators(); 
  return (
    <>
      {creatorData.length === 0 ? (
        <div>
          {/* todo- create a empty state component */}
          no creator
        </div>
      ) : (
        <Table>
          <TableHeader className=" text-soft-black font-bold">
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Handle</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creatorData.map((creator) => (
              <TableRow key={creator.id}>
                <TableCell className=" capitalize">
                  <Link href={`/dashboard/creators/${creator.id}`}>
                   {creator.full_name}
                  </Link>          
                </TableCell>
                <TableCell className=" capitalize">{creator.platform}</TableCell>
                <TableCell>@{creator.handle}</TableCell>
                <TableCell className=" capitalize">
                  <StatusBadge id={creator.id} status={creator.contract_status} />
                </TableCell>
                <TableCell>
                  {dateFormat(creator.created_at)}
                </TableCell>
                <TableCell className="text-right">
                  <CreatorActions id={creator.id}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

