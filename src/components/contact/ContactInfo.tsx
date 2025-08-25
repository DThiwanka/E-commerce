'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe,
  Car,
  Train,
  Plane,
  Calendar,
  Users,
  Star
} from 'lucide-react'

export default function ContactInfo() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Headquarters',
      details: [
        'Via Monte Napoleone, 1',
        '20121 Milan, Italy',
        'Fashion District'
      ]
    },
    {
      icon: Phone,
      title: 'Phone Support',
      details: [
        '+1 (555) 123-4567',
        '+39 02 7600 3728',
        'Mon-Fri: 9AM-6PM CET'
      ]
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: [
        'support@luxe.com',
        'orders@luxe.com',
        'press@luxe.com'
      ]
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday-Friday: 9AM-6PM',
        'Saturday: 10AM-4PM',
        'Sunday: Closed'
      ]
    }
  ]

  const locations = [
    {
      city: 'Milan',
      country: 'Italy',
      address: 'Via Monte Napoleone, 1',
      phone: '+39 02 7600 3728',
      hours: 'Mon-Sat: 10AM-7PM',
      type: 'Flagship Store'
    },
    {
      city: 'Paris',
      country: 'France',
      address: 'Avenue des Champs-Élysées',
      phone: '+33 1 40 20 50 00',
      hours: 'Mon-Sat: 10AM-7PM',
      type: 'Boutique'
    },
    {
      city: 'London',
      country: 'United Kingdom',
      address: 'Bond Street, Mayfair',
      phone: '+44 20 7493 0000',
      hours: 'Mon-Sat: 10AM-7PM',
      type: 'Boutique'
    },
    {
      city: 'New York',
      country: 'United States',
      address: 'Fifth Avenue, Manhattan',
      phone: '+1 212 755 5555',
      hours: 'Mon-Sat: 10AM-8PM',
      type: 'Flagship Store'
    }
  ]

  const services = [
    {
      icon: Users,
      title: 'Personal Shopping',
      description: 'Book a personal shopping session with our luxury consultants'
    },
    {
      icon: Calendar,
      title: 'Appointments',
      description: 'Schedule private viewings and consultations'
    },
    {
      icon: Star,
      title: 'VIP Services',
      description: 'Exclusive services for our loyal customers'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactInfo.map((info, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-royal-blue/10 flex items-center justify-center flex-shrink-0">
                  <info.icon className="h-6 w-6 text-royal-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-charcoal mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Store Locations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-royal-blue" />
            Our Locations
          </CardTitle>
          <p className="text-gray-600">
            Visit our flagship stores and boutiques around the world
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((location, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-charcoal">
                      {location.city}, {location.country}
                    </h4>
                    <Badge variant="secondary" className="mt-1">
                      {location.type}
                    </Badge>
                  </div>
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{location.address}</p>
                  <p>{location.phone}</p>
                  <p>{location.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-gold" />
            Premium Services
          </CardTitle>
          <p className="text-gray-600">
            Experience luxury with our exclusive services
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-royal-blue/10 flex items-center justify-center">
                  <service.icon className="h-8 w-8 text-royal-blue" />
                </div>
                <h4 className="font-semibold text-charcoal mb-2">
                  {service.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transportation Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-royal-blue" />
            Getting Here
          </CardTitle>
          <p className="text-gray-600">
            Find the best way to reach our flagship store in Milan
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Train className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-charcoal mb-2">Public Transport</h4>
              <p className="text-gray-600 text-sm">
                Metro: Montenapoleone Station<br />
                Tram: Line 1, Via Montenapoleone
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-charcoal mb-2">By Car</h4>
              <p className="text-gray-600 text-sm">
                Parking available nearby<br />
                Valet service available
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Plane className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-charcoal mb-2">From Airport</h4>
              <p className="text-gray-600 text-sm">
                Malpensa: 45 mins<br />
                Linate: 20 mins
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <Phone className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-red-800">Emergency Contact</h4>
              <p className="text-red-600 text-sm">For urgent matters only</p>
            </div>
          </div>
          <p className="text-red-700">
            For urgent order issues or immediate assistance, please call our emergency line: 
            <span className="font-semibold ml-1">+1 (555) 999-HELP</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}