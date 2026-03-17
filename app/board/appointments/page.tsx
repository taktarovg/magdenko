'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Calendar } from 'lucide-react'
import { formatDate, formatTime } from '@/lib/utils'

type Appointment = {
  id: string
  name: string
  email: string
  phone: string
  service: string
  date: string
  message: string | null
  status: string
  createdAt: string
}

export default function AppointmentsPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    checkAuth()
    fetchAppointments()
  }, [])

  const checkAuth = async () => {
    const res = await fetch('/api/auth/check')
    if (!res.ok) router.push('/board/login')
  }

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/board/appointments')
      if (res.ok) {
        const data = await res.json()
        setAppointments(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/board/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (res.ok) {
        fetchAppointments()
      }
    } catch (error) {
      alert('Ошибка при обновлении статуса')
    }
  }

  const filteredAppointments = appointments.filter(app => {
    if (filter === 'ALL') return true
    return app.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'CONFIRMED': return 'bg-green-100 text-green-800'
      case 'CANCELLED': return 'bg-red-100 text-red-800'
      case 'COMPLETED': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Ожидает'
      case 'CONFIRMED': return 'Подтверждена'
      case 'CANCELLED': return 'Отменена'
      case 'COMPLETED': return 'Завершена'
      default: return status
    }
  }

  if (loading) {
    return <div className="p-8">Загрузка...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/board">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Заявки на консультации</h1>
              <p className="text-gray-600">Всего: {appointments.length}</p>
            </div>
          </div>
        </div>

        {/* Фильтры */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={filter === 'ALL' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('ALL')}
          >
            Все ({appointments.length})
          </Button>
          <Button
            variant={filter === 'PENDING' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('PENDING')}
          >
            Ожидают ({appointments.filter(a => a.status === 'PENDING').length})
          </Button>
          <Button
            variant={filter === 'CONFIRMED' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('CONFIRMED')}
          >
            Подтверждены ({appointments.filter(a => a.status === 'CONFIRMED').length})
          </Button>
          <Button
            variant={filter === 'COMPLETED' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('COMPLETED')}
          >
            Завершены ({appointments.filter(a => a.status === 'COMPLETED').length})
          </Button>
        </div>

        <div className="grid gap-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{appointment.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(appointment.status)}`}>
                        {getStatusLabel(appointment.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{appointment.service}</p>
                  </div>
                  <div className="text-sm text-gray-500 flex-shrink-0">
                    {formatDate(new Date(appointment.createdAt))}
                  </div>
                </div>

                <div className="grid gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a href={`mailto:${appointment.email}`} className="text-primary hover:underline">
                      {appointment.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <a href={`tel:${appointment.phone}`} className="hover:underline">
                      {appointment.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      {formatDate(new Date(appointment.date))} в {formatTime(new Date(appointment.date))}
                    </span>
                  </div>
                </div>

                {appointment.message && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{appointment.message}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {appointment.status === 'PENDING' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => updateStatus(appointment.id, 'CONFIRMED')}
                      >
                        Подтвердить
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(appointment.id, 'CANCELLED')}
                      >
                        Отменить
                      </Button>
                    </>
                  )}
                  {appointment.status === 'CONFIRMED' && (
                    <Button
                      size="sm"
                      onClick={() => updateStatus(appointment.id, 'COMPLETED')}
                    >
                      Завершить
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredAppointments.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-gray-600">Заявок нет</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
