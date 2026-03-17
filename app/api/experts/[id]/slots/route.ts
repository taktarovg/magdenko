import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const slots = await prisma.expertSlot.findMany({
      where: {
        expertId: id,
        date: {
          gte: new Date(), // Только будущие слоты
        },
      },
      orderBy: { date: 'asc' },
    })

    return NextResponse.json(slots)
  } catch (error) {
    console.error('Error fetching slots:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении слотов' },
      { status: 500 }
    )
  }
}
