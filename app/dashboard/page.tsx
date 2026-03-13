
import { Button } from '@/components/ui/button'
import requiredUser from '@/hooks/requiredUser'
import { signOutAction } from '@/lib/actions/auth'

export default async function page() {
  const user = await requiredUser()

  return (
    <div>
      dashbo

      <form
        className="w-full"
        action={signOutAction}>
        <Button>Log out</Button>
      </form>
    </div>
  )
}
