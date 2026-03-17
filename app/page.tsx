import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Users, Baby, UserCircle, User, Calendar, MapPin } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

const services = [
  {
    icon: UserCircle,
    title: 'Индивидуальное консультирование',
    description: 'Работа с личными проблемами, тревогой, депрессией, самооценкой и жизненными кризисами',
    href: '/services#individual',
  },
  {
    icon: Users,
    title: 'Семейное консультирование',
    description: 'Помощь в семейных отношениях, разрешение конфликтов, преодоление кризисов',
    href: '/services#family',
  },
  {
    icon: Baby,
    title: 'Перинатальная психология',
    description: 'Психологическое сопровождение беременности, подготовка к родам и родительству',
    href: '/services#perinatal',
  },
  {
    icon: Heart,
    title: 'Детская психология',
    description: 'Работа с детьми и подростками, помощь родителям в воспитании',
    href: '/services#child',
  },
]

const benefits = [
  'Более 20 лет профессионального опыта',
  'Кандидат психологических наук',
  'Преподаватель НГУ и НГПУ',
  'Супервизор и руководитель Балинтовских групп',
  'Работа в различных психологических подходах',
  'Онлайн и очные консультации',
]

export default async function Home() {
  // Получаем 3 эксперта
  const experts = await prisma.expert.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    take: 3,
  })

  // Получаем 3 ближайших события
  const events = await prisma.event.findMany({
    where: {
      isPublished: true,
      isActive: true,
      startDate: { gte: new Date() },
    },
    orderBy: { startDate: 'asc' },
    take: 3,
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                  Профессиональная психологическая помощь для вашего благополучия
                </h1>
                <p className="mb-8 text-lg text-gray-600">
                  Я предоставляю квалифицированную психотерапевтическую помощь, чтобы помочь вам преодолеть трудности и улучшить качество жизни
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contacts">
                    <Button size="lg">Записаться на консультацию</Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" size="lg">Обо мне</Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-auto lg:h-[500px]">
                <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 w-full h-full flex items-center justify-center">
                  <p className="text-primary text-center px-8">
                    [Здесь будет фото психолога]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Психолог Ольга Магденко</h2>
              <p className="text-lg text-gray-600">
                Я практикующий психолог, канд.психол.наук, стаж более 20 лет. 
                Помогаю стать осознанным человеком, способным справляться с жизненными трудностями.
              </p>
              <Link href="/about" className="mt-6 inline-block">
                <Button variant="link">Подробнее обо мне →</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-muted py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Услуги</h2>
              <p className="text-lg text-gray-600">Форматы работы: очно и онлайн</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Card key={service.title} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">{service.description}</CardDescription>
                      <Link href={service.href}>
                        <Button variant="link" className="p-0">Подробнее →</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <div className="mt-12 text-center">
              <Link href="/services">
                <Button size="lg">Все услуги</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Experts Section */}
        {experts.length > 0 && (
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold">Наши коллеги</h2>
                <p className="text-lg text-gray-600">
                  Проверенные специалисты с большим опытом работы
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {experts.map((expert) => (
                  <Card key={expert.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mb-4">
                        {expert.photo ? (
                          <img 
                            src={expert.photo}
                            alt={expert.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-48 bg-primary/10 rounded-lg flex items-center justify-center">
                            <User className="h-16 w-16 text-primary" />
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl">{expert.name}</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {expert.specialty}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {expert.description}
                      </p>
                      <div className="flex items-center justify-between">
                        {expert.experience && (
                          <span className="text-sm text-gray-500">
                            Опыт: {expert.experience}
                          </span>
                        )}
                        {expert.isFree && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Бесплатная запись
                          </span>
                        )}
                      </div>
                      <Link href={`/colleagues/${expert.id}`} className="mt-4 block">
                        <Button variant="outline" className="w-full">
                          Подробнее
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-12 text-center">
                <Link href="/colleagues">
                  <Button size="lg">Все специалисты</Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Events Section */}
        {events.length > 0 && (
          <section className="bg-muted py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold">Ближайшие события</h2>
                <p className="text-lg text-gray-600">
                  Мастер-классы, группы, семинары для специалистов и клиентов
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => {
                  const availableSeats = event.maxSeats ? event.maxSeats - event.bookedSeats : null
                  const isFull = availableSeats !== null && availableSeats <= 0

                  return (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow">
                      {event.image && (
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <img 
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        {event.category && (
                          <div className="mb-2">
                            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                              {event.category}
                            </span>
                          </div>
                        )}
                        <CardTitle className="text-xl line-clamp-2">
                          {event.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{formatDate(new Date(event.startDate))}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                          )}
                          {availableSeats !== null && (
                            <div className="flex items-center justify-between pt-2">
                              <span className="font-medium">
                                {event.price || 'Бесплатно'}
                              </span>
                              {!isFull && (
                                <span className="text-xs text-gray-500">
                                  Осталось: {availableSeats}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <Link href={`/events/${event.id}`}>
                          <Button 
                            variant={isFull ? 'outline' : 'default'} 
                            className="w-full"
                            disabled={isFull}
                          >
                            {isFull ? 'Мест нет' : 'Подробнее'}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
              <div className="mt-12 text-center">
                <Link href="/events">
                  <Button size="lg">Вся афиша</Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-3xl font-bold">Почему стоит обратиться ко мне?</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 text-white lg:py-24">
          <div className="container mx-auto px-4 text-center lg:px-8">
            <h2 className="mb-4 text-3xl font-bold">Готовы начать путь к изменениям?</h2>
            <p className="mb-8 text-lg text-white/90">
              Запишитесь на консультацию, и мы вместе найдем решение вашей ситуации
            </p>
            <Link href="/contacts">
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
                Записаться на консультацию
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
