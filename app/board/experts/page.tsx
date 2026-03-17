'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2, Eye } from 'lucide-react'

type Expert = {
  id: string
  name: string
  specialty: string
  description: string
  email: string
  phone: string | null
  isActive: boolean
  isFree: boolean
}

export default function ExpertsPage() {
  const router = useRouter()
  const [experts, setExperts] = useState<Expert[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    description: '',
    bio: '',
    email: '',
    phone: '',
    telegram: '',
    experience: '',
    education: '',
    approaches: '',
    price: '',
    duration: '60 минут',
    isActive: true,
    isFree: true,
  })

  useEffect(() => {
    checkAuth()
    fetchExperts()
  }, [])

  const checkAuth = async () => {
    const res = await fetch('/api/auth/check')
    if (!res.ok) router.push('/board/login')
  }

  const fetchExperts = async () => {
    try {
      const res = await fetch('/api/board/experts')
      if (res.ok) {
        const data = await res.json()
        setExperts(data)
      }
    } catch (error) {
      console.error('Error fetching experts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingId 
        ? `/api/board/experts/${editingId}`
        : '/api/board/experts'
      
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchExperts()
        resetForm()
        alert(editingId ? 'Эксперт обновлен' : 'Эксперт создан')
      }
    } catch (error) {
      alert('Ошибка при сохранении')
    }
  }

  const handleEdit = (expert: Expert) => {
    setEditingId(expert.id)
    setFormData({
      name: expert.name,
      specialty: expert.specialty,
      description: expert.description,
      bio: '',
      email: expert.email,
      phone: expert.phone || '',
      telegram: '',
      experience: '',
      education: '',
      approaches: '',
      price: '',
      duration: '60 минут',
      isActive: expert.isActive,
      isFree: expert.isFree,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить эксперта?')) return

    try {
      const res = await fetch(`/api/board/experts/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchExperts()
        alert('Эксперт удален')
      }
    } catch (error) {
      alert('Ошибка при удалении')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      specialty: '',
      description: '',
      bio: '',
      email: '',
      phone: '',
      telegram: '',
      experience: '',
      education: '',
      approaches: '',
      price: '',
      duration: '60 минут',
      isActive: true,
      isFree: true,
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
              <h1 className="text-2xl sm:text-3xl font-bold">Управление экспертами</h1>
              <p className="text-gray-600">Всего экспертов: {experts.length}</p>
            </div>
          </div>
          <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Добавить эксперта
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingId ? 'Редактировать эксперта' : 'Новый эксперт'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      ФИО *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Специализация *
                    </label>
                    <Input
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Телефон
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Telegram (без @)
                    </label>
                    <Input
                      value={formData.telegram}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Опыт работы
                    </label>
                    <Input
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="15 лет"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Стоимость
                    </label>
                    <Input
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="от 5000 ₽"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Длительность
                    </label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Краткое описание *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Полная биография
                  </label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Образование
                  </label>
                  <Textarea
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Подходы (через запятую)
                  </label>
                  <Input
                    value={formData.approaches}
                    onChange={(e) => setFormData({ ...formData, approaches: e.target.value })}
                    placeholder="КПТ, Психоанализ, Гештальт"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Активен</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isFree}
                      onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Бесплатная запись</span>
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
          {experts.map((expert) => (
            <Card key={expert.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{expert.name}</h3>
                      {!expert.isActive && (
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                          Неактивен
                        </span>
                      )}
                      {expert.isFree && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Бесплатная запись
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-primary font-medium mb-2">
                      {expert.specialty}
                    </p>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {expert.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="truncate">📧 {expert.email}</span>
                      {expert.phone && <span>📱 {expert.phone}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link href={`/colleagues/${expert.id}`} target="_blank">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(expert)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(expert.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {experts.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-gray-600">Экспертов пока нет</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
