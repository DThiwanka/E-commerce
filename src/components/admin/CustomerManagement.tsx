'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { useAuthStore } from '@/store/auth-store'
import BackButton from '@/components/ui/back-button'
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  Calendar,
  ShoppingCart,
  DollarSign,
  MapPin,
  Eye,
  MoreHorizontal,
  Ban,
  Crown,
  RefreshCw
} from 'lucide-react'
import { Label } from '@/components/ui/label'

interface Customer {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  orders: Array<{
    id: string
    status: string
    total: number
    createdAt: string
  }>
  totalSpent: number
  orderCount: number
  lastOrderDate?: string
}

export default function CustomerManagement() {
  const { user } = useAuthStore()
  const { toast } = useToast()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  useEffect(() => {
    if (user && (user.role === 'ADMIN' || user.role === 'SUPPORT_STAFF')) {
      fetchCustomers()
    }
  }, [user])

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/admin/customers')
      const data = await response.json()

      if (response.ok) {
        setCustomers(data.customers)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch customers',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsDetailModalOpen(true)
  }

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800'
      case 'PRODUCT_MANAGER':
        return 'bg-blue-100 text-blue-800'
      case 'SUPPORT_STAFF':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCustomerStatus = (customer: Customer) => {
    const now = new Date()
    const lastOrder = customer.lastOrderDate ? new Date(customer.lastOrderDate) : null
    const daysSinceLastOrder = lastOrder ? Math.floor((now.getTime() - lastOrder.getTime()) / (1000 * 60 * 60 * 24)) : 999

    if (daysSinceLastOrder <= 30) return { text: 'Active', color: 'bg-green-100 text-green-800' }
    if (daysSinceLastOrder <= 90) return { text: 'Recent', color: 'bg-blue-100 text-blue-800' }
    if (daysSinceLastOrder <= 180) return { text: 'Inactive', color: 'bg-yellow-100 text-yellow-800' }
    return { text: 'Dormant', color: 'bg-red-100 text-red-800' }
  }

  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPPORT_STAFF')) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-8">
        <BackButton href="/admin" label="Back to Dashboard" />
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Customer Management</h1>
          <p className="text-muted-foreground">Manage customer accounts and view purchase history</p>
        </div>
        <Button onClick={fetchCustomers} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Customer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => getCustomerStatus(c).text === 'Active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${customers.length > 0 
                ? (customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.orderCount, 0)).toFixed(2)
                : '0.00'
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCustomers.map((customer) => {
            const status = getCustomerStatus(customer)
            return (
              <Card key={customer.id} className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/api/placeholder/avatar/${customer.id}`} />
                        <AvatarFallback>
                          {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{customer.name}</h3>
                          <Badge className={getRoleBadgeColor(customer.role)}>
                            {customer.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Joined {new Date(customer.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <Badge className={status.color} variant="secondary">
                            {status.text}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm font-medium">{customer.orderCount} orders</p>
                        <p className="text-xs text-muted-foreground">
                          ${customer.totalSpent.toFixed(2)} spent
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCustomer(customer)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {filteredCustomers.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            {searchTerm ? 'No customers found' : 'No customers yet'}
          </h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search terms' : 'When customers register, they will appear here'}
          </p>
        </div>
      )}

      {/* Customer Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>Complete customer information and order history</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Header */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/api/placeholder/avatar/${selectedCustomer.id}`} />
                  <AvatarFallback className="text-lg">
                    {selectedCustomer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                  <p className="text-muted-foreground">{selectedCustomer.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={getRoleBadgeColor(selectedCustomer.role)}>
                      {selectedCustomer.role}
                    </Badge>
                    <Badge className={getCustomerStatus(selectedCustomer).color} variant="secondary">
                      {getCustomerStatus(selectedCustomer).text}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Customer Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-2xl font-bold">{selectedCustomer.orderCount}</p>
                        <p className="text-xs text-muted-foreground">Total Orders</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-2xl font-bold">${selectedCustomer.totalSpent.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Total Spent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-2xl font-bold">
                          {selectedCustomer.orderCount > 0 
                            ? (selectedCustomer.totalSpent / selectedCustomer.orderCount).toFixed(2)
                            : '0.00'
                          }
                        </p>
                        <p className="text-xs text-muted-foreground">Avg. Order Value</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Account Information */}
              <div>
                <h4 className="font-medium mb-3">Account Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Customer ID</Label>
                    <p>{selectedCustomer.id}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Member Since</Label>
                    <p>{new Date(selectedCustomer.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Account Status</Label>
                    <Badge className={getCustomerStatus(selectedCustomer).color}>
                      {getCustomerStatus(selectedCustomer).text}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Role</Label>
                    <Badge className={getRoleBadgeColor(selectedCustomer.role)}>
                      {selectedCustomer.role}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div>
                <h4 className="font-medium mb-3">Recent Orders</h4>
                {selectedCustomer.orders.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No orders yet</p>
                ) : (
                  <div className="space-y-3">
                    {selectedCustomer.orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Order #{order.id.slice(-8)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{order.status}</Badge>
                          <p className="font-medium mt-1">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    {selectedCustomer.orders.length > 5 && (
                      <p className="text-sm text-muted-foreground text-center">
                        +{selectedCustomer.orders.length - 5} more orders
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline">
                  <Ban className="h-4 w-4 mr-2" />
                  Suspend Account
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}