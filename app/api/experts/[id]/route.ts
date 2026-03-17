import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const expert = await prisma.expert.findUnique({
      where: { id },
    })

    if (!expert) {
      return NextResponse.json(
        { error: 'Эксперт не найден' },
        { status: 404 }
      )
    }

    return NextResponse.json(expert)
  } catch (error) {
    console.error('Error fetching expert:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении данных' },
      { status: 500 }
    )
  }
}
