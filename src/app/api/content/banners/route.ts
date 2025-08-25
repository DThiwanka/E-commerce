import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const banners = await db.banner.findMany({
      where: { active: true },
      orderBy: { position: 'asc' }
    })

    return NextResponse.json({ banners })
  } catch (error) {
    console.error('Banners API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}