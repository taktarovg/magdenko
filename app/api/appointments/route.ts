import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, expertId, slotId } = body

    // Валидация
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      )
    }

    // Если указан слот, проверяем его доступность
    if (slotId) {
      const slot = await prisma.expertSlot.findUnique({
        where: { id: slotId },
      })

      if (!slot) {
        return NextResponse.json(
          { error: 'Слот не найден' },
          { status: 404 }
        )
      }

      if (slot.isBooked) {
        return NextResponse.json(
          { error: 'К сожалению, это время уже занято' },
          { status: 400 }
        )
      }

      // Бронируем слот
      await prisma.expertSlot.update({
        where: { id: slotId },
        data: {
          isBooked: true,
          bookedBy: email,
        },
      })

      // Создаем запись на консультацию
      const appointment = await prisma.appointment.create({
        data: {
          name,
          email,
          phone,
          service: 'Консультация эксперта',
          date: slot.date,
          message: message || '',
          expertId,
          status: 'PENDING',
        },
      })

      return NextResponse.json(
        { success: true, data: appointment },
        { status: 201 }
      )
    }

    // Если слот не указан, просто создаем заявку
    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        service: 'Общая консультация',
        date: new Date(),
        message: message || '',
        expertId,
        status: 'PENDING',
      },
    })

    return NextResponse.json(
      { success: true, data: appointment },
      { status: 201 }
    )
  } catch (error) {
    console.error('Appointment error:', error)
    return NextResponse.json(
      { error: 'Произошла ошибка при создании записи' },
      { status: 500 }
    )
  }
}
