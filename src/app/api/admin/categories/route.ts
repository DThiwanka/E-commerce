import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
})

// Simple authentication check (in production, use proper JWT/session validation)
async function getAuthenticatedUser(request: NextRequest) {
  // For now, we'll check for a simple header or cookie
  // In a real app, you'd validate JWT tokens or session cookies
  const authHeader = request.headers.get('authorization')
  
  // This is a simplified check - in production, implement proper JWT validation
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // For demo purposes, we'll assume the token contains user info
    // In production, you'd decode and validate the JWT
    try {
      const token = authHeader.substring(7)
      // This is a placeholder - implement proper JWT validation
      return { role: 'ADMIN' } // Simplified for demo
    } catch (error) {
      return null
    }
  }
  
  return null
}

// GET /api/admin/categories - Get all categories
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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

    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/admin/categories - Create new category
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = categorySchema.parse(body)

    // Check if category with same name or slug already exists
    const existingCategory = await db.category.findFirst({
      where: {
        OR: [
          { name: validatedData.name },
          { slug: validatedData.slug }
        ]
      }
    })

    if (existingCategory) {
      return NextResponse.json({ 
        error: 'Category with this name or slug already exists' 
      }, { status: 400 })
    }

    const category = await db.category.create({
      data: validatedData,
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    })

    return NextResponse.json({ category })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error', 
        details: error.errors 
      }, { status: 400 })
    }

    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}