import EditCreatorForm from "@/components/creators/EditCreator";
import { getCreatorById } from "@/lib/actions/creator";

type Params = Promise<{ creatorId: string }>;

export default async function page({ params }: {params: Params}) {
  const { creatorId } = await params;
  const data = await getCreatorById(creatorId);
  
  return (
    <EditCreatorForm creator={data}/>
  )
}
