import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get total users count
    const totalUsers = await db.user.count({
      where: { role: 'CUSTOMER' }
    })

    // Get total orders count
    const totalOrders = await db.order.count()

    // Get total revenue
    const orders = await db.order.findMany({
      select: { total: true }
    })
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

    // Get pending orders count
    const pendingOrders = await db.order.count({
      where: { status: 'PENDING' }
    })

    // Get recent orders with user info
    const recentOrders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    // Get low stock products (less than 10 units)
    const lowStockProducts = await db.product.findMany({
      where: {
        stock: {
          lt: 10
        }
      },
      orderBy: {
        stock: 'asc'
      },
      take: 10
    })

    return NextResponse.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      pendingOrders,
      recentOrders,
      lowStockProducts
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}