import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Проверка авторизации
async function checkAuth(request: NextRequest) {
  const sessionCookie = request.cookies.get('admin_session')
  if (!sessionCookie) return false

  const admin = await prisma.admin.findUnique({
    where: { id: sessionCookie.value },
  })

  return !!admin
}

// GET - Получить всех экспертов
export async function GET(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const experts = await prisma.expert.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(experts)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching experts' }, { status: 500 })
  }
}

// POST - Создать эксперта
export async function POST(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const expert = await prisma.expert.create({
      data: body,
    })
    return NextResponse.json(expert, { status: 201 })
  } catch (error) {
    console.error('Error creating expert:', error)
    return NextResponse.json({ error: 'Error creating expert' }, { status: 500 })
  }
}
