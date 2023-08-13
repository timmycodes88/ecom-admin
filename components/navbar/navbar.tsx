import { UserButton, auth } from '@clerk/nextjs'
import MainNav from './main-nav'
import StoreSwitcher from './store-switcher'
import prismadb from '@/lib/pismadb'
import { redirect } from 'next/navigation'

export default async function Navbar() {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const stores = await prismadb.store.findMany({ where: { userId } })

  return (
    <div className='border-b '>
      <div className='flex h-16 items-center px-4'>
        <StoreSwitcher items={stores} />
        <MainNav className='mx-6' />
        <div className='flex items-center space-x-4 ml-auto'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  )
}
