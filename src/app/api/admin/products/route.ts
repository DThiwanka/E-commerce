import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  image: z.string().url('Invalid image URL'),
  image2: z.string().url('Invalid image URL').optional().nullable(),
  image3: z.string().url('Invalid image URL').optional().nullable(),
  image4: z.string().url('Invalid image URL').optional().nullable(),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
  sku: z.string().optional(),
  tags: z.string().optional(),
  featured: z.boolean().default(false),
  bestseller: z.boolean().default(false),
  seasonal: z.boolean().default(false),
  categoryId: z.string().optional(),
})

// GET /api/admin/products - Fetch all products
export async function GET(request: NextRequest) {
  try {
    const products = await db.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = productSchema.parse(body)

    // Check if SKU already exists
    if (validatedData.sku) {
      const existingProduct = await db.product.findUnique({
        where: { sku: validatedData.sku }
      })

      if (existingProduct) {
        return NextResponse.json(
          { error: 'Product with this SKU already exists' },
          { status: 400 }
        )
      }
    }

    const product = await db.product.create({
      data: {
        ...validatedData,
        image2: validatedData.image2 || null,
        image3: validatedData.image3 || null,
        image4: validatedData.image4 || null,
        sku: validatedData.sku || null,
        tags: validatedData.tags || null,
        categoryId: validatedData.categoryId || null,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    return NextResponse.json(
      { 
        message: 'Product created successfully',
        product 
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Product creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/products - Update product
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const validatedData = productSchema.parse(updateData)

    // Check if SKU already exists (excluding current product)
    if (validatedData.sku) {
      const existingProduct = await db.product.findFirst({
        where: {
          sku: validatedData.sku,
          NOT: { id }
        }
      })

      if (existingProduct) {
        return NextResponse.json(
          { error: 'Product with this SKU already exists' },
          { status: 400 }
        )
      }
    }

    const product = await db.product.update({
      where: { id },
      data: {
        ...validatedData,
        image2: validatedData.image2 || null,
        image3: validatedData.image3 || null,
        image4: validatedData.image4 || null,
        sku: validatedData.sku || null,
        tags: validatedData.tags || null,
        categoryId: validatedData.categoryId || null,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    return NextResponse.json(
      { 
        message: 'Product updated successfully',
        product 
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Product update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/products - Delete product
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    await db.product.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Product deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}