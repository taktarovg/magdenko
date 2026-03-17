'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, Send, MapPin, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { useState } from 'react'

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-white py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">Контакты</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Свяжитесь со мной удобным для вас способом
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="mb-6 text-3xl font-bold">Свяжитесь со мной</h2>
                  <p className="text-gray-600 mb-8">
                    Выберите удобный способ связи. Я отвечу в ближайшее время.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Контактная информация</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Телефон</p>
                        <a 
                          href={`tel:${siteConfig.links.phone}`}
                          className="text-gray-600 hover:text-primary transition-colors"
                        >
                          {siteConfig.links.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a 
                          href={`mailto:${siteConfig.links.email}`}
                          className="text-gray-600 hover:text-primary transition-colors"
                        >
                          {siteConfig.links.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Send className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Telegram</p>
                        <a 
                          href={siteConfig.links.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary transition-colors"
                        >
                          @magdenko_psy
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Город</p>
                        <p className="text-gray-600">Новосибирск</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Форматы работы</p>
                        <p className="text-gray-600">Очно и онлайн</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary text-white">
                  <CardHeader>
                    <CardTitle className="text-white">Быстрая связь</CardTitle>
                    <CardDescription className="text-white/80">
                      Telegram — самый быстрый способ связи
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href={siteConfig.links.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="w-full bg-white text-primary hover:bg-white/90"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Написать в Telegram
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Оставьте заявку</CardTitle>
                  <CardDescription>
                    Заполните форму, и я свяжусь с вами в ближайшее время
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Ваше имя *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Как к вам обращаться?"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Телефон *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Сообщение
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Расскажите, с чем вы хотели бы обратиться..."
                      />
                    </div>

                    {submitStatus === 'success' && (
                      <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                        Спасибо! Ваша заявка отправлена. Я свяжусь с вами в ближайшее время.
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                        Произошла ошибка. Пожалуйста, попробуйте позже или свяжитесь другим способом.
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Нажимая кнопку, вы соглашаетесь с{' '}
                      <a href="/privacy-policy" className="underline">
                        политикой конфиденциальности
                      </a>
                    </p>
                  </form>
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
