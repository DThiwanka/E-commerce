'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackButton from '@/components/ui/back-button'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import FAQSection from '@/components/contact/FAQSection'
import Newsletter from '@/components/Newsletter'
import { Metadata } from 'next'

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('contact')

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-8">
          <div className="mb-8">
            <BackButton href="/" label="Back to Home" />
          </div>
        </div>
        
        <ContactHero />
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'contact'
                      ? 'bg-royal-blue text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Contact Us
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'faq'
                      ? 'bg-royal-blue text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  FAQ
                </button>
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'contact' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <ContactForm />
                <ContactInfo />
              </div>
            ) : (
              <FAQSection />
            )}
          </div>
        </div>
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}