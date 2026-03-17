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

// PUT - Обновить эксперта
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
    const expert = await prisma.expert.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(expert)
  } catch (error) {
    console.error('Error updating expert:', error)
    return NextResponse.json({ error: 'Error updating expert' }, { status: 500 })
  }
}

// DELETE - Удалить эксперта
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.expert.delete({
      where: { id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting expert:', error)
    return NextResponse.json({ error: 'Error deleting expert' }, { status: 500 })
  }
}
