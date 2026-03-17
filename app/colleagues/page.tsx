import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserCircle, GraduationCap, Calendar } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Коллеги',
  description: 'Профессиональные психологи и специалисты помогающих профессий',
}

async function getExperts() {
  try {
    const experts = await prisma.expert.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
    return experts
  } catch (error) {
    console.error('Error fetching experts:', error)
    return []
  }
}

export default async function ColleaguesPage() {
  const experts = await getExperts()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-white py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">Коллеги</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Профессиональные психологи и специалисты, с которыми я сотрудничаю
            </p>
          </div>
        </section>

        {/* Experts Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            {experts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {experts.map((expert) => (
                  <Card key={expert.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mb-4">
                        {expert.photo ? (
                          <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-100">
                            <img 
                              src={expert.photo} 
                              alt={expert.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-square w-full rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <UserCircle className="h-24 w-24 text-primary/40" />
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl">{expert.name}</CardTitle>
                      <CardDescription className="text-sm font-medium text-primary">
                        {expert.specialty}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {expert.description}
                      </p>
                      
                      {expert.experience && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <GraduationCap className="h-4 w-4" />
                          <span>{expert.experience}</span>
                        </div>
                      )}

                      {expert.price && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Консультация:</span>
                          <span className="font-semibold text-primary">{expert.price}</span>
                        </div>
                      )}

                      {expert.isFree && (
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">Бесплатная запись</span>
                        </div>
                      )}

                      <Link href={`/colleagues/${expert.id}`}>
                        <Button className="w-full">Подробнее</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <UserCircle className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Скоро появятся коллеги</h3>
                <p className="text-gray-600 mb-6">
                  Сейчас формируется список профессионалов
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Info */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Профессиональное сообщество</h2>
              <p className="text-gray-600 mb-8">
                Все специалисты в этом разделе — проверенные профессионалы с подтвержденным 
                образованием и опытом работы. Многие из них мои коллеги, студенты или 
                участники супервизорских групп.
              </p>
              <div className="grid gap-6 md:grid-cols-3 text-left">
                <div className="bg-white rounded-lg p-6">
                  <div className="text-3xl font-bold text-primary mb-2">20+</div>
                  <p className="text-sm text-gray-600">Специалистов в команде</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <p className="text-sm text-gray-600">Бесплатная первичная консультация</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-sm text-gray-600">Онлайн запись в любое время</p>
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
