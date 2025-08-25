import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const toggleSchema = z.object({
  id: z.string().min(1, 'Banner ID is required'),
  active: z.boolean(),
})

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, active } = toggleSchema.parse(body)

    const banner = await db.banner.update({
      where: { id },
      data: { active }
    })

    return NextResponse.json(
      { 
        message: `Banner ${active ? 'activated' : 'deactivated'} successfully`,
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

    console.error('Banner toggle error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}