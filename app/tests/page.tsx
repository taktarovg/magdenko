import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ClipboardList, Brain, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Психологические тесты',
  description: 'Онлайн тесты для самодиагностики и самопознания',
}

// Временные данные
const tests = [
  {
    id: 1,
    title: 'Тест на уровень тревожности',
    description: 'Определите ваш текущий уровень тревожности и получите рекомендации',
    icon: Brain,
    questionsCount: 20,
    duration: '5-10 минут',
  },
  {
    id: 2,
    title: 'Оценка качества семейных отношений',
    description: 'Узнайте, насколько гармоничны ваши семейные отношения',
    icon: Heart,
    questionsCount: 25,
    duration: '10-15 минут',
  },
]

export default function TestsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">Психологические тесты</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Пройдите онлайн-тесты для самодиагностики и самопознания
            </p>
          </div>
        </section>

        {/* Tests */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            {tests.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {tests.map((test) => {
                  const Icon = test.icon
                  return (
                    <Card key={test.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 mb-4">
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{test.title}</CardTitle>
                        <CardDescription>{test.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <ClipboardList className="h-4 w-4" />
                            <span>{test.questionsCount} вопросов</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>⏱️</span>
                            <span>{test.duration}</span>
                          </div>
                        </div>
                        <Button className="w-full" disabled>
                          Скоро будет доступен
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <ClipboardList className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Тесты в разработке</h3>
                <p className="text-gray-600">
                  Скоро здесь появятся психологические тесты для самодиагностики
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Info */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Важно знать</h2>
              <div className="bg-white rounded-lg p-6 border-l-4 border-primary">
                <p className="text-gray-700 mb-4">
                  <strong>Обратите внимание:</strong> результаты онлайн-тестов носят 
                  ознакомительный характер и не являются диагнозом.
                </p>
                <p className="text-gray-700">
                  Для получения профессиональной оценки и помощи рекомендуется 
                  обратиться за консультацией к психологу.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
