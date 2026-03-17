const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Создание администратора...')

  // Проверяем, есть ли уже админ
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: 'adminom' },
  })

  if (existingAdmin) {
    console.log('⚠️  Администратор с email "adminom" уже существует')
    return
  }

  // Хешируем пароль
  const hashedPassword = await bcrypt.hash('159357', 10)

  // Создаем админа
  const admin = await prisma.admin.create({
    data: {
      email: 'adminom',
      password: hashedPassword,
      name: 'Администратор',
      role: 'admin',
    },
  })

  console.log('✅ Администратор создан успешно!')
  console.log('📧 Email (логин): adminom')
  console.log('🔑 Пароль: 159357')
  console.log('🔗 Войти: http://localhost:3000/board/login')
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
