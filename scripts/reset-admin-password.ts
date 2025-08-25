import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function resetAdminPassword() {
  try {
    console.log('Resetting admin password...')

    // Find the admin user
    const admin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    })

    if (!admin) {
      console.log('No admin user found. Creating one...')
      const hashedPassword = await bcrypt.hash('admin123', 12)
      
      const newAdmin = await prisma.user.create({
        data: {
          email: 'admin@luxe.com',
          name: 'Admin User',
          password: hashedPassword,
          role: 'ADMIN'
        }
      })

      console.log('Admin user created successfully!')
      console.log('==============================')
      console.log('Admin Login Credentials:')
      console.log(`Email: ${newAdmin.email}`)
      console.log(`Password: admin123`)
      console.log('==============================')
      console.log('Please change the password after first login!')
      return
    }

    // Reset password
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    await prisma.user.update({
      where: { id: admin.id },
      data: { password: hashedPassword }
    })

    console.log('Admin password reset successfully!')
    console.log('==============================')
    console.log('Admin Login Credentials:')
    console.log(`Email: ${admin.email}`)
    console.log(`Password: admin123`)
    console.log('==============================')
    console.log('Please change the password after first login!')

  } catch (error) {
    console.error('Error resetting admin password:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetAdminPassword()