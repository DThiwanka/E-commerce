'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { useAuthStore } from '@/store/auth-store'
import BackButton from '@/components/ui/back-button'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Image as ImageIcon, 
  Type,
  ToggleLeft,
  ToggleRight,
  Settings,
  Eye,
  Save,
  X,
  Calendar,
  Link
} from 'lucide-react'

interface Banner {
  id: string
  title: string
  subtitle?: string
  image: string
  link?: string
  position: number
  active: boolean
  createdAt: string
  updatedAt: string
}

interface Promotion {
  id: string
  title: string
  description?: string
  code?: string
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING'
  value: number
  minAmount?: number
  maxUses?: number
  usedCount: number
  startDate: string
  endDate: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export default function ContentManagement() {
  const { user } = useAuthStore()
  const { toast } = useToast()
  const [banners, setBanners] = useState<Banner[]>([])
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'banners' | 'promotions'>('banners')
  
  // Banner state
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    image: '',
    link: '',
    position: 0,
    active: true
  })

  // Promotion state
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false)
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null)
  const [promotionForm, setPromotionForm] = useState({
    title: '',
    description: '',
    code: '',
    type: 'PERCENTAGE' as const,
    value: 0,
    minAmount: 0,
    maxUses: 0,
    startDate: '',
    endDate: '',
    active: true
  })

  useEffect(() => {
    if (user && (user.role === 'ADMIN' || user.role === 'PRODUCT_MANAGER')) {
      fetchBanners()
      fetchPromotions()
    }
  }, [user])

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/admin/content/banners')
      const data = await response.json()

      if (response.ok) {
        setBanners(data.banners)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch banners',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  const fetchPromotions = async () => {
    try {
      const response = await fetch('/api/admin/content/promotions')
      const data = await response.json()

      if (response.ok) {
        setPromotions(data.promotions)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch promotions',
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

  const handleBannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingBanner ? '/api/admin/content/banners' : '/api/admin/content/banners'
      const method = editingBanner ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bannerForm,
          id: editingBanner?.id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: editingBanner ? 'Banner updated' : 'Banner created',
          description: editingBanner ? 'Banner has been updated successfully' : 'Banner has been created successfully',
        })
        setIsBannerModalOpen(false)
        resetBannerForm()
        fetchBanners()
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to save banner',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  const handlePromotionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingPromotion ? '/api/admin/content/promotions' : '/api/admin/content/promotions'
      const method = editingPromotion ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...promotionForm,
          id: editingPromotion?.id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: editingPromotion ? 'Promotion updated' : 'Promotion created',
          description: editingPromotion ? 'Promotion has been updated successfully' : 'Promotion has been created successfully',
        })
        setIsPromotionModalOpen(false)
        resetPromotionForm()
        fetchPromotions()
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to save promotion',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner)
    setBannerForm({
      title: banner.title,
      subtitle: banner.subtitle || '',
      image: banner.image,
      link: banner.link || '',
      position: banner.position,
      active: banner.active
    })
    setIsBannerModalOpen(true)
  }

  const handleEditPromotion = (promotion: Promotion) => {
    setEditingPromotion(promotion)
    setPromotionForm({
      title: promotion.title,
      description: promotion.description || '',
      code: promotion.code || '',
      type: promotion.type,
      value: promotion.value,
      minAmount: promotion.minAmount || 0,
      maxUses: promotion.maxUses || 0,
      startDate: promotion.startDate.split('T')[0],
      endDate: promotion.endDate.split('T')[0],
      active: promotion.active
    })
    setIsPromotionModalOpen(true)
  }

  const handleDeleteBanner = async (bannerId: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return

    try {
      const response = await fetch('/api/admin/content/banners', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: bannerId }),
      })

      if (response.ok) {
        toast({
          title: 'Banner deleted',
          description: 'Banner has been deleted successfully',
        })
        fetchBanners()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete banner',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  const handleDeletePromotion = async (promotionId: string) => {
    if (!confirm('Are you sure you want to delete this promotion?')) return

    try {
      const response = await fetch('/api/admin/content/promotions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: promotionId }),
      })

      if (response.ok) {
        toast({
          title: 'Promotion deleted',
          description: 'Promotion has been deleted successfully',
        })
        fetchPromotions()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete promotion',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  const resetBannerForm = () => {
    setBannerForm({
      title: '',
      subtitle: '',
      image: '',
      link: '',
      position: 0,
      active: true
    })
    setEditingBanner(null)
  }

  const resetPromotionForm = () => {
    setPromotionForm({
      title: '',
      description: '',
      code: '',
      type: 'PERCENTAGE',
      value: 0,
      minAmount: 0,
      maxUses: 0,
      startDate: '',
      endDate: '',
      active: true
    })
    setEditingPromotion(null)
  }

  const toggleBannerActive = async (bannerId: string, active: boolean) => {
    try {
      const response = await fetch('/api/admin/content/banners/toggle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: bannerId, active }),
      })

      if (response.ok) {
        fetchBanners()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to toggle banner',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  const togglePromotionActive = async (promotionId: string, active: boolean) => {
    try {
      const response = await fetch('/api/admin/content/promotions/toggle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: promotionId, active }),
      })

      if (response.ok) {
        fetchPromotions()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to toggle promotion',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  if (!user || (user.role !== 'ADMIN' && user.role !== 'PRODUCT_MANAGER')) {
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
          <h1 className="text-3xl font-bold text-charcoal">Content Management</h1>
          <p className="text-muted-foreground">Manage banners, promotions, and marketing content</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'banners' ? 'default' : 'outline'}
            onClick={() => setActiveTab('banners')}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Banners
          </Button>
          <Button
            variant={activeTab === 'promotions' ? 'default' : 'outline'}
            onClick={() => setActiveTab('promotions')}
          >
            <Type className="h-4 w-4 mr-2" />
            Promotions
          </Button>
        </div>
      </div>

      {activeTab === 'banners' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold">Homepage Banners</h2>
              <Badge variant="secondary">{banners.length} banners</Badge>
            </div>
            <Dialog open={isBannerModalOpen} onOpenChange={setIsBannerModalOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetBannerForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Banner
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingBanner ? 'Edit Banner' : 'Add New Banner'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingBanner ? 'Update banner information' : 'Create a new banner for the homepage'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBannerSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="banner-title">Title</Label>
                    <Input
                      id="banner-title"
                      value={bannerForm.title}
                      onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="banner-subtitle">Subtitle</Label>
                    <Input
                      id="banner-subtitle"
                      value={bannerForm.subtitle}
                      onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="banner-image">Image URL</Label>
                    <Input
                      id="banner-image"
                      value={bannerForm.image}
                      onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="banner-link">Link URL (optional)</Label>
                    <Input
                      id="banner-link"
                      value={bannerForm.link}
                      onChange={(e) => setBannerForm({ ...bannerForm, link: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="banner-position">Position</Label>
                    <Input
                      id="banner-position"
                      type="number"
                      value={bannerForm.position}
                      onChange={(e) => setBannerForm({ ...bannerForm, position: parseInt(e.target.value) })}
                      min="0"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="banner-active"
                      checked={bannerForm.active}
                      onCheckedChange={(checked) => setBannerForm({ ...bannerForm, active: checked })}
                    />
                    <Label htmlFor="banner-active">Active</Label>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsBannerModalOpen(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      {editingBanner ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {banners.map((banner) => (
                <Card key={banner.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    {banner.image && (
                      <img 
                        src={banner.image} 
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge variant={banner.active ? 'default' : 'secondary'}>
                        {banner.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{banner.title}</CardTitle>
                    {banner.subtitle && (
                      <CardDescription>{banner.subtitle}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {banner.link && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Link className="h-4 w-4" />
                          <span className="truncate">{banner.link}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Position: {banner.position}</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(banner.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={banner.active}
                            onCheckedChange={(checked) => toggleBannerActive(banner.id, checked)}
                          />
                          <span className="text-sm">
                            {banner.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditBanner(banner)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteBanner(banner.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {banners.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No banners yet</h3>
              <p className="text-muted-foreground mb-4">Create your first homepage banner</p>
              <Button onClick={() => setIsBannerModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Banner
              </Button>
            </div>
          )}
        </>
      )}

      {activeTab === 'promotions' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold">Promotions & Discounts</h2>
              <Badge variant="secondary">{promotions.length} promotions</Badge>
            </div>
            <Dialog open={isPromotionModalOpen} onOpenChange={setIsPromotionModalOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetPromotionForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Promotion
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingPromotion ? 'Edit Promotion' : 'Add New Promotion'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingPromotion ? 'Update promotion details' : 'Create a new promotion or discount'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePromotionSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="promo-title">Title</Label>
                    <Input
                      id="promo-title"
                      value={promotionForm.title}
                      onChange={(e) => setPromotionForm({ ...promotionForm, title: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="promo-description">Description</Label>
                    <Textarea
                      id="promo-description"
                      value={promotionForm.description}
                      onChange={(e) => setPromotionForm({ ...promotionForm, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="promo-code">Promo Code (optional)</Label>
                    <Input
                      id="promo-code"
                      value={promotionForm.code}
                      onChange={(e) => setPromotionForm({ ...promotionForm, code: e.target.value.toUpperCase() })}
                      placeholder="e.g., SUMMER2024"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="promo-type">Type</Label>
                      <Select value={promotionForm.type} onValueChange={(value: any) => setPromotionForm({ ...promotionForm, type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                          <SelectItem value="FIXED_AMOUNT">Fixed Amount</SelectItem>
                          <SelectItem value="FREE_SHIPPING">Free Shipping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="promo-value">Value</Label>
                      <Input
                        id="promo-value"
                        type="number"
                        value={promotionForm.value}
                        onChange={(e) => setPromotionForm({ ...promotionForm, value: parseFloat(e.target.value) })}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="promo-min-amount">Min Amount</Label>
                      <Input
                        id="promo-min-amount"
                        type="number"
                        value={promotionForm.minAmount}
                        onChange={(e) => setPromotionForm({ ...promotionForm, minAmount: parseFloat(e.target.value) })}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="promo-max-uses">Max Uses</Label>
                      <Input
                        id="promo-max-uses"
                        type="number"
                        value={promotionForm.maxUses}
                        onChange={(e) => setPromotionForm({ ...promotionForm, maxUses: parseInt(e.target.value) })}
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="promo-start">Start Date</Label>
                      <Input
                        id="promo-start"
                        type="date"
                        value={promotionForm.startDate}
                        onChange={(e) => setPromotionForm({ ...promotionForm, startDate: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="promo-end">End Date</Label>
                      <Input
                        id="promo-end"
                        type="date"
                        value={promotionForm.endDate}
                        onChange={(e) => setPromotionForm({ ...promotionForm, endDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="promo-active"
                      checked={promotionForm.active}
                      onCheckedChange={(checked) => setPromotionForm({ ...promotionForm, active: checked })}
                    />
                    <Label htmlFor="promo-active">Active</Label>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsPromotionModalOpen(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      {editingPromotion ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {promotions.map((promotion) => (
                <Card key={promotion.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{promotion.title}</CardTitle>
                        {promotion.description && (
                          <CardDescription>{promotion.description}</CardDescription>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={promotion.active ? 'default' : 'secondary'}>
                          {promotion.active ? 'Active' : 'Inactive'}
                        </Badge>
                        {promotion.code && (
                          <Badge variant="outline">{promotion.code}</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                        <p className="font-medium">
                          {promotion.type === 'PERCENTAGE' ? `${promotion.value}% off` :
                           promotion.type === 'FIXED_AMOUNT' ? `$${promotion.value} off` :
                           'Free Shipping'}
                        </p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                        <p className="text-sm">
                          {new Date(promotion.startDate).toLocaleDateString()} - {new Date(promotion.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Usage</Label>
                        <p className="text-sm">
                          {promotion.usedCount} used
                          {promotion.maxUses > 0 && ` / ${promotion.maxUses}`}
                        </p>
                      </div>
                    </div>

                    {promotion.minAmount > 0 && (
                      <div className="mt-4">
                        <Label className="text-sm font-medium text-muted-foreground">Minimum Order</Label>
                        <p className="text-sm">${promotion.minAmount.toFixed(2)}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={promotion.active}
                          onCheckedChange={(checked) => togglePromotionActive(promotion.id, checked)}
                        />
                        <span className="text-sm">
                          {promotion.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPromotion(promotion)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePromotion(promotion.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {promotions.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Type className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No promotions yet</h3>
              <p className="text-muted-foreground mb-4">Create your first promotion or discount</p>
              <Button onClick={() => setIsPromotionModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Promotion
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}