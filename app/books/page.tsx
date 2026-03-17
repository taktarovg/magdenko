import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, FileText, BookMarked } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Книги и публикации',
  description: 'Научные публикации, статьи и книги психолога Ольги Магденко',
}

// Временные данные (потом будут из БД)
const publications = [
  {
    id: 1,
    title: 'Психологическая помощь беременным женщинам при становлении материнской ролевой идентичности',
    type: 'book',
    year: '2013',
    description: 'Монография, посвященная вопросам перинатальной психологии и формированию материнской идентичности',
  },
  {
    id: 2,
    title: 'Методологические подходы к исследованию материнской ролевой идентичности у беременных женщин',
    type: 'article',
    year: '2010',
    description: 'Сибирский психологический журнал, №38',
  },
  {
    id: 3,
    title: 'Репродуктивные ролевые ориентации деторождения у беременных женщин',
    type: 'article',
    year: '2014',
    description: 'Вестник Новосибирского государственного университета. Серия: Психология',
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case 'book':
      return BookOpen
    case 'article':
      return FileText
    default:
      return BookMarked
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'book':
      return 'Книга'
    case 'article':
      return 'Статья'
    case 'chapter':
      return 'Глава в книге'
    default:
      return 'Публикация'
  }
}

export default function BooksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-white py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">Книги и публикации</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Научные работы и публикации по психологии
            </p>
          </div>
        </section>

        {/* Publications */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
              {publications.map((pub) => {
                const Icon = getIcon(pub.type)
                return (
                  <Card key={pub.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {getTypeLabel(pub.type)}
                            </span>
                            <span className="text-xs text-gray-500">{pub.year}</span>
                          </div>
                          <CardTitle className="text-xl">{pub.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{pub.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto">
              <BookOpen className="mx-auto h-16 w-16 text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-4">Научная деятельность</h2>
              <p className="text-gray-600 mb-6">
                Являюсь автором более 15 научных публикаций по перинатальной психологии, 
                семейной психологии и клинической психологии. 
                Активно участвую в научных конференциях и симпозиумах.
              </p>
              <p className="text-sm text-gray-500">
                Кандидат психологических наук (2012 г.)
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
