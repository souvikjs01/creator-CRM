import CreatorProfile from "@/components/creators/CreatorProfile";
import { getCreatorById } from "@/lib/actions/creator";
import { notFound } from "next/navigation";

type Params = Promise<{ creatorId: string }>;

export default async function page({params}: {params: Params}) {
    const { creatorId } = await params
    const data = await getCreatorById(creatorId);
    if(!data) {
        return notFound();
    }

    return (
        <CreatorProfile creatorData={data}/>
    )
}