import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const toggleSchema = z.object({
  id: z.string().min(1, 'Promotion ID is required'),
  active: z.boolean(),
})

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, active } = toggleSchema.parse(body)

    const promotion = await db.promotion.update({
      where: { id },
      data: { active }
    })

    return NextResponse.json(
      { 
        message: `Promotion ${active ? 'activated' : 'deactivated'} successfully`,
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

    console.error('Promotion toggle error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}