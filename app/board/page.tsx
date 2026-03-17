'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Users, Calendar, BookOpen, Mail, MessageSquare, Settings, LogOut } from 'lucide-react'

export default function BoardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Проверяем авторизацию через cookie
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check')
        if (!res.ok) {
          router.push('/board/login')
        }
      } catch (error) {
        router.push('/board/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/board/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Загрузка...</div>
      </div>
    )
  }

  const sections = [
    {
      title: 'Эксперты',
      description: 'Управление коллегами и экспертами',
      icon: Users,
      href: '/board/experts',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'События',
      description: 'Управление афишей и мероприятиями',
      icon: Calendar,
      href: '/board/events',
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
    },
    {
      title: 'Услуги',
      description: 'Управление услугами и курсами',
      icon: BookOpen,
      href: '/board/services',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Заявки',
      description: 'Заявки на консультации',
      icon: Mail,
      href: '/board/appointments',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Отзывы',
      description: 'Модерация отзывов',
      icon: MessageSquare,
      href: '/board/reviews',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      title: 'Настройки',
      description: 'Настройки сайта',
      icon: Settings,
      href: '/board/settings',
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Админ-панель</h1>
              <p className="text-sm text-gray-600">Управление сайтом психолога</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" target="_blank">
                <Button variant="outline" size="sm">
                  Открыть сайт
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Добро пожаловать!</h2>
          <p className="text-gray-600">
            Выберите раздел для управления
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link key={section.href} href={section.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${section.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${section.color}`} />
                    </div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Открыть
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Быстрая статистика</h3>
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">—</div>
                  <div className="text-sm text-gray-600">Экспертов</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-sky-600 mb-2">—</div>
                  <div className="text-sm text-gray-600">Событий</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">—</div>
                  <div className="text-sm text-gray-600">Новых заявок</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">—</div>
                  <div className="text-sm text-gray-600">Отзывов</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
