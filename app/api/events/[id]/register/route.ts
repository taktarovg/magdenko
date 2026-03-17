import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, email, phone, message } = body

    // Валидация
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      )
    }

    // Проверяем событие
    const event = await prisma.event.findUnique({
      where: { id },
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Событие не найдено' },
        { status: 404 }
      )
    }

    if (!event.isPublished || !event.isActive) {
      return NextResponse.json(
        { error: 'Регистрация на это событие недоступна' },
        { status: 400 }
      )
    }

    // Проверяем доступность мест
    if (event.maxSeats && event.bookedSeats >= event.maxSeats) {
      return NextResponse.json(
        { error: 'К сожалению, все места заняты' },
        { status: 400 }
      )
    }

    // Проверяем, не зарегистрирован ли уже этот email
    const existingRegistration = await prisma.eventRegistration.findFirst({
      where: {
        eventId: id,
        email,
        status: { not: 'CANCELLED' },
      },
    })

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'Вы уже зарегистрированы на это событие' },
        { status: 400 }
      )
    }

    // Создаем регистрацию
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: id,
        name,
        email,
        phone,
        message: message || '',
        status: 'PENDING',
      },
    })

    // Увеличиваем счетчик забронированных мест
    await prisma.event.update({
      where: { id },
      data: {
        bookedSeats: { increment: 1 },
      },
    })

    return NextResponse.json(
      { success: true, data: registration },
      { status: 201 }
    )
  } catch (error) {
    console.error('Event registration error:', error)
    return NextResponse.json(
      { error: 'Произошла ошибка при регистрации' },
      { status: 500 }
    )
  }
}
