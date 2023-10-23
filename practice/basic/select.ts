import { PrismaClient, Prisma } from '@prisma/client'

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
    //in query
    let users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                },
                {
                    id: 4
                },
            ]
        }
    });
    console.log(users)

    //select one by pk
    let user = await prisma.user.findUnique({
        where:{
            id: 1
        }
    });
    console.log(user);

    //select one by pk
    user = await prisma.user.findUnique({
        where: {
            email: 'kingwang09@gmail.com'//equals
        }
    });
    console.log(user)
    console.log("--------------------")

    //select find first by some
    user = await prisma.user.findFirst({
        where: {
            writtenPosts:{
                some: {
                    published: true
                }
            }
        }
    });
    console.log(user);
    console.log("--------------------")

    //select endsWith
    users = await prisma.user.findMany({
        where: {
            email: {
                endsWith: 'prisma.io'
            }
        }
    });
    console.log(users);
    console.log("--------------------")

    //select pagination
    users = await prisma.user.findMany({
        skip: 1,//offset 역할
        take: 2,//limit 역할 
        orderBy: {
            id: 'desc'
        }
    });
    console.log(users);
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