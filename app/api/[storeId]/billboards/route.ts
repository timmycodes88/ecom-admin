import prismadb from '@/lib/pismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    const { label, imageUrl } = await req.json()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!label) return new NextResponse('Missing label', { status: 400 })
    if (!imageUrl) return new NextResponse('Missing image', { status: 400 })
    if (!params.storeId)
      return new NextResponse('Missing storeId', { status: 400 })

    const storeByUserId = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    })

    if (!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    })

    return NextResponse.json(billboard)
  } catch (err) {
    console.log('[BILLBOARDS POST ERROR]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
