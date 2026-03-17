'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'

type Event = {
  id: string
  title: string
  description: string
  startDate: string
  location: string | null
  format: string
  price: string | null
  maxSeats: number | null
  bookedSeats: number
  isPublished: boolean
  category: string | null
}

export default function EventsPage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    startDate: '',
    endDate: '',
    location: '',
    format: 'OFFLINE',
    price: '',
    maxSeats: '',
    category: '',
    organizer: '',
    isActive: true,
    isPublished: false,
  })

  useEffect(() => {
    checkAuth()
    fetchEvents()
  }, [])

  const checkAuth = async () => {
    const res = await fetch('/api/auth/check')
    if (!res.ok) router.push('/board/login')
  }

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/board/events')
      if (res.ok) {
        const data = await res.json()
        setEvents(data)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingId 
        ? `/api/board/events/${editingId}`
        : '/api/board/events'
      
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          maxSeats: formData.maxSeats ? parseInt(formData.maxSeats) : null,
        }),
      })

      if (res.ok) {
        fetchEvents()
        resetForm()
        alert(editingId ? 'Событие обновлено' : 'Событие создано')
      }
    } catch (error) {
      alert('Ошибка при сохранении')
    }
  }

  const handleEdit = (event: Event) => {
    setEditingId(event.id)
    setFormData({
      title: event.title,
      description: event.description,
      content: '',
      startDate: event.startDate.slice(0, 16),
      endDate: '',
      location: event.location || '',
      format: event.format,
      price: event.price || '',
      maxSeats: event.maxSeats?.toString() || '',
      category: event.category || '',
      organizer: '',
      isActive: true,
      isPublished: event.isPublished,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить событие?')) return

    try {
      const res = await fetch(`/api/board/events/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchEvents()
        alert('Событие удалено')
      }
    } catch (error) {
      alert('Ошибка при удалении')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      startDate: '',
      endDate: '',
      location: '',
      format: 'OFFLINE',
      price: '',
      maxSeats: '',
      category: '',
      organizer: '',
      isActive: true,
      isPublished: false,
    })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) {
    return <div className="p-8">Загрузка...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/board">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Управление событиями</h1>
              <p className="text-gray-600">Всего событий: {events.length}</p>
            </div>
          </div>
          <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Добавить событие
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingId ? 'Редактировать событие' : 'Новое событие'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Название *
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Краткое описание *
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Полное описание
                    </label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={5}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Дата начала *
                    </label>
                    <Input
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Дата окончания
                    </label>
                    <Input
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Формат *
                    </label>
                    <select
                      className="w-full rounded-md border border-border bg-background px-3 py-2"
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      required
                    >
                      <option value="OFFLINE">Очно</option>
                      <option value="ONLINE">Онлайн</option>
                      <option value="HYBRID">Гибридный</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Место проведения
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Адрес или ссылка"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Стоимость
                    </label>
                    <Input
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="Бесплатно или 5000 ₽"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Максимум участников
                    </label>
                    <Input
                      type="number"
                      value={formData.maxSeats}
                      onChange={(e) => setFormData({ ...formData, maxSeats: e.target.value })}
                      placeholder="20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Категория
                    </label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Семинар, Мастер-класс"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Организатор
                    </label>
                    <Input
                      value={formData.organizer}
                      onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                      placeholder="Ольга Магденко"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Активно</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Опубликовано</span>
                  </label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {editingId ? 'Сохранить' : 'Создать'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      {!event.isPublished && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Черновик
                        </span>
                      )}
                      {event.category && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {event.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span>📅 {formatDate(new Date(event.startDate))}</span>
                      <span>📍 {event.location || 'Не указано'}</span>
                      <span>💰 {event.price || 'Бесплатно'}</span>
                      {event.maxSeats && (
                        <span>👥 {event.bookedSeats}/{event.maxSeats} мест</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link href={`/events/${event.id}`} target="_blank">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {events.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-gray-600">Событий пока нет</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
