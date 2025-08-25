'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  HelpCircle, 
  Package, 
  CreditCard, 
  Truck, 
  RotateCcw, 
  Shield,
  User,
  Clock,
  MapPin,
  Mail,
  Phone,
  ChevronRight
} from 'lucide-react'

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('all')

  const faqCategories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'returns', label: 'Returns', icon: RotateCcw },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'account', label: 'Account', icon: User }
  ]

  const faqs = [
    {
      id: '1',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days within the continental US. International shipping typically takes 7-14 business days. Express shipping options are available at checkout for faster delivery.',
      category: 'shipping',
      icon: Clock
    },
    {
      id: '2',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some items like final sale items, personalized items, and undergarments cannot be returned.',
      category: 'returns',
      icon: RotateCcw
    },
    {
      id: '3',
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history, or by using the "Track Order" feature on our website.',
      category: 'orders',
      icon: Package
    },
    {
      id: '4',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and LUXE gift cards. All transactions are secure and encrypted.',
      category: 'payment',
      icon: CreditCard
    },
    {
      id: '5',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination. Customs fees and import duties may apply and are the responsibility of the customer.',
      category: 'shipping',
      icon: MapPin
    },
    {
      id: '6',
      question: 'How do I create an account?',
      answer: 'Click on the "Sign In" button in the top right corner of our website, then select "Create Account." You can sign up using your email address or social media accounts. Having an account allows you to track orders, save items to your wishlist, and enjoy a faster checkout process.',
      category: 'account',
      icon: User
    },
    {
      id: '7',
      question: 'Can I change or cancel my order?',
      answer: 'You can change or cancel your order within 1 hour of placing it, as long as it hasn\'t entered the fulfillment process. After that time, please contact our customer service team for assistance.',
      category: 'orders',
      icon: Package
    },
    {
      id: '8',
      question: 'Is my personal information secure?',
      answer: 'Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal information. We never share your data with third parties without your consent, except as necessary to fulfill your orders.',
      category: 'account',
      icon: Shield
    },
    {
      id: '9',
      question: 'Do you offer gift wrapping?',
      answer: 'Yes, we offer complimentary gift wrapping for all orders. You can select this option at checkout. We also include a personalized message card with your gift.',
      category: 'orders',
      icon: Package
    },
    {
      id: '10',
      question: 'What if I receive a damaged item?',
      answer: 'If you receive a damaged item, please contact us within 48 hours of delivery with photos of the damage. We\'ll arrange for a replacement or refund, including return shipping costs.',
      category: 'returns',
      icon: RotateCcw
    }
  ]

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory)

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get detailed help via email',
      action: 'support@luxe.com',
      responseTime: '24 hours'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team directly',
      action: '+1 (555) 123-4567',
      responseTime: 'Immediate'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with us online',
      action: 'Available on website',
      responseTime: '5 minutes'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Category Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {faqCategories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-royal-blue text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}
            >
              <Icon className="h-4 w-4" />
              {category.label}
              <Badge variant="secondary" className="text-xs">
                {category.id === 'all' ? faqs.length : faqs.filter(f => f.category === category.id).length}
              </Badge>
            </button>
          )
        })}
      </div>

      {/* FAQ Accordion */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-royal-blue" />
            Frequently Asked Questions
          </CardTitle>
          <p className="text-gray-600">
            Find answers to common questions about our products, services, and policies.
          </p>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center gap-3 pr-4">
                    <div className="w-8 h-8 rounded-full bg-royal-blue/10 flex items-center justify-center flex-shrink-0">
                      <faq.icon className="h-4 w-4 text-royal-blue" />
                    </div>
                    <span className="font-medium">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-11">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Still Have Questions */}
      <Card className="bg-gradient-to-br from-royal-blue to-charcoal text-white">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Still Have Questions?</h3>
            <p className="text-white/90">
              Can't find the answer you're looking for? Our customer service team is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <method.icon className="h-8 w-8 text-gold" />
                </div>
                <h4 className="font-semibold mb-2">{method.title}</h4>
                <p className="text-white/80 text-sm mb-3">{method.description}</p>
                <p className="text-gold font-medium mb-1">{method.action}</p>
                <p className="text-white/60 text-xs">Response: {method.responseTime}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="secondary" 
              className="bg-white text-charcoal hover:bg-gray-100"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Contact Form
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Help Topics */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-charcoal mb-6 text-center">Quick Help Topics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Order Status', 'Size Guide', 'Care Instructions', 'Gift Cards'].map((topic, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-royal-blue hover:text-white hover:border-royal-blue"
            >
              <HelpCircle className="h-6 w-6" />
              <span className="text-sm">{topic}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}