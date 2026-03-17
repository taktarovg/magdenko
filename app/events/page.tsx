import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calendar, MapPin, Users, Clock, Wifi, Home } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate, formatTime } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Афиша',
  description: 'Предстоящие события, мастер-классы, семинары и групповые практики',
}

async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      where: {
        isPublished: true,
        startDate: {
          gte: new Date(),
        },
      },
      include: {
        experts: true,
      },
      orderBy: { startDate: 'asc' },
    })
    return events
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

const getFormatIcon = (format: string) => {
  switch (format) {
    case 'ONLINE':
      return Wifi
    case 'OFFLINE':
      return Home
    default:
      return MapPin
  }
}

const getFormatLabel = (format: string) => {
  switch (format) {
    case 'ONLINE':
      return 'Онлайн'
    case 'OFFLINE':
      return 'Очно'
    case 'HYBRID':
      return 'Гибридный формат'
    default:
      return format
  }
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-white py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">Афиша</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Мастер-классы, семинары, групповые практики и другие события
            </p>
          </div>
        </section>

        {/* Events */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            {events.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => {
                  const FormatIcon = getFormatIcon(event.format)
                  const availableSeats = event.maxSeats ? event.maxSeats - event.bookedSeats : null
                  const isFull = availableSeats !== null && availableSeats <= 0

                  return (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                      {event.image ? (
                        <div className="aspect-video w-full overflow-hidden">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video w-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Calendar className="h-16 w-16 text-primary/40" />
                        </div>
                      )}
                      
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {event.category || 'Событие'}
                          </span>
                          {isFull && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              Мест нет
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {event.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(event.startDate)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(event.startDate)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FormatIcon className="h-4 w-4" />
                          <span>{getFormatLabel(event.format)}</span>
                        </div>

                        {event.location && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        )}

                        {availableSeats !== null && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>Осталось мест: {availableSeats}</span>
                          </div>
                        )}

                        <div className="pt-2">
                          <div className="text-sm mb-2">
                            {event.price ? (
                              <span className="font-semibold text-primary">{event.price}</span>
                            ) : (
                              <span className="font-semibold text-green-600">Бесплатно</span>
                            )}
                          </div>
                          <Link href={`/events/${event.id}`}>
                            <Button className="w-full" disabled={isFull}>
                              {isFull ? 'Мест нет' : 'Подробнее'}
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <Calendar className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Скоро будут новые события</h3>
                <p className="text-gray-600 mb-6">
                  Следите за обновлениями или подпишитесь на рассылку
                </p>
                <Link href="/contacts">
                  <Button>Связаться</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Categories */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Виды событий</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white rounded-lg p-6">
                  <div className="text-3xl mb-2">🎓</div>
                  <h3 className="font-semibold mb-2">Семинары</h3>
                  <p className="text-sm text-gray-600">Образовательные программы для специалистов</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <div className="text-3xl mb-2">👥</div>
                  <h3 className="font-semibold mb-2">Групповые практики</h3>
                  <p className="text-sm text-gray-600">Терапевтические и супервизорские группы</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <div className="text-3xl mb-2">✨</div>
                  <h3 className="font-semibold mb-2">Мастер-классы</h3>
                  <p className="text-sm text-gray-600">Практические занятия по конкретным темам</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
