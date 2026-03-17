import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function checkAuth(request: NextRequest) {
  const sessionCookie = request.cookies.get('admin_session')
  if (!sessionCookie) return false
  const admin = await prisma.admin.findUnique({
    where: { id: sessionCookie.value },
  })
  return !!admin
}

// GET - Получить все события
export async function GET(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: 'desc' },
    })
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching events' }, { status: 500 })
  }
}

// POST - Создать событие
export async function POST(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    
    // Преобразуем даты
    const data = {
      ...body,
      startDate: new Date(body.startDate),
      endDate: body.endDate ? new Date(body.endDate) : null,
    }

    const event = await prisma.event.create({
      data,
    })
    
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Error creating event' }, { status: 500 })
  }
}
