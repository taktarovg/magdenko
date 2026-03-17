import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Users, Calendar, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Курсы и групповые практики',
  description: 'Групповые практики, обучающие программы и курсы от психолога Ольги Магденко',
}

// Временные данные (потом будут из БД)
const courses = [
  {
    id: 1,
    title: 'Балинтовские группы',
    description: 'Профессиональная супервизия для психологов и специалистов помогающих профессий',
    schedule: 'По записи',
    maxStudents: 12,
    isActive: true,
  },
  {
    id: 2,
    title: 'Школа осознанного родительства',
    description: 'Подготовка к родам и сознательному родительству для беременных женщин и пар',
    schedule: 'Группы формируются ежемесячно',
    maxStudents: 8,
    isActive: true,
  },
]

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">Курсы и групповые практики</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Групповая работа и обучающие программы
            </p>
          </div>
        </section>

        {/* Courses */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            {courses.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {courses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-2xl">{course.title}</CardTitle>
                        {course.isActive && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Набор открыт
                          </span>
                        )}
                      </div>
                      <CardDescription className="text-base">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{course.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>Максимум {course.maxStudents} участников</span>
                      </div>
                      <Link href="/contacts">
                        <Button className="w-full">Записаться в группу</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Users className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Скоро появятся новые группы</h3>
                <p className="text-gray-600 mb-6">
                  Сейчас идет набор участников. Свяжитесь со мной, чтобы узнать подробности.
                </p>
                <Link href="/contacts">
                  <Button>Связаться</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Info */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Преимущества групповой работы</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: 'Поддержка группы',
                    description: 'Возможность получить поддержку от людей с похожим опытом',
                  },
                  {
                    title: 'Разные перспективы',
                    description: 'Взгляд на проблему с разных точек зрения',
                  },
                  {
                    title: 'Доступная стоимость',
                    description: 'Групповые занятия более доступны по цене',
                  },
                  {
                    title: 'Социальные навыки',
                    description: 'Развитие навыков общения и эмпатии',
                  },
                ].map((benefit, index) => (
                  <div key={index} className="bg-white rounded-lg p-6">
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
