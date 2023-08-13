import prismadb from '@/lib/pismadb'

interface DashboardPageProps {
  params: { storeId: string }
}

export default async function DashboardPage({
  params: { storeId },
}: DashboardPageProps) {
  const store = await prismadb.store.findFirst({
    where: { id: storeId },
  })

  return <div>Active Store: {store?.name}</div>
}
