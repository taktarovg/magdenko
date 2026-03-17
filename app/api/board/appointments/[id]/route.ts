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
    const appointment = await prisma.appointment.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(appointment)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating appointment' }, { status: 500 })
  }
}
