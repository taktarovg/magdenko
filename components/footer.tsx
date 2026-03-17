import Link from 'next/link'
import { Mail, Phone, Send } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const quickLinks = [
  { name: 'Обо мне', href: '/about' },
  { name: 'Услуги', href: '/services' },
  { name: 'Курсы', href: '/courses' },
  { name: 'Коллеги', href: '/colleagues' },
  { name: 'Афиша', href: '/events' },
]

const additionalLinks = [
  { name: 'Тесты', href: '/tests' },
  { name: 'Книги', href: '/books' },
  { name: 'Контакты', href: '/contacts' },
]

const legalLinks = [
  { name: 'Политика конфиденциальности', href: '/privacy-policy' },
  { name: 'Пользовательское соглашение', href: '/user-agreement' },
  { name: 'Договор оферты', href: '/terms' },
  { name: 'Возврат денежных средств', href: '/refund-policy' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* О психологе */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Ольга Магденко
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Кандидат психологических наук, практикующий клинический, семейный, перинатальный, детский психолог
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Дополнительно */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Дополнительно</h3>
            <ul className="space-y-2">
              {additionalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mb-4 mt-6">Юридическая информация</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <a href={`tel:${siteConfig.links.phone}`} className="hover:text-primary transition-colors">
                  {siteConfig.links.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${siteConfig.links.email}`} className="hover:text-primary transition-colors">
                  {siteConfig.links.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Send className="h-4 w-4" />
                <a
                  href={siteConfig.links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} {siteConfig.name}. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
