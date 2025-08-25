'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Award, 
  Globe, 
  Users, 
  Star,
  TrendingUp,
  Store,
  Diamond
} from 'lucide-react'

interface Milestone {
  year: string
  title: string
  description: string
  icon: any
  achievement: string
  category: string
}

export default function Milestones() {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const milestones: Milestone[] = [
    {
      year: '2010',
      title: 'LUXE Founded',
      description: 'Opened our first boutique in Milan with a curated collection of 50 designer brands.',
      icon: Store,
      achievement: '50+ Brands',
      category: 'foundation'
    },
    {
      year: '2012',
      title: 'First International Expansion',
      description: 'Expanded to Paris and London, establishing our presence in key European fashion capitals.',
      icon: Globe,
      achievement: '3 Countries',
      category: 'expansion'
    },
    {
      year: '2014',
      title: 'Luxury Retail Award',
      description: 'Recognized as "Best New Luxury Retailer" at the International Fashion Awards.',
      icon: Award,
      achievement: 'Industry Recognition',
      category: 'achievement'
    },
    {
      year: '2016',
      title: '10,000 Customers Milestone',
      description: 'Reached a significant milestone with over 10,000 satisfied customers worldwide.',
      icon: Users,
      achievement: '10K+ Customers',
      category: 'growth'
    },
    {
      year: '2018',
      title: 'Sustainability Initiative',
      description: 'Launched our sustainable fashion program, partnering with eco-conscious designers.',
      icon: Diamond,
      achievement: 'Green Initiative',
      category: 'innovation'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched our e-commerce platform, bringing LUXE experience to customers globally.',
      icon: TrendingUp,
      achievement: 'Digital Launch',
      category: 'innovation'
    },
    {
      year: '2021',
      title: 'Global Fashion Week Partnership',
      description: 'Became official retail partner for major fashion weeks in Milan, Paris, and New York.',
      icon: Star,
      achievement: 'FW Partnership',
      category: 'achievement'
    },
    {
      year: '2022',
      title: '50K Customers Worldwide',
      description: 'Expanded our customer base to over 50,000 fashion enthusiasts across 30+ countries.',
      icon: Users,
      achievement: '50K+ Customers',
      category: 'growth'
    },
    {
      year: '2023',
      title: 'Luxury Excellence Award',
      description: 'Received the "Luxury Excellence Award" for outstanding customer service and quality.',
      icon: Award,
      achievement: 'Excellence Award',
      category: 'achievement'
    },
    {
      year: '2024',
      title: 'AI-Powered Personal Shopping',
      description: 'Introduced AI-powered personal shopping assistant for enhanced customer experience.',
      icon: Diamond,
      achievement: 'AI Innovation',
      category: 'innovation'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Milestones', count: milestones.length },
    { id: 'foundation', label: 'Foundation', count: milestones.filter(m => m.category === 'foundation').length },
    { id: 'expansion', label: 'Expansion', count: milestones.filter(m => m.category === 'expansion').length },
    { id: 'achievement', label: 'Achievements', count: milestones.filter(m => m.category === 'achievement').length },
    { id: 'growth', label: 'Growth', count: milestones.filter(m => m.category === 'growth').length },
    { id: 'innovation', label: 'Innovation', count: milestones.filter(m => m.category === 'innovation').length }
  ]

  const filteredMilestones = activeCategory === 'all' 
    ? milestones 
    : milestones.filter(m => m.category === activeCategory)

  const stats = [
    { label: 'Years of Excellence', value: '14+', icon: Calendar },
    { label: 'Countries Served', value: '30+', icon: Globe },
    { label: 'Designer Brands', value: '200+', icon: Diamond },
    { label: 'Happy Customers', value: '50K+', icon: Users }
  ]

  return (
    <section className="py-16 px-4 bg-gray-50" aria-labelledby="milestones-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-royal-blue text-white">
            Our Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4" id="milestones-heading">
            Milestones & Achievements
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Celebrating our journey of growth, innovation, and excellence in luxury fashion. Each milestone represents our commitment to bringing you the finest shopping experience.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 border-0 bg-white">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-royal-blue/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-royal-blue" />
              </div>
              <div className="text-2xl font-bold text-charcoal mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-royal-blue text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-75">
                ({category.count})
              </span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-royal-blue/20"></div>

          <div className="space-y-12">
            {filteredMilestones.map((milestone, index) => (
              <div key={index} className="relative">
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-royal-blue rounded-full border-4 border-white shadow-lg"></div>

                {/* Content */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}>
                  <div className={index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:col-start-2'}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge className="mb-2 bg-gold text-charcoal">
                            {milestone.year}
                          </Badge>
                          <h3 className="text-xl font-bold text-charcoal">
                            {milestone.title}
                          </h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-royal-blue/10 flex items-center justify-center flex-shrink-0">
                          <milestone.icon className="h-5 w-5 text-royal-blue" />
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {milestone.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm text-royal-blue font-medium">
                        <span className="bg-royal-blue/10 px-3 py-1 rounded-full">
                          {milestone.achievement}
                        </span>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <div className="mt-16 bg-gradient-to-r from-royal-blue to-charcoal rounded-2xl p-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            The Future of LUXE
          </h3>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            As we look ahead, we remain committed to innovation, sustainability, and delivering exceptional luxury experiences to our customers worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Globe className="h-8 w-8 text-gold" />
              </div>
              <h4 className="font-bold mb-2">Global Expansion</h4>
              <p className="text-white/80 text-sm">Reaching new markets and fashion capitals worldwide</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Diamond className="h-8 w-8 text-gold" />
              </div>
              <h4 className="font-bold mb-2">Digital Innovation</h4>
              <p className="text-white/80 text-sm">Enhancing online experience with cutting-edge technology</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Users className="h-8 w-8 text-gold" />
              </div>
              <h4 className="font-bold mb-2">Customer Excellence</h4>
              <p className="text-white/80 text-sm">Continuing to elevate the luxury shopping experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}