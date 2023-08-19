import prismadb from '@/lib/pismadb'
import BillboardForm from '../components/billboard-form'

export default async function BillboardPage({
  params: { billboardId },
}: {
  params: { billboardId: string }
}) {
  const billboard = await prismadb.billboard.findUnique({
    where: { id: billboardId },
  })

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}
