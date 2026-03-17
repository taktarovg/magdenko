'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, MapPin, Users, Clock, Wifi, Home, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { formatDate, formatTime } from '@/lib/utils'

type Event = {
  id: string
  title: string
  description: string
  content: string | null
  image: string | null
  startDate: string
  endDate: string | null
  location: string | null
  format: string
  price: string | null
  maxSeats: number | null
  bookedSeats: number
  category: string | null
  organizer: string | null
  experts: Array<{
    id: string
    name: string
    specialty: string
    photo: string | null
  }>
}

export default function EventPage() {
  const params = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetchEvent()
  }, [params.id])

  const fetchEvent = async () => {
    try {
      const res = await fetch(`/api/events/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setEvent(data)
      }
    } catch (error) {
      console.error('Error fetching event:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')

    try {
      const res = await fetch(`/api/events/${params.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        fetchEvent() // Обновляем данные события
      } else {
        alert(data.error || 'Ошибка при регистрации')
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Загрузка...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Событие не найдено</h2>
            <p className="text-gray-600">Возможно, оно было удалено или перемещено</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const FormatIcon = event.format === 'ONLINE' ? Wifi : event.format === 'OFFLINE' ? Home : MapPin
  const formatLabel = event.format === 'ONLINE' ? 'Онлайн' : event.format === 'OFFLINE' ? 'Очно' : 'Гибридный формат'
  const availableSeats = event.maxSeats ? event.maxSeats - event.bookedSeats : null
  const isFull = availableSeats !== null && availableSeats <= 0

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {event.image && (
              <div className="max-w-4xl mx-auto mb-8 rounded-2xl overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-auto"
                />
              </div>
            )}
            
            <div className="max-w-4xl mx-auto">
              {event.category && (
                <div className="mb-4">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>
              )}
              
              <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{event.description}</p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{formatDate(new Date(event.startDate))}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{formatTime(new Date(event.startDate))}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <FormatIcon className="h-5 w-5 text-primary" />
                  <span>{formatLabel}</span>
                </div>
                
                {event.location && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{event.location}</span>
                  </div>
                )}
                
                {availableSeats !== null && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="h-5 w-5 text-primary" />
                    <span>
                      {isFull ? 'Мест нет' : `Осталось мест: ${availableSeats}`}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="font-semibold">
                    {event.price || 'Бесплатно'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        {event.content && (
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto prose prose-lg">
                {event.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experts */}
        {event.experts.length > 0 && (
          <section className="bg-muted py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Ведущие</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {event.experts.map((expert) => (
                    <Card key={expert.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          {expert.photo ? (
                            <img 
                              src={expert.photo}
                              alt={expert.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-8 w-8 text-primary" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-lg">{expert.name}</h3>
                            <p className="text-sm text-gray-600">{expert.specialty}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Registration */}
        {!isFull && (
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Регистрация на событие</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Заполните форму</CardTitle>
                    <CardDescription>
                      Мы свяжемся с вами для подтверждения регистрации
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Input
                          placeholder="Ваше имя *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="tel"
                          placeholder="Телефон *"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="Комментарий (необязательно)"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={3}
                        />
                      </div>

                      {submitStatus === 'success' && (
                        <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                          Спасибо! Ваша регистрация принята. Мы свяжемся с вами для подтверждения.
                        </div>
                      )}

                      {submitStatus === 'error' && (
                        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                          Ошибка при регистрации. Попробуйте позже.
                        </div>
                      )}

                      <Button type="submit" className="w-full" size="lg">
                        Зарегистрироваться
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {isFull && (
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <div className="max-w-2xl mx-auto">
                <Users className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Все места заняты</h3>
                <p className="text-gray-600 mb-6">
                  К сожалению, на это событие уже нет свободных мест. Следите за анонсами новых событий!
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
