import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        experts: true,
        registrations: {
          where: { status: 'CONFIRMED' },
          select: { id: true },
        },
      },
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Событие не найдено' },
        { status: 404 }
      )
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении данных' },
      { status: 500 }
    )
  }
}
