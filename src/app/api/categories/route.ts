import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const categories = await db.category.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    // Transform to match the collection interface
    const collections = categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description || `${category.name} collection`,
      image: `https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&h=400&fit=crop`, // Default image
      productCount: category._count.products,
      slug: category.slug,
      featured: category.slug === 'womens-fashion' || category.slug === 'mens-fashion', // Mark some as featured
      tags: category.name.split(' ')
    }))

    return NextResponse.json({ collections })
  } catch (error) {
    console.error('Categories API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}