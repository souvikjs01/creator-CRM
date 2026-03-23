import requiredUser from '@/hooks/requiredUser'

export default async function page() {
  const user = await requiredUser()

  return (
    <div>
      dashboard
    </div>
  )
}
