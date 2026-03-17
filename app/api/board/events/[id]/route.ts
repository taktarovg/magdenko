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

// PUT - Обновить событие
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()

    const data = {
      ...body,
      startDate: body.startDate ? new Date(body.startDate) : undefined,
      endDate: body.endDate ? new Date(body.endDate) : null,
    }

    const event = await prisma.event.update({
      where: { id },
      data,
    })
    
    return NextResponse.json(event)
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json({ error: 'Error updating event' }, { status: 500 })
  }
}

// DELETE - Удалить событие
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.event.delete({
      where: { id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json({ error: 'Error deleting event' }, { status: 500 })
  }
}
