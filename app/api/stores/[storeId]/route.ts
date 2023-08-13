import prismadb from '@/lib/pismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const { name } = await req.json()

    if (!name) return new NextResponse('Missing name', { status: 400 })

    const { storeId } = params

    if (!storeId) return new NextResponse('Missing storeId', { status: 400 })

    const store = await prismadb.store.updateMany({
      where: { userId, id: storeId },
      data: { name },
    })

    return NextResponse.json(store)
  } catch (err) {
    console.log('[STORES PATCH ERROR]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const { storeId } = params

    if (!storeId) return new NextResponse('Missing storeId', { status: 400 })

    const store = await prismadb.store.deleteMany({
      where: { userId, id: storeId },
    })

    return NextResponse.json(store)
  } catch (err) {
    console.log('[STORES DELETE ERROR]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
