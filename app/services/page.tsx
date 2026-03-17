import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserCircle, Users, Baby, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Услуги',
  description: 'Психологические услуги: индивидуальное, семейное, перинатальное консультирование, детская психология',
}

const services = [
  {
    id: 'individual',
    icon: UserCircle,
    title: 'Индивидуальное психологическое консультирование',
    price: 'от 5 000 ₽',
    duration: '60 минут',
    formats: 'Очно и онлайн',
    issues: [
      '☯️ Выгорание, внутренние конфликты, неуверенность в себе',
      '☯️ Проблемы с самооценкой',
      '☯️ Страхи, фобии, тревога, навязчивые мысли (ОКР)',
      '☯️ Чувства одиночества, пустоты, отсутствие радости',
      '☯️ Депрессивные состояния, панические атаки',
      '☯️ Вопросы карьеры и финансов, поиск своего дела',
      '👤 Сложности в отношениях',
      '👤 Проблемы с партнером, родителями',
      '👤 Межличностные конфликты',
      '👤 Зависимость от чужого мнения',
      '❤️ Здоровье, ипохондрия',
      '❤️ Психосоматические заболевания',
      '❤️ Психологическое бесплодие',
      '❤️ Сопровождение лечения тяжелых заболеваний',
      '❤️ Проблема лишнего веса, РПП',
      '🤯 Работа с травмами и сложными событиями',
      '🤯 Смерть близкого, перинатальная утрата',
      '🤯 Переезд, иммиграция, развод',
    ],
  },
  {
    id: 'family',
    icon: Users,
    title: 'Семейное психологическое консультирование',
    price: 'от 7 500 ₽',
    duration: '60 минут',
    formats: 'Очно и онлайн',
    issues: [
      '👥 Сложности в отношениях с партнером',
      '👥 Проблемы в отношениях с детьми',
      '👥 Кризис в семейных отношениях',
      '👥 Ссоры и конфликты',
      '👥 Невозможность договориться',
      '👥 Созависимые отношения',
      '👥 Измена, развод',
      '👥 Восстановление доверия',
    ],
  },
  {
    id: 'perinatal',
    icon: Baby,
    title: 'Перинатальное психологическое сопровождение',
    price: 'Индивидуально от 5 000 ₽ / Семейно от 7 500 ₽',
    duration: '60 минут',
    formats: 'Очно и онлайн',
    issues: [
      '🤰 Внутренние конфликты: карьера или рождение ребёнка',
      '🤰 Психологическое бесплодие',
      '🤰 Страх родов, страх за жизнь ребёнка',
      '🤰 Страх смерти в родах, фобии',
      '🤰 Неготовность иметь ребёнка',
      '🤰 Непринятие внешних изменений в период беременности',
      '🤰 Тревожность, суицидальные мысли',
      '🤰 Перинатальная утрата',
      '🤱 Осознанное родительство',
      '🤱 Психологическое сопровождение в период беременности',
      '🤱 Сопровождение в послеродовом периоде',
      '🤱 Обучение поведению в родах',
      '🤱 Послеродовая депрессия',
    ],
  },
  {
    id: 'child',
    icon: Heart,
    title: 'Детская и подростковая психология',
    price: 'от 4 500 ₽',
    duration: '60 минут',
    formats: 'Очно и онлайн',
    issues: [
      '🔥 Возрастные кризисы',
      '🔥 Непослушание ребёнка',
      '🔥 Адаптация ребёнка к детскому саду или школе',
      '🔥 Ребёнок и развод родителей',
      '🔥 Наказания ребёнка',
      '🔥 Ребёнок врёт и что-то скрывает',
      '🔥 Ребёнок и компьютерные игры, телефон',
      '🔥 Сложно договориться с ребёнком',
      '🧑 Подросток грубит и прогуливает школу',
      '🧑 Подросток и вредные привычки',
      '🧑 Школьная любовь и ранние отношения',
      '🧑 Школьный буллинг',
      '🧑 Проблемы с социализацией',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">Услуги</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Профессиональная психологическая помощь в различных форматах
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="space-y-16">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <div key={service.id} id={service.id} className="scroll-mt-20">
                    <Card className="overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-7 w-7 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div>
                                <strong className="text-primary">Стоимость:</strong> {service.price}
                              </div>
                              <div>
                                <strong className="text-primary">Длительность:</strong> {service.duration}
                              </div>
                              <div>
                                <strong className="text-primary">Форматы:</strong> {service.formats}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-4">С какими вопросами можно обратиться:</h3>
                        <div className="grid gap-2 md:grid-cols-2">
                          {service.issues.map((issue, index) => (
                            <div key={index} className="flex items-start gap-2 text-gray-700">
                              <span className="text-primary mt-1">•</span>
                              <span>{issue}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-6 border-t">
                          <Link href="/contacts">
                            <Button size="lg">Записаться на консультацию</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="mb-4 text-3xl font-bold">Не нашли ответ на свой вопрос?</h2>
            <p className="mb-8 text-lg text-gray-600">
              Свяжитесь со мной, и мы обсудим вашу ситуацию
            </p>
            <Link href="/contacts">
              <Button size="lg">Связаться</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
