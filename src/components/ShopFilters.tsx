'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Slider } from '@/components/ui/slider'
import { ChevronDown, X } from 'lucide-react'

export default function ShopFilters() {
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const categories = [
    { id: 'clothing', name: 'Clothing', count: 45 },
    { id: 'accessories', name: 'Accessories', count: 32 },
    { id: 'bags', name: 'Bags', count: 18 },
    { id: 'shoes', name: 'Shoes', count: 24 },
    { id: 'jewelry', name: 'Jewelry', count: 15 },
    { id: 'watches', name: 'Watches', count: 12 }
  ]

  const colors = [
    { id: 'black', name: 'Black', hex: '#000000' },
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
    { id: 'gray', name: 'Gray', hex: '#6b7280' },
    { id: 'beige', name: 'Beige', hex: '#d4a574' },
    { id: 'burgundy', name: 'Burgundy', hex: '#7c2d12' }
  ]

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId))
    }
  }

  const handleColorChange = (colorId: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, colorId])
    } else {
      setSelectedColors(selectedColors.filter(id => id !== colorId))
    }
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter(s => s !== size))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedSizes([])
    setPriceRange([0, 5000])
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-charcoal">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-royal-blue hover:text-royal-blue/80"
        >
          <X className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full mb-4">
          <h3 className="font-medium text-charcoal">Price Range</h3>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={5000}
            step={50}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Categories */}
      <Collapsible defaultOpen className="mt-6">
        <CollapsibleTrigger className="flex items-center justify-between w-full mb-4">
          <h3 className="font-medium text-charcoal">Categories</h3>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <label
                htmlFor={category.id}
                className="flex items-center justify-between flex-1 cursor-pointer text-sm"
              >
                <span>{category.name}</span>
                <span className="text-muted-foreground">({category.count})</span>
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Colors */}
      <Collapsible defaultOpen className="mt-6">
        <CollapsibleTrigger className="flex items-center justify-between w-full mb-4">
          <h3 className="font-medium text-charcoal">Colors</h3>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3">
          {colors.map((color) => (
            <div key={color.id} className="flex items-center space-x-2">
              <Checkbox
                id={color.id}
                checked={selectedColors.includes(color.id)}
                onCheckedChange={(checked) => handleColorChange(color.id, checked as boolean)}
              />
              <label
                htmlFor={color.id}
                className="flex items-center space-x-2 cursor-pointer text-sm"
              >
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.name}</span>
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Sizes */}
      <Collapsible defaultOpen className="mt-6">
        <CollapsibleTrigger className="flex items-center justify-between w-full mb-4">
          <h3 className="font-medium text-charcoal">Sizes</h3>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSizes.includes(size) ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSizeChange(size, !selectedSizes.includes(size))}
                className={selectedSizes.includes(size) ? 'bg-royal-blue text-ivory' : 'border-silver text-charcoal hover:bg-silver'}
              >
                {size}
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}