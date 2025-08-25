import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const promotionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  code: z.string().optional(),
  type: z.enum(['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING']),
  value: z.number().positive('Value must be positive'),
  minAmount: z.number().min(0, 'Minimum amount must be non-negative').optional(),
  maxUses: z.number().int().min(0, 'Max uses must be non-negative').optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  active: z.boolean().default(true),
})

// GET /api/admin/content/promotions - Fetch all promotions
export async function GET(request: NextRequest) {
  try {
    const promotions = await db.promotion.findMany({
      orderBy: [
        { active: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ promotions })
  } catch (error) {
    console.error('Promotions fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/content/promotions - Create new promotion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = promotionSchema.parse(body)

    // Check if promo code already exists
    if (validatedData.code) {
      const existingPromotion = await db.promotion.findFirst({
        where: { 
          code: validatedData.code,
          NOT: { 
            endDate: { lt: new Date() } 
          }
        }
      })

      if (existingPromotion) {
        return NextResponse.json(
          { error: 'Promotion with this code already exists' },
          { status: 400 }
        )
      }
    }

    const promotion = await db.promotion.create({
      data: {
        ...validatedData,
        code: validatedData.code || null,
        description: validatedData.description || null,
        minAmount: validatedData.minAmount || 0,
        maxUses: validatedData.maxUses || 0,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
      }
    })

    return NextResponse.json(
      { 
        message: 'Promotion created successfully',
        promotion 
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

    console.error('Promotion creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/content/promotions - Update promotion
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Promotion ID is required' },
        { status: 400 }
      )
    }

    const validatedData = promotionSchema.parse(updateData)

    // Check if promo code already exists (excluding current promotion)
    if (validatedData.code) {
      const existingPromotion = await db.promotion.findFirst({
        where: { 
          code: validatedData.code,
          NOT: { 
            id: id,
            endDate: { lt: new Date() } 
          }
        }
      })

      if (existingPromotion) {
        return NextResponse.json(
          { error: 'Promotion with this code already exists' },
          { status: 400 }
        )
      }
    }

    const promotion = await db.promotion.update({
      where: { id },
      data: {
        ...validatedData,
        code: validatedData.code || null,
        description: validatedData.description || null,
        minAmount: validatedData.minAmount || 0,
        maxUses: validatedData.maxUses || 0,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
      }
    })

    return NextResponse.json(
      { 
        message: 'Promotion updated successfully',
        promotion 
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

    console.error('Promotion update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/content/promotions - Delete promotion
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Promotion ID is required' },
        { status: 400 }
      )
    }

    await db.promotion.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Promotion deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Promotion deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}