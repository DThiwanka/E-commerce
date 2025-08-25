import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface CustomerWithStats {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  orders: Array<{
    id: string
    status: string
    total: number
    createdAt: string
  }>
  totalSpent: number
  orderCount: number
  lastOrderDate?: string
}

// GET /api/admin/customers - Fetch all customers with statistics
export async function GET(request: NextRequest) {
  try {
    const customers = await db.user.findMany({
      where: {
        role: 'CUSTOMER'
      },
      include: {
        orders: {
          select: {
            id: true,
            status: true,
            total: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate customer statistics
    const customersWithStats: CustomerWithStats[] = customers.map(customer => {
      const totalSpent = customer.orders.reduce((sum, order) => sum + order.total, 0)
      const orderCount = customer.orders.length
      const lastOrderDate = customer.orders.length > 0 ? customer.orders[0].createdAt : undefined

      return {
        id: customer.id,
        name: customer.name || '',
        email: customer.email,
        role: customer.role,
        createdAt: customer.createdAt,
        orders: customer.orders,
        totalSpent,
        orderCount,
        lastOrderDate
      }
    })

    return NextResponse.json({ customers: customersWithStats })
  } catch (error) {
    console.error('Customers fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}