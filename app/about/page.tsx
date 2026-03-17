import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'
import { BookOpen, Award, GraduationCap, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Обо мне',
  description: 'Ольга Магденко - практикующий психолог, кандидат психологических наук, стаж более 20 лет',
}

const education = [
  {
    year: '2001',
    title: 'Томский государственный университет',
    description: 'Факультет психологии, квалификация – психолог, преподаватель психологии',
  },
  {
    year: '2012',
    title: 'Кандидат психологических наук',
    description: 'Специальность – медицинская психология',
  },
]

const experience = [
  'Преподаватель психологии в НГУ (с 2013 г.)',
  'Преподаватель в НГПУ (с 2004 г.)',
  'Консультант Профессиональной психотерапевтической лиги (с 2012 г.)',
  'Аккредитованный полимодальный супервизор ОППЛ',
  'Руководитель Балинтовских групп',
]

const approaches = [
  'Когнитивно-поведенческая терапия (КПТ)',
  'Психоаналитическая терапия',
  'Транзактный анализ',
  'Системная семейная терапия',
  'Трансперсональная психотерапия',
  'Перинатальная психология',
  'Ресурсная арт-терапия',
]

const principles = [
  {
    title: 'Профессиональная компетентность',
    description: 'Работаю только в границах своей компетентности, постоянно повышаю квалификацию',
  },
  {
    title: 'Конфиденциальность',
    description: 'Соблюдаю полную конфиденциальность, не разглашаю информацию от клиентов',
  },
  {
    title: 'Уважение личности',
    description: 'Отношусь с уважением к вашим взглядам, которые могут отличаться от моих',
  },
  {
    title: 'Недискриминация',
    description: 'Избегаю дискриминации по любым признакам в профессиональной деятельности',
  },
  {
    title: 'Осознанное завершение',
    description: 'Говорю о завершении работы, когда вы достигли своего результата',
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h1 className="mb-6 text-4xl font-bold">Психолог Ольга Магденко</h1>
                <p className="text-lg text-gray-600 mb-6">
                  Я практикующий психолог, канд.психол.наук, стаж более 20 лет. 
                  Помогаю стать осознанным человеком, способным справляться с жизненными трудностями.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Award className="h-5 w-5" />
                    <span className="font-medium">20+ лет опыта</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <GraduationCap className="h-5 w-5" />
                    <span className="font-medium">Кандидат наук</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Users className="h-5 w-5" />
                    <span className="font-medium">Супервизор</span>
                  </div>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-auto lg:h-[400px]">
                <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 w-full h-full flex items-center justify-center">
                  <p className="text-primary text-center px-8">
                    [Фото психолога]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Psychology */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold text-center">Почему я занимаюсь психологическим консультированием?</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Я выбрала профессию психолога, так как меня всегда интересовали семейные отношения и область 
                перинатальной психологии. Мой путь в профессию начался с прочтения книг по психологии: 
                Карла Витакера, Носсрат Пезешкиана, Вирджинии Сатир, Ирвина Ялома и др.
              </p>
              <p>
                Затем я получила высшее психологическое образование, защитила диссертацию по перинатальной психологии. 
                Я счастливый человек, т.к. очень люблю свою профессию и знаю, как помочь человеку, 
                который обратился за помощью.
              </p>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="bg-muted py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h2 className="text-3xl font-bold">Образование</h2>
            </div>
            <div className="mx-auto max-w-3xl space-y-6">
              {education.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 text-center">
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        {item.year}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-3xl font-bold">Опыт и достижения</h2>
              <div className="grid gap-4">
                {experience.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </div>
                    <p className="text-lg text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Approaches */}
        <section className="bg-muted py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-3xl font-bold">В каких подходах я работаю?</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {approaches.map((approach, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-gray-700">{approach}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-3xl font-bold">Как мы будем работать?</h2>
              <p className="text-center text-lg text-gray-600 mb-8">
                Я, как психолог-профессионал, придерживаюсь в своей работе определенных принципов:
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {principles.map((principle, index) => (
                  <div key={index} className="bg-white border rounded-lg p-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <span className="text-lg font-bold text-primary">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{principle.title}</h3>
                    <p className="text-gray-600">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="bg-primary py-16 text-white lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold">Что вам дадут занятия со мной?</h2>
              <p className="text-lg mb-8 text-white/90">
                Вы сможете совершенно по-другому строить свою жизнь:
              </p>
              <div className="grid gap-4 text-left md:grid-cols-2">
                {[
                  'Увидеть возможности, которых раньше не видели',
                  'Уметь разрешать конфликты конструктивно',
                  'Преодолеть страхи и принимать осознанные решения',
                  'Эффективно планировать время',
                  'Проработать коммуникативные навыки',
                  'Овладеть своими эмоциями',
                  'Научиться ставить цели и достигать их',
                  'Стать более уверенным в себе',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-white/20 pt-8">
                <p className="text-white/90">
                  <strong>Важно:</strong> Психотерапия — это не магия. Минимум нужно пройти 10-12 сеансов, 
                  чтобы увидеть изменения в себе и в своей жизни.
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
