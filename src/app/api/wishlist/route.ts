import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface WishlistItem {
  productId: string
  product: {
    id: string
    name: string
    price: number
    image: string
  }
  createdAt: string
}

// GET /api/wishlist - Fetch user's wishlist
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const wishlistItems = await db.wishlistItem.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const formattedItems: WishlistItem[] = wishlistItems.map(item => ({
      id: item.id,
      productId: item.productId,
      product: item.product,
      createdAt: item.createdAt
    }))

    return NextResponse.json({ items: formattedItems })
  } catch (error) {
    console.error('Wishlist fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/wishlist - Add item to wishlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, productId } = body

    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'User ID and Product ID are required' },
        { status: 400 }
      )
    }

    // Check if product exists
    const product = await db.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if item already exists in wishlist
    const existingItem = await db.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    })

    if (existingItem) {
      return NextResponse.json(
        { error: 'Item already in wishlist' },
        { status: 400 }
      )
    }

    const wishlistItem = await db.wishlistItem.create({
      data: {
        userId,
        productId
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
          }
        }
      }
    })

    return NextResponse.json(
      { 
        message: 'Item added to wishlist successfully',
        item: {
          id: wishlistItem.id,
          productId: wishlistItem.productId,
          product: wishlistItem.product,
          createdAt: wishlistItem.createdAt
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Wishlist add error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/wishlist - Remove item from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const productId = searchParams.get('productId')

    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'User ID and Product ID are required' },
        { status: 400 }
      )
    }

    await db.wishlistItem.delete({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    })

    return NextResponse.json(
      { message: 'Item removed from wishlist successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Wishlist remove error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}