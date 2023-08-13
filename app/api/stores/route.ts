import prismadb from '@/lib/pismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const { name } = await req.json()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!name) return new NextResponse('Missing name', { status: 400 })

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    })

    return NextResponse.json(store)
  } catch (err) {
    console.log('[STORES POST ERROR]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
