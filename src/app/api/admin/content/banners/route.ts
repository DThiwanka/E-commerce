import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const bannerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  image: z.string().url('Invalid image URL'),
  link: z.string().url('Invalid link URL').optional().nullable(),
  position: z.number().int().min(0, 'Position must be non-negative'),
  active: z.boolean().default(true),
})

// GET /api/admin/content/banners - Fetch all banners
export async function GET(request: NextRequest) {
  try {
    const banners = await db.banner.findMany({
      orderBy: [
        { position: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ banners })
  } catch (error) {
    console.error('Banners fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/content/banners - Create new banner
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = bannerSchema.parse(body)

    const banner = await db.banner.create({
      data: {
        ...validatedData,
        link: validatedData.link || null,
        subtitle: validatedData.subtitle || null,
      }
    })

    return NextResponse.json(
      { 
        message: 'Banner created successfully',
        banner 
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

    console.error('Banner creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/content/banners - Update banner
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Banner ID is required' },
        { status: 400 }
      )
    }

    const validatedData = bannerSchema.parse(updateData)

    const banner = await db.banner.update({
      where: { id },
      data: {
        ...validatedData,
        link: validatedData.link || null,
        subtitle: validatedData.subtitle || null,
      }
    })

    return NextResponse.json(
      { 
        message: 'Banner updated successfully',
        banner 
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

    console.error('Banner update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/content/banners - Delete banner
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Banner ID is required' },
        { status: 400 }
      )
    }

    await db.banner.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Banner deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Banner deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}