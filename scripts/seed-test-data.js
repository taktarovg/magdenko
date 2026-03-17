const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Создание тестовых данных...\n')

  // 1. Создаем экспертов
  console.log('👥 Создание экспертов...')
  
  const expert1 = await prisma.expert.create({
    data: {
      name: 'Анна Иванова',
      specialty: 'Семейный психолог',
      description: 'Специалист по семейным отношениям и парной терапии. Работаю с конфликтами в паре, кризисами в отношениях.',
      bio: 'Закончила МГУ им. Ломоносова, факультет психологии. Более 10 лет опыта работы с семейными парами. Прошла обучение по системной семейной терапии.',
      email: 'anna.ivanova@example.com',
      phone: '+7 913 111 2233',
      telegram: 'anna_psy',
      experience: '10 лет',
      education: 'МГУ им. Ломоносова, факультет психологии (2013)',
      approaches: 'Системная семейная терапия, Эмоционально-фокусированная терапия',
      price: 'от 4500 ₽',
      duration: '60 минут',
      isActive: true,
      isFree: true,
      order: 1,
    },
  })

  const expert2 = await prisma.expert.create({
    data: {
      name: 'Михаил Петров',
      specialty: 'Клинический психолог, КПТ-терапевт',
      description: 'Работаю с тревожными расстройствами, депрессией, паническими атаками. Специализируюсь на когнитивно-поведенческой терапии.',
      bio: 'Образование: НГУ, клиническая психология. Сертифицированный КПТ-терапевт. Работаю в направлении доказательной психотерапии.',
      email: 'mikhail.petrov@example.com',
      phone: '+7 913 222 3344',
      telegram: 'mikhail_cbt',
      experience: '8 лет',
      education: 'НГУ, клиническая психология (2015)',
      approaches: 'КПТ, Схема-терапия, EMDR',
      price: 'от 5000 ₽',
      duration: '50 минут',
      isActive: true,
      isFree: true,
      order: 2,
    },
  })

  const expert3 = await prisma.expert.create({
    data: {
      name: 'Елена Смирнова',
      specialty: 'Детский психолог',
      description: 'Помогаю детям и подросткам справляться с эмоциональными трудностями, проблемами в школе и семье.',
      bio: 'Специализируюсь на работе с детьми от 5 до 17 лет. Использую игровую терапию, арт-терапию.',
      email: 'elena.smirnova@example.com',
      phone: '+7 913 333 4455',
      telegram: 'elena_child_psy',
      experience: '12 лет',
      education: 'НГПУ, детская психология (2011)',
      approaches: 'Игровая терапия, Арт-терапия, Сказкотерапия',
      price: 'от 4000 ₽',
      duration: '60 минут',
      isActive: true,
      isFree: true,
      order: 3,
    },
  })

  console.log(`✅ Создано экспертов: 3\n`)

  // 2. Создаем слоты для записи
  console.log('📅 Создание временных слотов...')
  
  const today = new Date()
  const slots = []

  // Создаем слоты на следующие 7 дней для каждого эксперта
  for (let day = 1; day <= 7; day++) {
    for (let hour of [10, 12, 14, 16, 18]) {
      const slotDate = new Date(today)
      slotDate.setDate(today.getDate() + day)
      slotDate.setHours(hour, 0, 0, 0)

      // Для каждого эксперта
      for (let expert of [expert1, expert2, expert3]) {
        slots.push({
          expertId: expert.id,
          date: slotDate,
          duration: 60,
          isBooked: false,
        })
      }
    }
  }

  await prisma.expertSlot.createMany({ data: slots })
  console.log(`✅ Создано слотов: ${slots.length}\n`)

  // 3. Создаем события
  console.log('📆 Создание событий...')

  const event1 = await prisma.event.create({
    data: {
      title: 'Балинтовская группа для психологов',
      description: 'Профессиональная супервизия для психологов и специалистов помогающих профессий',
      content: 'Балинтовская группа — это форма групповой супервизии для специалистов помогающих профессий. На встречах мы разбираем сложные случаи из практики, обсуждаем трудности в работе с клиентами, получаем поддержку коллег.\n\nФормат: очные встречи раз в месяц, длительность 3 часа.\n\nДля кого: для практикующих психологов, психотерапевтов, консультантов.',
      startDate: new Date(new Date().setDate(today.getDate() + 5)),
      endDate: new Date(new Date().setDate(today.getDate() + 5)),
      location: 'ул. Красный проспект, 82, оф. 405',
      format: 'OFFLINE',
      price: '2000 ₽',
      maxSeats: 12,
      bookedSeats: 5,
      isActive: true,
      isPublished: true,
      category: 'Супервизия',
      organizer: 'Ольга Магденко',
    },
  })

  const event2 = await prisma.event.create({
    data: {
      title: 'Мастер-класс: Работа с тревогой',
      description: 'Практический мастер-класс по работе с тревожными состояниями в терапии',
      content: 'На мастер-классе разберем:\n- Виды тревожных расстройств\n- Протоколы КПТ для работы с тревогой\n- Техники релаксации и заземления\n- Разбор практических кейсов\n\nВедущий: Михаил Петров, КПТ-терапевт',
      startDate: new Date(new Date().setDate(today.getDate() + 10)),
      location: 'Zoom (ссылка будет выслана после регистрации)',
      format: 'ONLINE',
      price: 'Бесплатно',
      maxSeats: 50,
      bookedSeats: 12,
      isActive: true,
      isPublished: true,
      category: 'Мастер-класс',
      organizer: 'Михаил Петров',
    },
  })

  const event3 = await prisma.event.create({
    data: {
      title: 'Школа осознанного родительства',
      description: 'Курс для будущих родителей: подготовка к родам и материнству',
      content: 'Программа курса:\n- Психология беременности\n- Подготовка к родам\n- Послеродовый период\n- Привязанность и развитие ребенка\n- Баланс в материнстве\n\n8 занятий по 2 часа. Группа до 10 человек.',
      startDate: new Date(new Date().setDate(today.getDate() + 15)),
      location: 'ул. Ленина, 15, центр "Семья"',
      format: 'OFFLINE',
      price: '15000 ₽ за курс',
      maxSeats: 10,
      bookedSeats: 3,
      isActive: true,
      isPublished: true,
      category: 'Курс',
      organizer: 'Ольга Магденко',
    },
  })

  console.log(`✅ Создано событий: 3\n`)

  // 4. Создаем тестовые заявки
  console.log('📝 Создание тестовых заявок...')

  await prisma.appointment.create({
    data: {
      name: 'Мария Сидорова',
      email: 'maria@example.com',
      phone: '+7 913 444 5566',
      service: 'Индивидуальное консультирование',
      date: new Date(new Date().setDate(today.getDate() + 2)),
      message: 'Хочу проработать тревогу и панические атаки',
      status: 'PENDING',
      expertId: expert2.id,
    },
  })

  await prisma.appointment.create({
    data: {
      name: 'Алексей Козлов',
      email: 'alexey@example.com',
      phone: '+7 913 555 6677',
      service: 'Семейное консультирование',
      date: new Date(new Date().setDate(today.getDate() + 3)),
      message: 'Нужна консультация с женой по поводу конфликтов',
      status: 'CONFIRMED',
      expertId: expert1.id,
    },
  })

  await prisma.appointment.create({
    data: {
      name: 'Ирина Новикова',
      email: 'irina@example.com',
      phone: '+7 913 666 7788',
      service: 'Детская психология',
      date: new Date(new Date().setDate(today.getDate() + 1)),
      message: 'Ребенок 7 лет, проблемы с адаптацией в школе',
      status: 'PENDING',
      expertId: expert3.id,
    },
  })

  console.log(`✅ Создано заявок: 3\n`)

  // 5. Создаем регистрации на события
  console.log('🎫 Создание регистраций на события...')

  await prisma.eventRegistration.createMany({
    data: [
      {
        eventId: event1.id,
        name: 'Дмитрий Волков',
        email: 'dmitry@example.com',
        phone: '+7 913 777 8899',
        status: 'CONFIRMED',
      },
      {
        eventId: event2.id,
        name: 'Светлана Орлова',
        email: 'svetlana@example.com',
        phone: '+7 913 888 9900',
        status: 'CONFIRMED',
      },
      {
        eventId: event3.id,
        name: 'Екатерина Белова',
        email: 'ekaterina@example.com',
        phone: '+7 913 999 0011',
        message: 'Беременность 20 недель',
        status: 'PENDING',
      },
    ],
  })

  console.log(`✅ Создано регистраций: 3\n`)

  console.log('🎉 Тестовые данные созданы успешно!\n')
  console.log('📊 Итого:')
  console.log('   - 3 эксперта')
  console.log(`   - ${slots.length} временных слотов`)
  console.log('   - 3 события')
  console.log('   - 3 заявки на консультацию')
  console.log('   - 3 регистрации на события')
  console.log('\n✨ Готово! Можно проверять админ-панель.')
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
