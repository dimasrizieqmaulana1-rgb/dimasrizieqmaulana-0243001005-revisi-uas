import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'dimas',
      password: '123456'
    }
  })

  console.log('User berhasil ditambahkan:')
  console.log(user)

  const users = await prisma.user.findMany()
  console.log('Semua user:')
  console.log(users)
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })