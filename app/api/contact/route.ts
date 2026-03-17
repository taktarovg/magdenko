import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Валидация
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      )
    }

    // Сохранение в базу данных
    const contactForm = await prisma.contactForm.create({
      data: {
        name,
        email,
        phone,
        message: message || '',
      },
    })

    // TODO: Отправка email уведомления (добавим позже)
    // TODO: Отправка в Telegram (добавим позже)

    return NextResponse.json(
      { success: true, data: contactForm },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Произошла ошибка при отправке формы' },
      { status: 500 }
    )
  }
}
