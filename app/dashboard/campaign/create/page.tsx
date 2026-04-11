import CreateCampaign from "@/components/campaign/CreateCampaign";
import { ActiveCreator, getActiveCreators } from "@/lib/actions/creator";

export default async function page() {
  const activeCreators: ActiveCreator[] = await getActiveCreators();
  return (
    <CreateCampaign creators={activeCreators}/>
  )
}
