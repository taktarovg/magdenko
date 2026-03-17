'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/board">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
          </Link>
        </div>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Управление услугами</h1>
          <p className="text-gray-600">Раздел в разработке</p>
        </div>
      </div>
    </div>
  )
}
