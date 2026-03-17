import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('admin_session')

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
      )
    }

    const admin = await prisma.admin.findUnique({
      where: { id: sessionCookie.value },
      select: { id: true, email: true, name: true },
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
      )
    }

    return NextResponse.json({ admin })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка проверки авторизации' },
      { status: 500 }
    )
  }
}
