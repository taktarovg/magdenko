'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UserCircle, Mail, Phone, Send, GraduationCap, Award, Clock, DollarSign, Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { formatDate } from '@/lib/utils'

type Expert = {
  id: string
  name: string
  specialty: string
  description: string
  bio: string | null
  photo: string | null
  email: string
  phone: string | null
  telegram: string | null
  experience: string | null
  education: string | null
  approaches: string | null
  price: string | null
  duration: string | null
  isFree: boolean
}

type TimeSlot = {
  id: string
  date: string
  duration: number
  isBooked: boolean
}

export default function ExpertPage() {
  const params = useParams()
  const [expert, setExpert] = useState<Expert | null>(null)
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetchExpert()
    fetchSlots()
  }, [params.id])

  const fetchExpert = async () => {
    try {
      const res = await fetch(`/api/experts/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setExpert(data)
      }
    } catch (error) {
      console.error('Error fetching expert:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSlots = async () => {
    try {
      const res = await fetch(`/api/experts/${params.id}/slots`)
      if (res.ok) {
        const data = await res.json()
        setSlots(data)
      }
    } catch (error) {
      console.error('Error fetching slots:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot) {
      alert('Пожалуйста, выберите время')
      return
    }

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          expertId: params.id,
          slotId: selectedSlot,
        }),
      })

      if (res.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        setSelectedSlot(null)
        fetchSlots() // Обновляем слоты
      } else {
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

  if (!expert) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Эксперт не найден</h2>
            <p className="text-gray-600">Возможно, профиль был удален или перемещен</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const approachesList = expert.approaches?.split(',').map(a => a.trim()) || []
  const availableSlots = slots.filter(s => !s.isBooked)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-1">
                {expert.photo ? (
                  <div className="aspect-square w-full rounded-2xl overflow-hidden bg-muted">
                    <img 
                      src={expert.photo} 
                      alt={expert.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <UserCircle className="h-32 w-32 text-primary/40" />
                  </div>
                )}
              </div>
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold mb-2">{expert.name}</h1>
                <p className="text-xl text-primary font-medium mb-4">{expert.specialty}</p>
                <p className="text-lg text-gray-600 mb-6">{expert.description}</p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  {expert.experience && (
                    <div className="flex items-start gap-3">
                      <GraduationCap className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium text-sm">Опыт работы</div>
                        <div className="text-gray-600 text-sm">{expert.experience}</div>
                      </div>
                    </div>
                  )}
                  
                  {expert.price && (
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium text-sm">Стоимость</div>
                        <div className="text-gray-600 text-sm">{expert.price}</div>
                      </div>
                    </div>
                  )}
                  
                  {expert.duration && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium text-sm">Длительность</div>
                        <div className="text-gray-600 text-sm">{expert.duration}</div>
                      </div>
                    </div>
                  )}

                  {expert.isFree && (
                    <div className="flex items-start gap-3 md:col-span-2">
                      <Calendar className="h-5 w-5 text-green-600 mt-1" />
                      <div className="bg-green-50 px-4 py-2 rounded-lg flex-1">
                        <div className="font-medium text-sm text-green-800">Бесплатная запись</div>
                        <div className="text-green-600 text-sm">Первичная консультация бесплатно</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Biography */}
        {expert.bio && (
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">О специалисте</h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  {expert.bio.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Education */}
        {expert.education && (
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Award className="h-8 w-8 text-primary" />
                  Образование
                </h2>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-700">{expert.education}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Approaches */}
        {approachesList.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Подходы в работе</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {approachesList.map((approach, index) => (
                    <div key={index} className="bg-white border rounded-lg p-4">
                      <p className="text-gray-700">{approach}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Booking */}
        {expert.isFree && (
          <section className="bg-primary py-16 text-white">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Записаться на консультацию</h2>
                
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Available Slots */}
                  <Card className="bg-white text-foreground">
                    <CardHeader>
                      <CardTitle>Доступное время</CardTitle>
                      <CardDescription>Выберите удобное время для консультации</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {availableSlots.length > 0 ? (
                        <div className="space-y-2 max-h-[400px] overflow-y-auto">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot.id)}
                              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                selectedSlot === slot.id
                                  ? 'border-primary bg-primary/10'
                                  : 'border-gray-200 hover:border-primary'
                              }`}
                            >
                              <div className="font-medium">
                                {formatDate(new Date(slot.date))}
                              </div>
                              <div className="text-sm text-gray-600">
                                {new Date(slot.date).toLocaleTimeString('ru-RU', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })} ({slot.duration} мин)
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 py-8">
                          Свободных слотов пока нет. Свяжитесь напрямую.
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Booking Form */}
                  <Card className="bg-white text-foreground">
                    <CardHeader>
                      <CardTitle>Ваши данные</CardTitle>
                      <CardDescription>Заполните форму для записи</CardDescription>
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
                            Спасибо! Ваша запись принята. Специалист свяжется с вами.
                          </div>
                        )}

                        {submitStatus === 'error' && (
                          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                            Ошибка при записи. Попробуйте позже.
                          </div>
                        )}

                        <Button type="submit" className="w-full" disabled={!selectedSlot}>
                          Записаться
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contacts */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Связаться напрямую</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <a href={`mailto:${expert.email}`} className="text-gray-700 hover:text-primary">
                        {expert.email}
                      </a>
                    </div>
                    {expert.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <a href={`tel:${expert.phone}`} className="text-gray-700 hover:text-primary">
                          {expert.phone}
                        </a>
                      </div>
                    )}
                    {expert.telegram && (
                      <div className="flex items-center gap-3">
                        <Send className="h-5 w-5 text-primary" />
                        <a 
                          href={`https://t.me/${expert.telegram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-primary"
                        >
                          @{expert.telegram}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
