import prismadb from '@/lib/pismadb'
import SettingsForm from './components/settings-form'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface SettingsPageProps {
  params: { storeId: string }
}

export default async function SettingsPage({
  params: { storeId },
}: SettingsPageProps) {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const store = await prismadb.store.findFirst({
    where: { id: storeId, userId },
  })

  if (!store) redirect('/')

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}
