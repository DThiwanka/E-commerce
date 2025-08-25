'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Linkedin, 
  Twitter, 
  Instagram,
  Mail,
  Star,
  Award,
  Users
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image: string
  experience: string
  expertise: string[]
  social: {
    linkedin?: string
    twitter?: string
    instagram?: string
    email?: string
  }
  featured?: boolean
}

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Isabella Romano',
      position: 'Founder & CEO',
      bio: 'With over 20 years in luxury fashion, Isabella founded LUXE with a vision to make exceptional fashion accessible to discerning customers worldwide.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      experience: '20+ years',
      expertise: ['Luxury Retail', 'Brand Strategy', 'Global Expansion'],
      social: {
        linkedin: '#',
        instagram: '#',
        email: 'isabella@luxe.com'
      },
      featured: true
    },
    {
      id: '2',
      name: 'Marco Bianchi',
      position: 'Creative Director',
      bio: 'Marco brings his artistic vision and deep understanding of fashion trends to curate LUXE\'s exceptional collection of designer pieces.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      experience: '15+ years',
      expertise: ['Fashion Design', 'Trend Forecasting', 'Visual Merchandising'],
      social: {
        linkedin: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      position: 'Head of Customer Experience',
      bio: 'Sophie ensures every customer interaction reflects the luxury and excellence that LUXE stands for, creating memorable shopping experiences.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      experience: '12+ years',
      expertise: ['Customer Service', 'Luxury Hospitality', 'Client Relations'],
      social: {
        linkedin: '#',
        email: 'sophie@luxe.com'
      }
    },
    {
      id: '4',
      name: 'Alexander Chen',
      position: 'Chief Technology Officer',
      bio: 'Alexander leads our digital transformation, ensuring our online platform delivers the same luxury experience as our physical boutiques.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      experience: '10+ years',
      expertise: ['E-commerce', 'Digital Strategy', 'Technology Innovation'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ]

  const leadershipValues = [
    {
      icon: Star,
      title: 'Visionary Leadership',
      description: 'Forward-thinking approach to luxury retail and customer experience'
    },
    {
      icon: Award,
      title: 'Industry Expertise',
      description: 'Deep knowledge and experience in luxury fashion and retail'
    },
    {
      icon: Users,
      title: 'Team Excellence',
      description: 'Dedicated professionals committed to delivering exceptional service'
    }
  ]

  return (
    <section className="py-16 px-4 bg-white" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gold text-charcoal">
            Meet Our Team
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4" id="team-heading">
            Leadership Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the passionate individuals behind LUXE who work tirelessly to bring you the finest luxury fashion experience.
          </p>
        </div>

        {/* Leadership Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {leadershipValues.map((value, index) => (
            <Card key={index} className="text-center p-6 border-0 bg-gray-50">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-royal-blue/10 flex items-center justify-center">
                <value.icon className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">
                {value.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Featured Leader */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-96 lg:h-auto">
                <Image
                  src={teamMembers[0].image}
                  alt={teamMembers[0].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <Badge className="mb-3 bg-gold text-charcoal">
                    Founder & CEO
                  </Badge>
                  <h3 className="text-2xl font-bold mb-1">{teamMembers[0].name}</h3>
                  <p className="text-white/90">{teamMembers[0].experience} of experience</p>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal mb-2">
                      {teamMembers[0].name}
                    </h3>
                    <p className="text-lg text-royal-blue font-medium mb-4">
                      {teamMembers[0].position}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {teamMembers[0].bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-charcoal mb-3">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {teamMembers[0].expertise.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {teamMembers[0].social.email && (
                      <Button size="icon" variant="outline">
                        <Mail className="h-4 w-4" />
                      </Button>
                    )}
                    {teamMembers[0].social.linkedin && (
                      <Button size="icon" variant="outline">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    )}
                    {teamMembers[0].social.instagram && (
                      <Button size="icon" variant="outline">
                        <Instagram className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.slice(1).map((member) => (
            <Card key={member.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {member.position}
                  </p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {member.bio}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Experience</p>
                    <p className="font-medium text-charcoal">{member.experience}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Expertise</p>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {member.expertise.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{member.expertise.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {member.social.email && (
                      <Button size="sm" variant="ghost">
                        <Mail className="h-4 w-4" />
                      </Button>
                    )}
                    {member.social.linkedin && (
                      <Button size="sm" variant="ghost">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    )}
                    {member.social.twitter && (
                      <Button size="sm" variant="ghost">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    )}
                    {member.social.instagram && (
                      <Button size="sm" variant="ghost">
                        <Instagram className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <div className="text-center mt-16 bg-gradient-to-r from-royal-blue to-charcoal rounded-2xl p-12 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Join Our Team
          </h3>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals who share our commitment to excellence and luxury fashion.
          </p>
          <Button variant="secondary" className="bg-white text-charcoal hover:bg-gray-100">
            View Open Positions
          </Button>
        </div>
      </div>
    </section>
  )
}