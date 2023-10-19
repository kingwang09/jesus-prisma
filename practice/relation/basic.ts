import { PrismaClient, Prisma } from '@prisma/client'

//기본 로깅
//const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error'],})

//이벤트 기반 로깅
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
  errorFormat: 'pretty',
})

prisma.$on('query', (e) => {
  console.info('Query: ' + e.query)
  console.info('Params: ' + e.params)
  console.warn('Duration: ' + e.duration + 'ms')
})

async function main() {
    // const userAndPosts = await prisma.user.create({
    //     data: {
    //         email: "kingwang09@gmail.com",
    //       posts: {
    //         create: [
    //           { title: 'Prisma Day 2020' }, // Populates authorId with user's id
    //           { title: 'How to write a Prisma schema' }, // Populates authorId with user's id
    //         ],
    //       },
    //     },
    //   })

    const getAuthor = await prisma.user.findUnique({
      where: {
        id: 8,
      },
      include: {
        posts: true, // All posts where authorId == 20
      },
    });
    console.log(getAuthor)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

//npx ts-node script.ts
//npx prisma studio