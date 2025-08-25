import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedProducts() {
  try {
    console.log('Seeding products...')

    // Create categories first
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { slug: 'womens-fashion' },
        update: {},
        create: {
          name: "Women's Fashion",
          slug: 'womens-fashion',
          description: "Women's clothing and accessories"
        }
      }),
      prisma.category.upsert({
        where: { slug: 'mens-fashion' },
        update: {},
        create: {
          name: "Men's Fashion",
          slug: 'mens-fashion',
          description: "Men's clothing and accessories"
        }
      }),
      prisma.category.upsert({
        where: { slug: 'accessories' },
        update: {},
        create: {
          name: 'Accessories',
          slug: 'accessories',
          description: 'Fashion accessories and jewelry'
        }
      }),
      prisma.category.upsert({
        where: { slug: 'bags' },
        update: {},
        create: {
          name: 'Bags & Luggage',
          slug: 'bags',
          description: 'Handbags, backpacks, and luggage'
        }
      })
    ])

    console.log('Categories created/updated:', categories.length)

    // Sample products data
    const products = [
      {
        name: 'Luxury Silk Scarf',
        description: 'Elegant silk scarf perfect for any occasion',
        price: 299,
        image: 'https://images.unsplash.com/photo-1590766940554-153a0b48a329?auto=format&fit=crop&w=500&q=80',
        stock: 50,
        sku: 'LUX-SC-001',
        tags: 'silk,scarf,accessories,luxury',
        featured: true,
        categoryId: categories[2].id // Accessories
      },
      {
        name: 'Designer Handbag',
        description: 'Premium leather handbag with modern design',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1584917865442-89e75a8f4327?auto=format&fit=crop&w=500&q=80',
        stock: 25,
        sku: 'LUX-HB-002',
        tags: 'handbag,leather,luxury,bag',
        featured: true,
        bestseller: true,
        categoryId: categories[3].id // Bags
      },
      {
        name: 'Premium Watch',
        description: 'Swiss-made precision timepiece',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1523275335684-2d6115b6d5d3?auto=format&fit=crop&w=500&q=80',
        stock: 15,
        sku: 'LUX-WT-003',
        tags: 'watch,swiss,luxury,accessories',
        featured: true,
        bestseller: true,
        categoryId: categories[2].id // Accessories
      },
      {
        name: 'Cashmere Sweater',
        description: 'Soft cashmere sweater for ultimate comfort',
        price: 599,
        image: 'https://images.unsplash.com/photo-1576566518054-2d6115b6d5d3?auto=format&fit=crop&w=500&q=80',
        stock: 30,
        sku: 'LUX-CS-004',
        tags: 'cashmere,sweater,women,comfort',
        categoryId: categories[0].id // Women's Fashion
      },
      {
        name: 'Italian Leather Jacket',
        description: 'Handcrafted Italian leather jacket',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80',
        stock: 20,
        sku: 'LUX-LJ-005',
        tags: 'leather,jacket,italian,men',
        featured: true,
        categoryId: categories[1].id // Men's Fashion
      },
      {
        name: 'Pearl Necklace',
        description: 'Elegant pearl necklace with clasp',
        price: 799,
        image: 'https://images.unsplash.com/photo-1596944922819-d916f3b6b3c8?auto=format&fit=crop&w=500&q=80',
        stock: 5,
        sku: 'LUX-PN-006',
        tags: 'pearl,necklace,jewelry,luxury',
        categoryId: categories[2].id // Accessories
      },
      {
        name: 'Suede Boots',
        description: 'Comfortable suede boots for all seasons',
        price: 699,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80',
        stock: 35,
        sku: 'LUX-SB-007',
        tags: 'boots,suede,footwear,women',
        categoryId: categories[0].id // Women's Fashion
      },
      {
        name: 'Silk Blouse',
        description: 'Luxurious silk blouse for professional wear',
        price: 349,
        image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=500&q=80',
        stock: 40,
        sku: 'LUX-SB-008',
        tags: 'silk,blouse,women,professional',
        categoryId: categories[0].id // Women's Fashion
      },
      {
        name: 'Wool Coat',
        description: 'Warm wool coat for winter elegance',
        price: 899,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6ca56?auto=format&fit=crop&w=500&q=80',
        stock: 18,
        sku: 'LUX-WC-009',
        tags: 'wool,coat,winter,women',
        featured: true,
        categoryId: categories[0].id // Women's Fashion
      },
      {
        name: 'Leather Belt',
        description: 'Genuine leather belt with classic buckle',
        price: 199,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80',
        stock: 60,
        sku: 'LUX-LB-010',
        tags: 'leather,belt,men,accessories',
        categoryId: categories[1].id // Men's Fashion
      },
      {
        name: 'Silk Evening Dress',
        description: 'Elegant silk dress perfect for special occasions',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=400&h=500&fit=crop',
        stock: 12,
        sku: 'LUX-ED-011',
        tags: 'silk,dress,evening,women',
        featured: true,
        bestseller: true,
        categoryId: categories[0].id // Women's Fashion
      },
      {
        name: 'Swiss Watch',
        description: 'Precision timepiece with classic design',
        price: 3499,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
        stock: 8,
        sku: 'LUX-SW-012',
        tags: 'watch,swiss,luxury,precision',
        featured: true,
        bestseller: true,
        categoryId: categories[2].id // Accessories
      }
    ]

    // Create products
    const createdProducts = await Promise.all(
      products.map(product => 
        prisma.product.upsert({
          where: { sku: product.sku },
          update: product,
          create: product
        })
      )
    )

    console.log(`Created/updated ${createdProducts.length} products`)

    // Create some banners
    const banners = [
      {
        title: 'Summer Collection',
        subtitle: 'Up to 30% off selected items',
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=2000&q=80',
        link: '/shop?featured=true',
        position: 1
      },
      {
        title: 'New Arrivals',
        subtitle: 'Discover the latest luxury pieces',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=80',
        link: '/shop?sortOrder=desc',
        position: 2
      }
    ]

    const createdBanners = await Promise.all(
      banners.map((banner, index) =>
        prisma.banner.create({
          data: {
            ...banner,
            position: index + 1
          }
        })
      )
    )

    console.log(`Created/updated ${createdBanners.length} banners`)

    // Create some promotions
    const promotions = [
      {
        title: 'Summer Sale',
        description: 'Get 25% off on all summer collection',
        code: 'SUMMER25',
        type: 'PERCENTAGE',
        value: 25,
        minAmount: 100,
        maxUses: 100,
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-08-31')
      },
      {
        title: 'Free Shipping',
        description: 'Free shipping on orders over $500',
        code: 'FREESHIP',
        type: 'FREE_SHIPPING',
        value: 0,
        minAmount: 500,
        maxUses: 1000,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31')
      }
    ]

    const createdPromotions = await Promise.all(
      promotions.map(promotion =>
        prisma.promotion.upsert({
          where: { code: promotion.code },
          update: promotion,
          create: promotion
        })
      )
    )

    console.log(`Created/updated ${createdPromotions.length} promotions`)

    console.log('Database seeded successfully!')
    
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedProducts()